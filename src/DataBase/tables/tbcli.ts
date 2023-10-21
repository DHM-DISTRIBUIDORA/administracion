import SDB, { DBProps, Scheme, TableAbstract } from 'servisofts-db'
import SSocket from 'servisofts-socket';
import Model from '../../Model';
import DataBase from '..';
import { SDate } from 'servisofts-component';


export default new class tbcli extends TableAbstract {

    scheme: Scheme = {
        name: "tbcli",
        primaryKey: "idcli",
        properties: {
            sync_type: "string?",
            "idcli": "int",
            "clicod": "string?",
            "clidir": "string?",
            "clicuo": "int?",
            "clidesfin": "int?",
            "clidocid": "int?",
            "cliest": "int?",
            "clifing": "string?",
            "cliforpag": "string?",
            "cliidcta": "int?",
            "cliidemp": "int?",
            "cliidtipo": "string?",
            "cliinter": "int?",
            "clilat": "double?",
            "clilon": "double?",
            "climon": "int?",
            "climpid": "int?",
            "clinit": "string?",
            "clinom": "string?",
            "cliplazo": "int?",
            "clirazon": "string?",
            "clisic": "int?",
            "clitipdoc": "string?",
            "clitipgar": "string?",
            "clitlimcre": "int?",
            "fecmod": "string?",
            "idcanal": "int?",
            "idcat": "int?",
            "idciu": "int?",
            "idclir": "int?",
            "idclit": "int?",
            "idconf": "int?",
            "iddepcli": "int?",
            "idds": "int?",
            "idloc": "int?",
            "idrg": "int?",
            "idz": "int?",
            "pedidos": "int?",
            "sucreg": "int?",
            "usumod": "string?",
            "ventas": "int?",
        }
    }

    sync(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            let usrLog = Model.usuario.Action.getUsuarioLog();
            if (!usrLog) return reject({
                estado: "error",
                error: "user not found"
            })

            let sync_data = {
                tbname: this.scheme.name,
                fecmod: '1950-01-01 00:00:00.0'
            }
            try {
                sync_data = await DataBase.sync_data.objectForPrimaryKey(this.scheme.name);
            } catch (error) {
                SDB.insert("sync_data", sync_data)
            }

            // if (!usrLog?.idvendedor) {
            //     return reject({
            //         estado: "error",
            //         error: "idvendedor not found"
            //     })
            // }
            let request: any = {
                "component": "tbcli",
                "type": "getAll",
                "estado": "cargando",
                "fecmod": sync_data.fecmod
            }
            if (usrLog.idvendedor) {
                request["cliidemp"] = usrLog.idvendedor
            }
            SSocket.sendPromise2(request, 60 * 1000 * 5).then((e: any) => {
                // SDB.deleteAll(this.scheme.name).then((ex: any) => {
                SDB.insertArray(this.scheme.name, e.data).then((a: any) => {
                    sync_data.fecmod = new SDate().toString("yyyy-MM-dd hh:mm:ss.0") + "";
                    SDB.update("sync_data", sync_data)
                    resolve(e);
                })
                // })
            }).catch(e => {
                console.error(e)
                reject(e);
            })
        })

    }
    loadToReducer = async () => {
        const e = await this.all()
        // Model.usuarioPage.Action._getReducer().data = data;
        Model.tbcli.Action._dispatch({
            "component": "tbcli",
            "type": "getAll",
            estado: "exito",
            data: e,
        })
    }
}();




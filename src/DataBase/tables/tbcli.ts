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
            "climon": "int?",
            "clirazon": "string?",
            "clidir": "string?",
            "clicuo": "int?",
            "clidesfin": "int?",
            "clidocid": "int?",
            "cliest": "int?",
            "clifing": "string?",
            "clitel": "string?",
            "cliforpag": "string?",
            "cliidcta": "int?",
            "cliidemp": "int?",
            "cliidtipo": "string?",
            "cliloc": "string?",
            "cliinter": "int?",
            "clilat": "double?",
            "clizona": "string?",
            "clilon": "double?",
            "clidep": "string?",
            "clifax": "string?",
            "clicom": "string?",
            "cliemail": "string?",

            "climpid": "int?",
            "clinit": "string?",
            "clinom": "string?",
            "cliplazo": "int?",
            "clisic": "int?",
            "clitipdoc": "string?",
            "clilimau": "string?",
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
            "climz": "string?",
            "cliuv": "string?",
            "cliadic": "string?",
            "clidirnro": "string?",
            "clicel": "string?",
            "cliote": "string?",
            "cliico": "string?",
            "clireprs": "string?",
            "clireprsci": "string?",
            "clicicompl": "string?",
            "climpdoc": "string?",
            "ventas": "int?",
            "dmsest": "int?",
        }
    }

    sync(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            let usrLog = Model.usuario.Action.getUsuarioLog();
            if (!usrLog) return reject({
                estado: "error",
                code: 200,
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

            }
            if (usrLog.idvendedor) {
                request["cliidemp"] = usrLog.idvendedor
            } else {
                request["fecmod"] = sync_data.fecmod
            }
            SSocket.sendPromise2(request, 60 * 1000 * 5).then(async (e: any) => {
                if (!request.fecmod) {
                    await SDB.deleteAll(this.scheme.name);
                }

                SDB.insertArray(this.scheme.name, e.data).then((a: any) => {
                    if (request.fecmod) {
                        sync_data.fecmod = new SDate().toString("yyyy-MM-dd hh:mm:ss.0") + "";
                        SDB.update("sync_data", sync_data)
                    }
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




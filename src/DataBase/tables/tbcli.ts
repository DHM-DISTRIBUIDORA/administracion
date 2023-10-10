import SDB, { DBProps, Scheme, TableAbstract } from 'servisofts-db'
import SSocket from 'servisofts-socket';
import Model from '../../Model';


export default new class tbcli extends TableAbstract {

    scheme: Scheme = {
        name: this.constructor.name,
        primaryKey: "idcli",
        properties: {
            sync_type: "string?",
            "idcli": "int",
            "clicod": "string?",
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
        return new Promise((resolve, reject) => {
            let usrLog = Model.usuario.Action.getUsuarioLog();
            if (!usrLog) return reject({
                estado: "error",
                error: "user not found"
            })
            if (!usrLog?.idvendedor) {
                return reject({
                    estado: "error",
                    error: "idvendedor not found"
                })
            }
            SSocket.sendPromise2({
                "component": "tbcli",
                "type": "getAll",
                "estado": "cargando",
                "cliidemp": usrLog.idvendedor
            }).then((e: any) => {
                SDB.deleteAll(this.scheme.name).then((ex: any) => {
                    SDB.insertArray(this.scheme.name, e.data).then((a: any) => {
                        resolve(e);
                    })
                })
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




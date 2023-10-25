import SDB, { DBProps, Scheme, TableAbstract } from 'servisofts-db'
import SSocket from 'servisofts-socket';
import Model from '../../Model';
import { SDate } from 'servisofts-component';


export default new class visita_transportista extends TableAbstract {

    scheme: Scheme = {
        name: "visita_transportista",
        primaryKey: "key",
        properties: {
            sync_type: "string?",
            "key": "string?",
            "fecha_on": "string?",
            "estado": "int?",
            "idcli": "string?",
            "idemp": "string?",
            "tipo": "string?",
            "descripcion": "string?",
            "fecha": "string?",
        }
    }

    sync(): Promise<any> {
        return new Promise((resolve, reject) => {
            // return reject({
            //     estado: "error",
            //     error: "Method no implement"
            // })
            let usrLog = Model.usuario.Action.getUsuarioLog();
            if (!usrLog) return reject({
                estado: "error",
                code: 200,
                error: "user not found"
            })
            let request: any = {
                "component": "visita_transportista",
                "type": "getAll",
                "estado": "cargando",
                "fecha": new SDate().toString("yyyy-MM-dd")
            }
            if (usrLog?.idtransportista) {
                request["idemp"] = usrLog.idtransportista
            } else {
                resolve("");
            }
            SSocket.sendPromise2(request).then((e: any) => {
                const arr = Object.values(e.data).map((a: any) => {
                    return a;
                })
                SDB.deleteAll(this.scheme.name).then((ex: any) => {
                    SDB.insertArray(this.scheme.name, arr).then(a => {
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
        // const e = await this.all()
        // Model.usuarioPage.Action._getReducer().data = data;
        // let usrLog = Model.usuario.Action.getUsuarioLog();
        // Model.tbemp.Action._dispatch({
        //     "component": "dm_cabfac",
        //     "type": "getPedidos",
        //     "idemp": usrLog?.idvendedor,
        //     estado: "exito",
        //     data: e,
        // })
    }
}();




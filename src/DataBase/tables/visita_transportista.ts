import SDB, { DBProps, Scheme, TableAbstract } from 'servisofts-db'
import SSocket from 'servisofts-socket';
import Model from '../../Model';
import { SDate, SPopup } from 'servisofts-component';


export default new class visita_transportista extends TableAbstract {
    scheme: Scheme = {
        name: "visita_transportista",
        primaryKey: "key",
        properties: {
            sync_type: "string?",
            "key": "string?",
            "fecha_on": "string?",
            "estado": "int?",
            "monto": "double?",
            "idcli": "string?",
            "idven": "string?",
            "idemp": "string?",
            "tipo": "string?",
            "descripcion": "string?",
            "fecha": "string?",
            "key_usuario": "string?",
        }
    }

    fecha: any = "";

    sync(): Promise<any> {
        return new Promise((resolve, reject) => {
            // return reject({
            //     estado: "error",
            //     error: "Method no implement"
            // })
            // SPopup.date("selecciona la fecha de los pedidos.", (data: any) => {
            const fecha = this.fecha
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
                "fecha": fecha
            }
            if (usrLog?.idtransportista) {
                request["idemp"] = usrLog.idtransportista
            } else {
                return resolve("");
            }
            SSocket.sendPromise2(request).then((e: any) => {
                const arr = Object.values(e.data).map((a: any) => {
                    return a;
                })
                SDB.deleteAll(this.scheme.name).then((ex: any) => {
                    SDB.insertArray(this.scheme.name, arr).then(a => {
                        SDB.insert("sync_data", {
                            tbname: this.scheme.name,
                            fecha_sync: new SDate().toString(),
                        })
                        resolve(e);
                    })
                })
            }).catch(e => {
                console.error(e)
                reject(e);
            })
        })

        // })
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
    async deleteAll(): Promise<any> {
        await super.deleteAll();
        SDB.delete("sync_data", this.scheme.name)
        return true;
    }
}();




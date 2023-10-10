import SDB, { DBProps, Scheme, TableAbstract } from 'servisofts-db'
import SSocket from 'servisofts-socket';
import Model from '../../Model';


export default new class dm_cabfac extends TableAbstract {

    scheme: Scheme = {
        name: this.constructor.name,
        primaryKey: "idven",
        properties: {
            sync_type: "string?",
            idven: "string",
            vtipa: "int?",
            clicod: "string?",
            vfec: "string?",
            vobs: "string?",
            vpla: "int?",
            vdes: "string?",
            vtipo: "string?",
            codvendedor: "string?",
            vlatitud: "float?",
            vlongitud: "float?",
            vhora: "string?",
            razonsocial: "string?",
            nit: "string?",
            tipocliente: "string?",
            nombrecliente: "string?",
            vzona: "string?",
            direccion: "string?",
            telefonos: "string?",
            detalle: "json?",

        }
    }

    sync(): Promise<any> {
        return new Promise((resolve, reject) => {
            let usrLog = Model.usuario.Action.getUsuarioLog();
            if(!usrLog) return reject({
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
                "component": "dm_cabfac",
                "type": "getPedidos",
                "estado": "cargando",
                "idemp": usrLog.idvendedor

            }).then((e: any) => {
                SDB.deleteAll(this.scheme.name).then((ex: any) => {
                    const arr = Object.values(e.data).map((a: any) => {
                        a.vdes = a.vdes + "";
                        return a;
                    })
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

    addPedido = async (dm_cabfac: any) => {
        dm_cabfac["tipo"] = "nuevo";
        SDB.insert(this.scheme.name, dm_cabfac);
    };

    loadToReducer = async () => {
        const e = await this.all()
        // Model.usuarioPage.Action._getReducer().data = data;
        let usrLog = Model.usuario.Action.getUsuarioLog();
        Model.tbemp.Action._dispatch({
            "component": "dm_cabfac",
            "type": "getPedidos",
            "idemp": usrLog?.idvendedor,
            estado: "exito",
            data: e,
        })
    }
}();



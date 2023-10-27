import SDB, { DBProps, Scheme, TableAbstract } from 'servisofts-db'
import SSocket from 'servisofts-socket';
import Model from '../../Model';
import { SDate } from 'servisofts-component';


export default new class ventas_factura extends TableAbstract {

    scheme: Scheme = {
        name: "ventas_factura",
        primaryKey: "idven",
        properties: {
            sync_type: "string?",
            "clilat": "double?",
            "clilon": "double?",
            "clinom": "string?",
            "codigo": "string?",
            "contado": "double?",
            "credito": "double?",
            "fecha": "string?",
            "descen": "double?",
            "direccion": "string?",
            "docum": "string?",
            "idcli": "int?",
            "idven": "int?",
            "razon_social": "string?",
            "tipo": "string?",
            "vtipp": "int?",
            "zona": "string?",
            detalle: "json?",
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
                "component": "tbemp",
                "type": "getVentasFactura",
                "estado": "cargando",
                "fecha": new SDate().addDay(-1).toString("yyyy-MM-dd"),
            }
            if (usrLog?.idtransportista) {
                request["idemp"] = usrLog.idtransportista
            } else {
                resolve("");
            }
            SSocket.sendPromise2(request).then((e: any) => {
                console.log(e);
                if (!e.data) return resolve("");
                const arr = e.data.map((a: any) => {
                    a.detalle = e.detalle.filter((det: any) => det.idven == a.idven);
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




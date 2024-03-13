import SDB, { DBProps, Scheme, TableAbstract } from 'servisofts-db'
import SSocket from 'servisofts-socket';
import Model from '../../Model';
import { SDate, SPopup, SStorage } from 'servisofts-component';


export default new class ventas_factura extends TableAbstract {
    constructor() {
        super();
        // SStorage.getItem("ventas_factura_fecha", (e: any) => {
        //     if (e) {
        //         this.fecha = e;
        //     } else {
        //         let date = new SDate().addDay(-1);
        //         if (date.getDayOfWeek() == 6) {
        //             date.addDay(-1);
        //         }
        //         this.fecha = date.toString("yyyy-MM-dd");
        //     }
        // })
    }
    // setFecha(fecha: any) {
    //     if (this.fecha == fecha) return;
    //     SStorage.setItem("ventas_factura_fecha", fecha);
    //     this.sync();
    // }

    scheme: Scheme = {
        name: "ventas_factura",
        primaryKey: "idven",
        properties: {
            sync_type: "string?",
            "clilat": "double?",
            "clilon": "double?",
            "clinom": "string?",
            "clitel": "string?",
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
            "empnom": "string?",
            "idemp": "int?",
            detalle: "json?",
        }
    }

    fecha: any = "";

    sync(): Promise<any> {
        return new Promise((resolve, reject) => {

            // SPopup.date("selecciona", (data: any) => {

            const fecha = this.fecha
            // this.fecha = ;
            // const fecha =  this.fecha
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
                "fecha": fecha,
            }
            if (usrLog?.idtransportista) {
                request["idemp"] = usrLog.idtransportista
            } else {
                return resolve("");
            }
            SSocket.sendPromise2(request).then((e: any) => {
                console.log(e);
                if (!e.data) {
                    SDB.deleteAll(this.scheme.name).then((ex: any) => {
                        SDB.insert("sync_data", {
                            tbname: this.scheme.name,
                            fecha_sync: new SDate().toString(),
                        })
                    })
                    return resolve("");
                }
                const arr = e.data.map((a: any) => {
                    a.detalle = e.detalle.filter((det: any) => det.idven == a.idven);
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




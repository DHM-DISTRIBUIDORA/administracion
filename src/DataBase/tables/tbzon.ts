import SDB, { DBProps, Scheme, TableAbstract } from 'servisofts-db'
import SSocket from 'servisofts-socket';
import Model from '../../Model';
import { SDate } from 'servisofts-component';


export default new class tbzon extends TableAbstract {

    scheme: Scheme = {
        name: "tbzon",
        primaryKey: "idz",
        properties: {
            sync_type: "string?",
            "idemp": "int?",
            "idgz": "int?",
            "idterr": "int?",
            "idz": "int?",
            "pedidos": "int?",
            "sucreg": "int?",
            "ventas": "int?",
            "zcod": "string?",
            "zdesfin": "int?",
            "zdia": "int?",
            "zest": "int?",
            "zfecmod": "string?",
            "znom": "string?",
            "znsuc": "int?",
            "ztipo": "string?",
            "zusumod": "string?",
        }
    }

    sync(): Promise<any> {
        return new Promise((resolve, reject) => {
            // let usrLog = Model.usuario.Action.getUsuarioLog();
            // if (!usrLog?.idvendedor) {
            //     return reject({
            //         estado: "error",
            //         error: "idvendedor not found"
            //     })
            // }
            SSocket.sendPromise2({
                "component": "tbzon",
                "type": "getAll",
                "estado": "cargando",
                // "idemp": usrLog.idvendedor
            }, 1000 * 60 * 5).then((e: any) => {
                SDB.deleteAll(this.scheme.name).then((ex: any) => {
                    SDB.insertArray(this.scheme.name, e.data).then((a: any) => {
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

    }
    loadToReducer = async () => {
        // const e = await this.all()
        // // Model.usuarioPage.Action._getReducer().data = data;
        // Model.tbemp.Action._dispatch({
        //     "component": "tbzon",
        //     "type": "getAll",
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




import SDB, { DBProps, Scheme, TableAbstract } from 'servisofts-db'
import SSocket from 'servisofts-socket';
import Model from '../../Model';
import { SDate } from 'servisofts-component';


export default new class almacen_empleado extends TableAbstract {

    scheme: Scheme = {
        name: "almacen_empleado",
        primaryKey: "key",
        properties: {
            sync_type: "string?",
            "key": "string",
            "key_usuario": "string?",
            "fecha_on": "string?",
            "estado": "int?",
            "idalm": "int?",
            "idemp": "int?",
            "dia": "int?",
        }
    }

    sync(): Promise<any> {
        return new Promise((resolve, reject) => {
            SSocket.sendPromise2({
                "component": "almacen_empleado",
                "type": "getAll",
                "estado": "cargando",
                // "idemp": usrLog.idvendedor
            }, 1000 * 60 * 5).then((e: any) => {
                SDB.deleteAll(this.scheme.name).then((ex: any) => {
                    SDB.insertArray(this.scheme.name, Object.values(e.data)).then((a: any) => {
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

    }

    async deleteAll(): Promise<any> {
        await super.deleteAll();
        SDB.delete("sync_data", this.scheme.name)
        return true;
    }
}();




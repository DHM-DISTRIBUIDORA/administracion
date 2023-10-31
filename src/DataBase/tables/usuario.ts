import SDB, { DBProps, Scheme, TableAbstract } from 'servisofts-db'
import SSocket from 'servisofts-socket';
import Model from '../../Model';
import { SDate } from 'servisofts-component';


export default new class usuario extends TableAbstract {

    scheme: Scheme = {
        name: "usuario",
        primaryKey: "key",
        properties: {
            sync_type: "string?",
            key: "string",
            estado: "string?",
            fecha_on: "string?",
            Nombres: "string?",
            Apellidos: "string?",
            CI: "string?",
            Correo: "string?",
            Telefono: "string?",
            Password: "string?",
            idvendedor: "string?",
            idtransportista: "string?",

        }
    }

    sync(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            let sync_data = {
                tbname: this.scheme.name,
                fecha_sync: '1950-01-01T00:00:00.0'
            }
            try {
                sync_data = await SDB.objectForPrimaryKey("sync_data", this.scheme.name);
            } catch (error) {
                SDB.insert("sync_data", sync_data)
            }

            SSocket.sendPromise2({
                "service": "usuario",
                "version": "2.0",
                "component": "usuario",
                "type": "getAll",
                "cabecera": "usuario_app",
                "fecha_edit": sync_data.fecha_sync,
                // "fecha_edit": "2023-09-10T17:00:50",
            }).then(async (e: any) => {


                // SDB.dele teAll(this.scheme.name).then(ex => {
                SDB.insertArray(this.scheme.name, Object.values(e.data)).then(a => {
                    sync_data.fecha_sync = new SDate().toString("yyyy-MM-ddThh:mm:ss.0") + "";
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
        let data: any = {};
        e.map((a: any) => {
            data[a.key] = a
        })
        // Model.usuarioPage.Action._getReducer().data = data;
        Model.usuarioPage.Action._dispatch({
            "service": "usuario",
            "version": "2.0",
            "component": "usuario",
            "type": "getAll",
            "cabecera": "usuario_app",
            estado: "exito",
            data: data,
        })
    }
    async deleteAll(): Promise<any> {
        await super.deleteAll();
        SDB.delete("sync_data", this.scheme.name)
        return true;
    }
}();

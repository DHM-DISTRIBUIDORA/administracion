import SDB, { DBProps, Scheme, TableAbstract } from 'servisofts-db'
import SSocket from 'servisofts-socket';
import Model from '../../Model';


export default new class usuario extends TableAbstract {

    scheme: Scheme = {
        name: this.constructor.name,
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
        return new Promise((resolve, reject) => {
            SSocket.sendPromise2({
                "service": "usuario",
                "version": "2.0",
                "component": "usuario",
                "type": "getAll",
                "cabecera": "usuario_app",
                // "fecha_edit": "2022-09-10T17:00:50",
                // "fecha_edit": "2023-09-10T17:00:50",
            }).then((e: any) => {
                SDB.deleteAll(this.scheme.name).then(ex => {
                    SDB.insertArray(this.scheme.name, Object.values(e.data)).then(a => {
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
}();

import SDB, { DBProps, Scheme, TableAbstract } from 'servisofts-db'
import SSocket from 'servisofts-socket';
import Model from '../../Model';
import { SDate } from 'servisofts-component';


export default new class usuarioPage extends TableAbstract {

    scheme: Scheme = {
        name: "usuarioPage",
        primaryKey: "key",
        properties: {
            sync_type: "string?",
            key: "string",
            fecha_on: "date?",
            estado: "int?",
            index: "int?",
            descripcion: "string?",
            key_servicio: "string?",
            style: "string?",
            permisos: "json?",
            url: "string?",
        }
    }
    sync(): Promise<any> {
        return new Promise((resolve, reject) => {
            let usrLog = Model.usuario.Action.getUsuarioLog();
            if (!usrLog?.key) return reject({
                estado: "error",
                code: 200,
                error: "user not found"
            })
            SSocket.sendPromise2({
                "version": "1.0",
                "service": "roles_permisos",
                "component": "usuarioPage",
                "type": "getAll",
                "estado": "cargando",
                "key_usuario": Model.usuario.Action.getKey()
            }, 2000).then(async (e: any) => {
                try {
                    await SDB.deleteAll("usuarioPage")
                    const a = await SDB.insertArray("usuarioPage", Object.values(e.data))
                    SDB.insert("sync_data", {
                        tbname: this.scheme.name,
                        fecha_sync: new SDate().toString(),
                    })
                    this.loadToReducer();
                    resolve(e);
                } catch (error) {
                    reject(error)
                }

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
            // a.permisos = JSON.parse(a.permisos);
            data[a.url] = a
        })
        // Model.usuarioPage.Action._getReducer().data = data;
        Model.usuarioPage.Action._dispatch({
            component: "usuarioPage",
            type: "getAll",
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

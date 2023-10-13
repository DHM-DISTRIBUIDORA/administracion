import SDB, { DBProps, Scheme, TableAbstract } from 'servisofts-db'
import SSocket from 'servisofts-socket';
import Model from '../../Model';


export default new class sync_data extends TableAbstract {

    scheme: Scheme = {
        name: this.constructor.name,
        primaryKey: "tbname",
        properties: {
            tbname: "string",
            fecha_sync: "string?",
            sync_type: "string?",

            
        }
    }

    sync(): Promise<any> {
        return new Promise((resolve, reject) => {
            return resolve("");
            // SSocket.sendPromise2({
            //     "component": "tbcat",
            //     "type": "getAll",
            //     "estado": "cargando"
            // }).then((e: any) => {
            //     SDB.deleteAll(this.scheme.name).then((ex: any) => {
            //         SDB.insertArray(this.scheme.name, e.data).then((a: any) => {
            //             resolve(e);
            //         })
            //     })
            // }).catch(e => {
            //     console.error(e)
            //     reject(e);
            // })
        })

    }
    loadToReducer = async () => {
        // const e = await this.all()
        // Model.usuarioPage.Action._getReducer().data = data;
        // Model.tbcli.Action._dispatch({
        //     "component": "tbcat",
        //     "type": "getAll",
        //     estado: "exito",
        //     data: e,
        // })
    }
}();




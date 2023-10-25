import SDB, { DBProps, Scheme, TableAbstract } from 'servisofts-db'
import SSocket from 'servisofts-socket';
import Model from '../../Model';


export default new class background_location extends TableAbstract {

    scheme: Scheme = {
        name: "background_location",
        primaryKey: "key",
        properties: {
            sync_type: "string?",
            "key": "string?",
            "tipo": "string?",
            "accuracy": "double?",
            "altitude": "double?",
            "distanceMoved": "double?",
            "index": "int?",
            "latitude": "double?",
            "longitude": "double?",
            "rotation": "double?",
            "speed": "double?",
            "time": "float?",
            "fecha_on":"string?",
        }
    }

    sync(): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve("exito")
            // SSocket.sendPromise2({
            //     "version": "1.0",
            //     "component": "tbprd",
            //     "type": "getAllSimple",
            //     "estado": "cargando"
            // }).then((e: any) => {
            //     SDB.deleteAll(this.scheme.name).then((ex) => {
            //         SDB.insertArray(this.scheme.name, e.data).then(a => {
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
        // Model.tbprd.Action._dispatch({
        //     "version": "1.0",
        //     "component": "tbprd",
        //     "type": "getAllSimple",
        //     estado: "exito",
        //     data: e,
        // })
        // Model.tbprd.Action._dispatch({
        //     "version": "1.0",
        //     "component": "tbprd",
        //     "type": "getAll",
        //     estado: "exito",
        //     data: e,
        // })
    }
}();




import SDB, { DBProps, Scheme, TableAbstract } from 'servisofts-db'
import SSocket from 'servisofts-socket';
import Model from '../Model';


export default new class tbprdlin extends TableAbstract {

    scheme: Scheme = {
        name: this.constructor.name,
        primaryKey: "idlinea",
        properties: {
            sync_type: "string?",
            "lincod": "string?",
            "linicefv": "string?",
            "idlinea": "int?",
            "idctaing": "int?",
            "idctacos": "int?",
            "linniv": "int?",
            "idctacosdoc": "int?",
            "linice": "int?",
            "linnom": "string?",
            "idctaingdoc": "int?"
        }
    }

    sync(): Promise<any> {
        return new Promise((resolve, reject) => {
            SSocket.sendPromise2({
                "version": "1.0",
                "component": "tbprdlin",
                "type": "getAll",
                "estado": "cargando"
            }).then((e: any) => {
                SDB.deleteAll(this.scheme.name).then(ex => {
                    SDB.insertArray(this.scheme.name, e.data).then(a => {
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
        // Model.usuarioPage.Action._getReducer().data = data;
        Model.tbprd.Action._dispatch({
            "version": "1.0",
            "component": "tbprdlin",
            "type": "getAll",
            estado: "exito",
            data: e,
        })
    }
}();




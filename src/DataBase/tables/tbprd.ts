import SDB, { DBProps, Scheme, TableAbstract } from 'servisofts-db'
import SSocket from 'servisofts-socket';
import Model from '../../Model';


export default new class tbprd extends TableAbstract {

    scheme: Scheme = {
        name: "tbprd",
        primaryKey: "idprd",
        properties: {
            sync_type: "string?",
            "idprd": "int?",
            "prdcor": "string?",
            "prdcod": "string?",
            "prduxcdes": "string?",
            "idlinea": "int?",
            "prdcxu": "double?",
            "prduxd": "double?",
            "prdunid": "string?",
            "prdpoficial": "double?",
            "stock": "double?",
            "prdnom": "string?",
        }
    }

    sync(): Promise<any> {
        return new Promise((resolve, reject) => {
            SSocket.sendPromise2({
                "version": "1.0",
                "component": "tbprd",
                "type": "getAllSimple",
                "estado": "cargando"
            }).then((e: any) => {
                SDB.deleteAll(this.scheme.name).then((ex) => {
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
            "component": "tbprd",
            "type": "getAllSimple",
            estado: "exito",
            data: e,
        })
        Model.tbprd.Action._dispatch({
            "version": "1.0",
            "component": "tbprd",
            "type": "getAll",
            estado: "exito",
            data: e,
        })
    }
}();




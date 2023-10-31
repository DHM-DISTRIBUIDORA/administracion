import SDB, { DBProps, Scheme, TableAbstract } from 'servisofts-db'
import SSocket from 'servisofts-socket';
import Model from '../../Model';
import { SDate } from 'servisofts-component';


export default new class tbemp extends TableAbstract {

    scheme: Scheme = {
        name: "tbemp",
        primaryKey: "idemp",
        properties: {
            sync_type: "string?",
            "idemp": "int",
            "empcod": "string?",
            "empcomis": "int?",
            "empconffin": "string?",
            "empconfini": "string?",
            "empest": "int?",
            "empfecmod": "string?",
            "empflete": "int?",
            "empidalm": "int?",
            "empidan": "int?",
            "empimpr": "string?",
            "empnom": "string?",
            "empnsuc": "int?",
            "emppos": "int?",
            "empraz": "string?",
            "emptpag": "int?",
            "empusumod": "string?",
            "idconf": "int?",
            "idempSup": "int?",
            "idemt": "int?",
            "idus": "int?",
            "sucreg": "int?",
        }
    }

    sync(): Promise<any> {
        return new Promise((resolve, reject) => {
            SSocket.sendPromise2({
                "version": "1.0",
                "component": "tbemp",
                "type": "getAll",
                "estado": "cargando"
            }, 1000 * 60 * 5).then((e: any) => {
                SDB.deleteAll(this.scheme.name).then(ex => {
                    SDB.insertArray(this.scheme.name, e.data).then(a => {
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
        // Model.usuarioPage.Action._getReducer().data = data;
        // Model.tbemp.Action._dispatch({
        //     "version": "1.0",
        //     "component": "tbemp",
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



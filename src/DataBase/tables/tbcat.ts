import SDB, { DBProps, Scheme, TableAbstract } from 'servisofts-db'
import SSocket from 'servisofts-socket';
import Model from '../../Model';
import { SDate } from 'servisofts-component';


export default new class tbcat extends TableAbstract {

    scheme: Scheme = {
        name: "tbcat",
        primaryKey: "idcat",
        properties: {
            sync_type: "string?",
            idcat: "int",
            catnom: "string?",
            catcod: "string?",
            catidclit: "int?",
            catmarc: "string?",
            catfadv: "string?",
            catfadvcolor: "int?",
            catclitp: "int?",
        }
    }

    sync(): Promise<any> {
        return new Promise((resolve, reject) => {

            SSocket.sendPromise2({
                "component": "tbcat",
                "type": "getAll",
                "estado": "cargando"
            }).then((e: any) => {
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
        // Model.tbcli.Action._dispatch({
        //     "component": "tbcat",
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




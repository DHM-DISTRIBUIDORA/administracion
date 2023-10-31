import SDB, { DBProps, Scheme, TableAbstract, Trigger } from 'servisofts-db'
import SSocket from 'servisofts-socket';
import Model from '../../Model';


export default new class enviroments extends TableAbstract {

    scheme: Scheme = {
        name: "enviroments",
        primaryKey: "key",
        properties: {
            key: "string",
            value: "string?",
        }
    }

    sync(): Promise<any> {
        return new Promise((resolve, reject) => {
            return resolve("");
        })

    }
    loadToReducer = async () => {

    }
}();




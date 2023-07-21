import { SAction } from "servisofts-model";
import SSocket from 'servisofts-socket'
export default class Action extends SAction {

    find(key: any, extra: {}, _default: any) {
        return SSocket.sendPromise({
            ...this.model.info,
            type: "getByKey",
            key: key + "",
        }).then(e => {
            const data = e.data[0];
            if (!data) throw "Not found"
            return data;
        })
    }
    getByKeyEmpleado(key: any, extra: {}, _default: any) {
        return SSocket.sendPromise({
            ...this.model.info,
            type: "getByKeyEmpleado",
            key: key + "",
        }).then(e => {
            const data = e.data[0];
            if (!data) throw "Not found"
            return data;
        })
    }
}
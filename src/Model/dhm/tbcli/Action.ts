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
    getByKey(key: any, extra: {}, _default: any) {
        var reducer = this._getReducer();
        var data = reducer.data;
        if (!data) {
            if (reducer.estado == "cargando")
                return null;
            var petition = {
                ...this.model.info,
                type: "getByKey",
                estado: "cargando",
                key: key,
                ...(extra ?? {})
            };
            SSocket.send(petition);
            return data;
        }
        return data[key];
    }
    // getByKeyEmpleado(key: any, extra: {}, _default: any) {
    //     return SSocket.sendPromise({
    //         ...this.model.info,
    //         type: "getByKeyEmpleado",
    //         key: key + "",
    //     }).then(e => {
    //         const data = e.data[0];
    //         if (!data) throw "Not found"
    //         return data;
    //     })
    // }
}
import { SAction } from "servisofts-model";
import SSocket from 'servisofts-socket'
export default class Action extends SAction {

    getVenta(extra?: { idven: number }) {
        return SSocket.sendPromise({
            ...this.model.info,
            type: "getVenta",
            ...extra
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
}
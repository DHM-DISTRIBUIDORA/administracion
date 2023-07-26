import { SAction } from "servisofts-model";
import SSocket from 'servisofts-socket'
export default class Action extends SAction {

    getAllSimple(extra?: {}) {
        var reducer = this._getReducer();
        var data = reducer.dataSimple;
        if (!data) {
            if (reducer.estado == "cargando")
                return null;
            var petition = {
                ...this.model.info,
                type: "getAllSimple",
                estado: "cargando",
                ...(extra ?? {})
            };
            SSocket.send(petition);
            return data;
        }
        return data;
    }
}
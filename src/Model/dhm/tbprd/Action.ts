import { SAction } from "servisofts-model";
import SSocket from 'servisofts-socket'
export default class Action extends SAction {

    getAllSimple(extra?: { idalm?: any }) {
        var reducer = this._getReducer();
        var data = reducer.dataSimple;

        // if (extra?.idalm != reducer.idalm) {
        //     data = null;
        //     if (extra?.idalm) {
        //         reducer.idalm = extra.idalm;
        //     }
        // }
        // if (!data) {
        //     if (reducer.estado == "cargando")
        //         return null;
        //     var petition = {
        //         ...this.model.info,
        //         type: "getAllSimple",
        //         estado: "cargando",
        //         ...(extra ?? {})
        //     };
        //     SSocket.send(petition);
        //     return data;
        // }
        return data;
    }


}
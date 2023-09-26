import { SStorage } from "servisofts-component";
import { SAction } from "servisofts-model";
import SSocket from 'servisofts-socket'
export default class Action extends SAction {

    getCliente = () => {
        var reducer = this._getReducer()
        return reducer.cliente;
    }
    setCliente = (cliente) => {
        this._dispatch({
            component: "tbcli",
            type: "setCliente",
            data: cliente,
        })
    }
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
    getByCode(code: any, extra: {}, _default: any) {
        return SSocket.sendPromise({
            ...this.model.info,
            type: "getByCode",
            code: code + "",
        }).then(e => {
            const data = e.data[0];
            if (!data) throw { error: `No existe el código de cliente '${code}'` }
            return data;
        })
    }
    getByKey(key: any, extra: {}, _default: any) {
        var reducer = this._getReducer();
        var data = reducer.data ?? {};
        if (!data[key]) {
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
            return data[key];
        }
        return data[key];
    }
    getClientesDia({ idemp, sdate }) {
        // dia: , fecha: this.state.curdate.toString("yyyy-MM-dd") }
        return SSocket.sendPromise({
            ...this.model.info,
            type: "getClientesDia",
            idemp: idemp + "",
            dia: sdate.date.getDay(),
            fecha: sdate.toString("yyyy-MM-dd")
        })
    }
    getEntregas({ idemp, sdate }) {
        // dia: , fecha: this.state.curdate.toString("yyyy-MM-dd") }
        return SSocket.sendPromise({
            ...this.model.info,
            type: "getClientesDia",
            idemp: idemp + "",
            dia: sdate.date.getDay(),
            fecha: sdate.toString("yyyy-MM-dd")
        })
    }
}
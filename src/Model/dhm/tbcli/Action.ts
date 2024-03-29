import { SDate, SStorage, SUuid } from "servisofts-component";
import { SAction } from "servisofts-model";
import SSocket from 'servisofts-socket'
import DataBase from "../../../DataBase";
export default class Action extends SAction {


    editar(extra?: { data: any }): Promise<unknown> {
        return new Promise(async (resolve, reject) => {
            if (!extra) return;
            if(extra.data.sync_type != "insert"){
                extra.data.sync_type = "update";
            }
            extra.data.fecmod = new SDate().toString("yyyy-MM-dd hh:mm:ss.0")
            const update = await DataBase.tbcli.update(extra?.data)
            this._dispatch({
                ...this.model.info,
                type: "editar",
                estado: "exito",
                data: extra?.data
            })
            resolve(update);
        })
    }

    registro(extra?: { data: any }): Promise<unknown> {
        return new Promise(async (resolve, reject) => {
            if (!extra) return;
            extra.data.sync_type = "insert";
            extra.data.fecmod = new SDate().toString("yyyy-MM-dd hh:mm:ss.0")
            // const cantidad: any[] = await DataBase.tbcli.filtered("id < 0");

            extra.data.idcli = new Date().getTime()
            extra.data.clicod = extra.data.idcli + "";
            const data = await DataBase.tbcli.insert(extra?.data)
            this._dispatch({
                ...this.model.info,
                type: "registro",
                estado: "exito",
                data: extra?.data
            })
            resolve(extra?.data);
        })
    }
    getCliente = () => {
        var reducer = this._getReducer()
        return reducer.cliente;
    }
    setCliente = (cliente: any) => {
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
        }).then((e: any) => {
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
        }).then((e: any) => {
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
    getClientesDia({ idemp, sdate }: any) {
        // dia: , fecha: this.state.curdate.toString("yyyy-MM-dd") }
        return SSocket.sendPromise({
            ...this.model.info,
            type: "getClientesDia",
            idemp: idemp + "",
            dia: sdate.date.getDay(),
            fecha: sdate.toString("yyyy-MM-dd")
        })
    }
    getEntregas({ idemp, sdate }: any) {
        // dia: , fecha: this.state.curdate.toString("yyyy-MM-dd") }
        return SSocket.sendPromise({
            ...this.model.info,
            type: "getClientesDia",
            idemp: idemp + "",
            dia: sdate.date.getDay(),
            fecha: sdate.toString("yyyy-MM-dd")
        })
    }

    getByCliCod(clicod: any, extra: {}, _default: any) {
        return SSocket.sendPromise({
            ...this.model.info,
            type: "getByCliCod",
            clicod: clicod + "",
        }).then((e: any) => {
            const data = e.data[0];
            if (!data) throw { error: `No existe el código de cliente '${clicod}'` }
            return data;
        })
    }
    // editar(extra?: any): Promise<unknown> {
    //     return new Promise((resolve, reject) => {
    //         return DataBase.tbcli.update(extra.data);
    //     })
    // }
}
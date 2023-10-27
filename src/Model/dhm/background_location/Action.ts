import { SDate, SStorage, SUuid } from "servisofts-component";
import { SAction } from "servisofts-model";
import SSocket from 'servisofts-socket';
import Model from "../..";
import DataBase from "../../../DataBase";
import { TableAbstract } from "servisofts-db";
import background_location from ".";
export default class Action extends SAction {

    getCurrentLocation() {
        return this._getReducer().location
    }
    onChange(data: any, type: any) {
        // var obj = {
        //     component: "background_location",
        //     type: "onChange",
        //     estado: "cargando",
        //     key_usuario: Model.usuario.Action.getKey(),
        //     data: data,
        //     tipo: type,
        // }
        if (!data) {
            data = {}
        }
        data.key = SUuid();
        data.fecha_on = new SDate().toString("yyyy-MM-ddThh:mm:ss.000Z");
        data.tipo = type;
        data.sync_type = "insert";
        DataBase.background_location.insert(data)
        console.log(data)
        this.subirCambios(DataBase.background_location)
        // SSocket.sendHttpAsync(SSocket.api.root + "api", obj)
        // this._dispatch(obj);
        return true;
    }


    subirCambios = async (table: TableAbstract) => {
        const _insert = await table.filtered("sync_type == 'insert'");
        const _update = await table.filtered("sync_type == 'update'");
        const _delete = await table.filtered("sync_type == 'delete'");

        let cantidad = _insert.length + _update.length + _delete.length
        if (cantidad <= 0) throw "No hay cambios";
        // SSocket.sendHttpAsync(SSocket.api.root + "api", obj)
        const respuesta: any = await SSocket.sendHttpAsync(SSocket.api.root + "api", {
            component: table.scheme.name,
            type: "uploadChanges",
            key_usuario: Model.usuario.Action.getKey(),
            insert: _insert,
            update: _update,
            delete: _delete,
        })
        // }, 1000 * 40)
        if (respuesta?.estado != "exito") throw "No respondio exito";

        await table.deleteAll();
        return respuesta;
    }

    getByKeyAsync(key_usuario: any) {
        return new Promise((resolve, reject) => {
            SSocket.sendPromise({
                ...this.model.info,
                type: "getByKey",
                key_usuario: key_usuario ?? Model.usuario.Action.getKey()
            }).then((resp) => {
                resolve(resp)
            }).catch(resp => {
                reject(resp)
            })
        })
    }
}
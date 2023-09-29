import { SStorage } from "servisofts-component";
import { SAction } from "servisofts-model";
import SSocket from 'servisofts-socket';
import Model from "../..";
export default class Action extends SAction {

    getCurrentLocation() {
        return this._getReducer().location
    }
    onChange(data:any, type:any) {
        var obj = {
            component: "background_location",
            type: "onChange",
            estado: "cargando",
            key_usuario: Model.usuario.Action.getKey(),
            data: data,
            tipo: type,
        }
        console.log(obj);
        SSocket.sendHttpAsync(SSocket.api.root + "api", obj)
        this._dispatch(obj);
        return true;
    }

    getByKeyAsync(key_usuario:any) {
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
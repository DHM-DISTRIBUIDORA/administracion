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
}
import { SAction } from "servisofts-model";
import DataBase from "../../../DataBase";
export default class Action extends SAction {
    editar(extra?: { data: any }): Promise<unknown> {
        return new Promise(async (resolve, reject) => {
            if (!extra) return;
            extra.data.sync_type = "update";
            const update = await DataBase.tbzon.update(extra?.data)
            this._dispatch({
                ...this.model.info,
                type: "editar",
                estado: "exito",
                data: update
            })
            resolve(update);
        })
    }
}
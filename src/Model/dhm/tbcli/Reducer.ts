import { SReducer } from "servisofts-model";

export default class Reducer extends SReducer {

    getByKey(state: any, action: any): void {
        if (action.estado == "exito") {
            if (action.data && typeof action.data == "object") {
                if (Array.isArray(action.data)) {
                    state.data = {};
                    action.data.map((o) => state.data[o[this.model.pk]] = o);
                    return;
                }
            }
            state.data = action.data;
        }
    }

}
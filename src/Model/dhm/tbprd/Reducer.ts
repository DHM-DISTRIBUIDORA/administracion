import { SReducer } from "servisofts-model";

export default class Reducer extends SReducer {

    getAllSimple(state: any, action: any): void {
        if (action.estado != "exito") return;
        state.dataSimple = action.data;
    }
}
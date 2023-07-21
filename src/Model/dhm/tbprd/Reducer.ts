import { SReducer } from "servisofts-model";

export default class Reducer extends SReducer {

    getAllSimple(state: any, action: any): void {
        state.data = action.data;
    }
}
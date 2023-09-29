import { SStorage } from "servisofts-component";
import { SReducer } from "servisofts-model";

export default class Reducer extends SReducer {

    initialState() {
        var state = super.initialState();
        SStorage.getItem("cliente_dhm", (resp: any) => {
            if (!resp) return;
            state.cliente = JSON.parse(resp);
        });


        return state;
    }
    setCliente(state: any, action: any): void {
        state.cliente = action.data;
        SStorage.setItem("cliente_dhm", JSON.stringify(action.data));
    }
    getByKey(state: any, action: any): void {
        if (action.estado == "exito") {
            if (action.data && typeof action.data == "object") {
                if (Array.isArray(action.data)) {
                    state.data = {};
                    action.data.map((o:any) => state.data[o[this.model.pk]] = o);
                    return;
                }
            }
            state.data = action.data;
        }
    }

}
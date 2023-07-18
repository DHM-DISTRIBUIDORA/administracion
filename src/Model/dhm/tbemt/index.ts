import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "tbemt"
    },
    Columns: {
        "idemt": { type: "integer", pk: true },
        "emtnom": { type: "text", pk: true, editable: true },

    },
    // image: {
    //     api: "root",
    //     name: "productos"
    // },
    Action,
    Reducer,
});
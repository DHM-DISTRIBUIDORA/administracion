import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "tbrutadia"
    },
    Columns: {
        "idrd ": { type: "text", pk: true },
        "idz": { type: "text", editable: true },
        "rddia": { type: "text", editable: true },
        "rdobj": { type: "text", editable: true },
    },
    // image: {
    //     api: "root",
    //     name: "productos"
    // },
    Action,
    Reducer,
});
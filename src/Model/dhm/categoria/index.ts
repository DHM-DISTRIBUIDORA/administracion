import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "categoria"
    },
    Columns: {
        "catcod": { type: "text", pk: true },
        "nombre": { type: "text", },
        "nivel": { type: "integer", },
    },
    Action,
    Reducer,
});
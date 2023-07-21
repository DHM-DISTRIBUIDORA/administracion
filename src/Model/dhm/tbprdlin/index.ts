import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "tbprdlin"
    },
    Columns: {
        "idlinea": { type: "integer", pk: true },
        "linnom": { type: "text",  editable: true },
        "linniv": { type: "integer",  editable: true },
        "lincod": { type: "text",  editable: true },
        "idprv": { type: "text",  editable: true },
        "linusumod": { type: "text",  editable: true },
        "linfecmod": { type: "date",  editable: true },
        "idctaing": { type: "integer",  editable: true },
        "idctacos": { type: "integer",  editable: true },
        "idctaingdoc": { type: "integer",  editable: true },
        "idctacosdoc": { type: "integer",  editable: true },
        "linice": { type: "double",  editable: true },
        "linicefv": { type: "date",  editable: true },
        "sucreg": { type: "integer",  editable: true },

    },
    // image: {
    //     api: "root",
    //     name: "productos"
    // },
    Action,
    Reducer,
});
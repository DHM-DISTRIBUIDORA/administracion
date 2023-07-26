import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "dm_productos"
    },
    Columns: {
        "prdcod": { type: "text", pk: true },
        "catcod": { type: "text", fk: "dm_categorias", editable: true },
        "nombre": { type: "text", editable: true },
        "Unidad": { type: "text", editable: true },
        "uxc": { type: "text", editable: true },
        "Precio": { type: "text", editable: true },
        "Stock": { type: "text", editable: true },
        "idalm": { type: "text", fk: "alm???", editable: true },
    },
    // image: {
    //     api: "root",
    //     name: "productos"
    // },
    Action,
    Reducer,
});
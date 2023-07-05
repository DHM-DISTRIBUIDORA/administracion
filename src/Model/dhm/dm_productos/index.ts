import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "dm_productos"
    },
    Columns: {
        "prdcod": { type: "text", pk: true },
        "catcod": { type: "text", fk: "dm_categorias" },
        "nombre": { type: "text", },
        "unidad": { type: "text", },
        "uxc": { type: "text", },
        "Precio": { type: "text", },
        "Stock": { type: "text", },
        "idalm": { type: "text", fk: "alm???" },
    },
    // image: {
    //     api: "root",
    //     name: "productos"
    // },
    Action,
    Reducer,
});
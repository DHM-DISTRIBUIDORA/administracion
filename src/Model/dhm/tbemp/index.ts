import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "tbemp"
    },
    Columns: {
        "idemp": { type: "text", pk: true },
        "empcod": { type: "text", editable: true },
        "empnom": { type: "text", editable: true },
        "empdir": { type: "text", editable: true },
        "emptel": { type: "text", editable: true },
        "idemt": { type: "integer", editable: true, fk: "tbemt" },
        "empcom": { type: "text", editable: true },
        "emppos": { type: "text", editable: true },
        "idus": { type: "integer", editable: true },
        "empest": { type: "integer", editable: true },
        "empflete": { type: "integer", editable: true },
        "empemail": { type: "text", editable: true },
        "empape": { type: "text", editable: true },
        "idconf": { type: "integer", editable: true },
        "dmsest": { type: "integer", editable: true },
        "empusumod": { type: "text", editable: true },
        "empfecmod": { type: "text", editable: true },
        "empnsuc": { type: "integer", editable: true },
        "emptpag": { type: "integer", editable: true },
        "empidalm": { type: "integer", editable: true },
        "idempSup": { type: "integer", editable: true },
        "empci": { type: "text", editable: true },
        "empncon": { type: "text", editable: true },
        "empconfini": { type: "text", editable: true },
        "empconffin": { type: "text", editable: true },
        "empcomis": { type: "text", editable: true },
        "empraz": { type: "text", editable: true },
        "empidan": { type: "integer", editable: true },
        "empimpr": { type: "text", editable: true },
        "empplaca": { type: "text", editable: true },
        "empmarca": { type: "text", editable: true },
        "empcolor": { type: "text", editable: true },
        "empmarc": { type: "text", editable: true },
        "sucreg": { type: "integer", editable: true },


    },
    // image: {
    //     api: "root",
    //     name: "tbemp"
    // },
    // image: {
    //     api: "root",
    //     name: "productos"
    // },
    Action,
    Reducer,
});
import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "dm_usuarios"
    },
    Columns: {
        "idus": { type: "text", pk: true },
        "usuario": { type: "text", editable: true },
        "pass": { type: "text", editable: true },
        "usumod": { type: "text", editable: true },
        "fecmod": { type: "text", editable: true },
        "usest": { type: "integer", editable: true },
        "nombre": { type: "text", editable: true },
        // "iniciales": { type: "text", editable: true },
        "modpreven": { type: "integer", editable: true },
        "idcentro": { type: "integer", editable: true },
        "suctod": { type: "integer", editable: true },
        "usultsuc": { type: "integer", editable: true },
        "verval": { type: "integer", editable: true },
        "selcob": { type: "integer", editable: true },
        // "autcred": { type: "integer", editable: true },
        "pcpred": { type: "text", editable: true },
        "facauto": { type: "integer", editable: true },
        // "uimpr": { type: "integer", editable: true },

    },
    // image: {
    //     api: "root",
    //     name: "productos"
    // },
    Action,
    Reducer,
});
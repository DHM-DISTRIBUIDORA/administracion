import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "dm_clientes"
    },
    Columns: {
        "clicod": { type: "text", pk: true },
        "nombre": { type: "text", fk: "dm_categorias", editable: true },
        "direccion": { type: "text", editable: true },
        "telefono": { type: "text", editable: true },
        "NIT": { type: "text", editable: true },
        "categoria": { type: "text", editable: true },
        "zona": { type: "text", editable: true },
        "estadovisita": { type: "text", editable: true },
        "motivonoventa": { type: "text", editable: true },
        "codvendedor": { type: "text", editable: true },
        "latitud": { type: "text", editable: true },
        "longitud": { type: "text", editable: true },
    },
    // image: {
    //     api: "root",
    //     name: "productos"
    // },
    Action,
    Reducer,
});
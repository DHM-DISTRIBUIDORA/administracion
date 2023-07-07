import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "dm_clientes"
    },
    Columns: {
        "clicod": { type: "text", pk: true },
        "nombre": { type: "text", fk: "dm_categorias" },
        "direccion": { type: "text", },
        "telefono": { type: "text", },
        "NIT": { type: "text", },
        "categoria": { type: "text", },
        "zona": { type: "text", },
        "estadovisita": { type: "text"},
        "motivonoventa": { type: "text"},
        "codvendedor": { type: "text"},
        "latitud": { type: "text"},
        "longitud": { type: "text"},
    },
    // image: {
    //     api: "root",
    //     name: "productos"
    // },
    Action,
    Reducer,
});
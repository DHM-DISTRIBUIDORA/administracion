import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "tbalm"
    },
    Columns: {
        "idalm": { type: "text", pk: true },
        "almcod": { type: "text", editable: true },
        "almnom": { type: "text", editable: true },
        "almdir": { type: "text", editable: true },
        "almtel": { type: "text", editable: true },
        "almrsp": { type: "text", editable: true },
        "almcom": { type: "text", editable: true },
        "idemp": { type: "text", editable: true },
        "almtipo": { type: "text", editable: true },
        "idcli": { type: "text", editable: true },
        "almord": { type: "text", editable: true },
        "idcentro": { type: "text", editable: true },
        "almncarga": { type: "text", editable: true },
        "idctaalm": { type: "text", editable: true },
        "almusumod": { type: "text", editable: true },
        "almfecmod": { type: "text", editable: true },
        "almnsuc": { type: "text", editable: true },
        "almest": { type: "text", editable: true },
        "sucreg": { type: "text", editable: true },
    },
    Action,
    Reducer,
});

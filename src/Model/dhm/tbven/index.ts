import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "tbven"
    },
    Columns: {
        "idven": { type: "text", pk: true },
        "vnit": { type: "text", editable: true },
        "vcli": { type: "text", editable: true },
        "vdet": { type: "text", editable: true },
        "vtipa": { type: "text", editable: true },
        "vnum": { type: "text", editable: true },
        "vtipo": { type: "text", editable: true },
        "idcli": { type: "text", editable: true },
        "vfec": { type: "text", editable: true },
        "vidzona": { type: "text", editable: true },


    },
    Action,
    Reducer,
});
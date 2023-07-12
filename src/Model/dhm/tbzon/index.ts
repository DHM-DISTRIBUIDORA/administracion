import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "tbzon"
    },
    Columns: {
        "idz": { type: "integer", pk: true },
        "zcod": { type: "text", pk: true, editable: true },
        "idemp": { type: "integer", pk: true, editable: true },
        "znom": { type: "text", pk: true, editable: true },
        "zterr": { type: "text", pk: true, editable: true },
        "ztipo": { type: "text", pk: true, editable: true },
        "idterr": { type: "integer", pk: true, editable: true },
        "zest": { type: "integer", pk: true, editable: true },
        "zdia": { type: "integer", pk: true, editable: true },
        "zdmsest": { type: "integer", pk: true, editable: true },
        "zdesfin": { type: "integer", pk: true, editable: true },
        "znsuc": { type: "integer", pk: true, editable: true },
        "idgz": { type: "integer", pk: true, editable: true },
        "zmarc": { type: "integer", pk: true, editable: true },
        "sucreg": { type: "integer", pk: true, editable: true },
        "zusumod": { type: "text", pk: true, editable: true },
        "zfecmod": { type: "text", pk: true, editable: true },

    },
    // image: {
    //     api: "root",
    //     name: "productos"
    // },
    Action,
    Reducer,
});
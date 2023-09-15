import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "tbtg"
    },
    Columns: {
        "idtg": { type: "text", pk: true },
        "tgfec": { type: "text", editable: true },
        "tgtipa": { type: "integer", editable: true },
        "tgtipo": { type: "text", editable: true },
        "tgdoc": { type: "text", editable: true },
        "tgdet": { type: "text", editable: true },
        "idemp": { type: "integer", editable: true,fk: "idemp"  },
        "usumod": { type: "text", editable: true,fk: "idemp"  },
        "fecmod": { type: "text", editable: true,fk: "idemp"  },
        "idz": { type: "integer", editable: true,fk: "idemp"  },
        "tgest": { type: "text", editable: true,fk: "idemp"  },
        "tgtc": { type: "double", editable: true,fk: "idemp"  },
        "tgefe": { type: "double", editable: true,fk: "idemp"  },
        "tgdepa": { type: "double", editable: true,fk: "idemp"  },
        "tgdeto": { type: "double", editable: true,fk: "idemp"  },
        "tgacu": { type: "double", editable: true,fk: "idemp"  },
        "tgsal": { type: "double", editable: true,fk: "idemp"  },
        "tgdep": { type: "double", editable: true,fk: "idemp"  },
        "idcta": { type: "integer", editable: true,fk: "idemp"  },
        "tgTot": { type: "double", editable: true,fk: "idemp"  },
        "tgTod": { type: "double", editable: true,fk: "idemp"  },
        "tgdif": { type: "double", editable: true,fk: "idemp"  },
        "tgren": { type: "text", editable: true,fk: "idemp"  },
        "tgb1imp": { type: "double", editable: true,fk: "idemp"  },
        "tgb1idc": { type: "integer", editable: true,fk: "idemp"  },
        "tgb2imp": { type: "double", editable: true,fk: "idemp"  },
        "tgb2idc": { type: "integer", editable: true,fk: "idemp"  },
        "tgdevefec": { type: "double", editable: true,fk: "idemp"  },

    },
    // image: {
    //     api: "root",
    //     name: "tbtg"
    // },
    
    // image: {
    //     api: "root",
    //     name: "productos"
    // },
    Action,
    Reducer,
});
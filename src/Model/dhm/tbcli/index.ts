import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "tbcli"
    },
    Columns: {
        "idcli": { type: "text", pk: true },
        "clicod": { type: "text", editable: true },
        "clinom": { type: "text", editable: true },
        "cliape": { type: "text", editable: true },
        "clinit": { type: "text", editable: true },
        "clidir": { type: "text", editable: true },
        "cliloc": { type: "text", editable: true },
        "clizona": { type: "text", editable: true },
        "clidep": { type: "text", editable: true },
        "clitel": { type: "text", editable: true },
        "clifax": { type: "text", editable: true },
        "clicom": { type: "text", editable: true },
        "cliemail": { type: "text", editable: true },
        "clitipgar": { type: "text", editable: true },
        "clitlimcre": { type: "text", editable: true },
        "clilimau": { type: "text", editable: true },
        "cliforpag": { type: "text", editable: true },
        "idclit": { type: "text", editable: true },
        "clitipdoc": { type: "text", editable: true },
        "idclir": { type: "text", editable: true },
        "clisic": { type: "text", editable: true },
        "cliplazo": { type: "text", editable: true },
        "idconf": { type: "text", editable: true },
        "cliest": { type: "text", editable: true },
        "idz": { type: "text", editable: true },
        "clicuo": { type: "text", editable: true },
        "cliuv": { type: "text", editable: true },
        "climz": { type: "text", editable: true },
        "clifing": { type: "text", editable: true },
        "idds": { type: "text", editable: true },
        "climon": { type: "text", editable: true },
        "idcat": { type: "text", editable: true },
        "cliadic": { type: "text", editable: true },
        "iddepcli": { type: "text", editable: true },
        "clidesfin": { type: "text", editable: true },
        "clidirnro": { type: "text", editable: true },
        "cliidemp": { type: "text", editable: true },
        "cliinter": { type: "text", editable: true },
        "idciu": { type: "text", editable: true },
        "idloc": { type: "text", editable: true },
        "clirazon": { type: "text", editable: true },
        "idcanal": { type: "text", editable: true },
        "dmsest": { type: "text", editable: true },
        "usumod": { type: "text", editable: true },
        "fecmod": { type: "text", editable: true },
        "clicel": { type: "text", editable: true },
        "cliote": { type: "text", editable: true },
        "cliico": { type: "text", editable: true },
        "clilat": { type: "text", editable: true },
        "clilon": { type: "text", editable: true },
        "cliidcta": { type: "text", editable: true },
        "idrg": { type: "text", editable: true },
        "cliidtipo": { type: "text", editable: true },
        "clireprs": { type: "text", editable: true },
        "clireprsci": { type: "text", editable: true },
        "clicicompl": { type: "text", editable: true },
        "clidocid": { type: "text", editable: true },
        "climpid": { type: "text", editable: true },
        "climpdoc": { type: "text", editable: true },
        "sucreg": { type: "text", editable: true },
    },
    image: {
        api: "root",
        name: "tbcli"
    },
    Action,
    Reducer,
});































































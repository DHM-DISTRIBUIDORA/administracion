import { SPage } from "servisofts-component";
import Model from "../../../Model/";
import root from "./root";
import tbcli from "./tblci";
import tbclimapa from "./tbclimapa";
import zona_empleado from "./zona_empleado";
export default SPage.combinePages("profile", {
    "": root,
    tbcli,
    tbclimapa,
    zona_empleado

})

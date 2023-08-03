import { SPage } from "servisofts-component";
import Model from "../../../Model/";
import root from "./root";
import tbcli from "./tblci";
import tbclimapa from "./tbclimapa";
export default SPage.combinePages("profile", {
    "": root,
    tbcli,
    tbclimapa

})

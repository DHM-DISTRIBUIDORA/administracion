import { SPage } from "servisofts-component";
import Model from "../../../Model/";
import root from "./root";
import tbzon from "./tbzon";
import tbcli from "./tbcli";
import tbclimapa from "./tbclimapa";
import tbven from "./tbven";
import tbtg from "./tbtg";
export default SPage.combinePages("profile", {
    "": root,
    tbzon,
    tbcli,
    tbclimapa,
    tbven,
    tbtg

})

import { SPage } from "servisofts-component";
import Model from "../../../Model/";
import root from "./root";
import tbzon from "./tbzon";
import tbcli from "./tbcli";

export default SPage.combinePages("profile", {
    "": root,
    tbzon,
    tbcli

})

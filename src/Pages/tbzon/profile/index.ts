import { SPage } from "servisofts-component";
import Model from "../../../Model/";
import root from "./root";
import dm_clientes from "./dm_clientes";

export default SPage.combinePages("profile", {
    "": root,
    dm_clientes

})

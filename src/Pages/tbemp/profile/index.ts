import { SPage } from "servisofts-component";
import Model from "../../../Model/";
import root from "./root";
import tbzon from "./tbzon";
import tbcli from "./tbcli";
import tbclimapa from "./tbclimapa";
import tbven from "./tbven";
import tbtg from "./tbtg";
import pedidos from "./pedidos";
import pedidosEmpresa from "./pedidosEmpresa";
import usuario from "./usuario";
import zonas_asignadas from "./zonas_asignadas";
import almacenes from "./almacenes";
export default SPage.combinePages("profile", {
    "": root,
    tbzon,
    zonas_asignadas,
    tbcli,
    tbclimapa,
    tbven,
    tbtg,
    pedidos,
    pedidosEmpresa,
    usuario,
    almacenes

})

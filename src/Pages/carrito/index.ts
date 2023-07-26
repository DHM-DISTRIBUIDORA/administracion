import { SPage, SPageListProps } from 'servisofts-component';

import root from "./root"
import pedido from "./pedido"
import notaventa from "./notaventa"
export default SPage.combinePages("carrito", {
    "": root,
     pedido,
     notaventa

});
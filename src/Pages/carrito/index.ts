import { SPage, SPageListProps } from 'servisofts-component';

import root from "./root"
import pedido from "./pedido"
export default SPage.combinePages("carrito", {
    "": root,
     pedido,

});
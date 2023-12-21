import { SPage } from 'servisofts-component';
import root from './root';
import pedidos from "./pedidos"

export default SPage.combinePages("pedidos_rebotados", {
    "": root,
    pedidos

});
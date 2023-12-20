import { SPage } from 'servisofts-component';
import root from './root';
import clientes from "./clientes"


export default SPage.combinePages("pedidos_por_proveedor", {
    "": root,
    clientes,
});
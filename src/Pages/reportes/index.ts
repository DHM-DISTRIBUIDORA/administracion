import { SPage } from 'servisofts-component';
import root from './root';
import productos_mas_vendidos from "./productos_mas_vendidos"
import usuarios from "./usuarios"
import clientes_con_pedidos from "./clientes_con_pedidos"
import clientes_sin_pedidos from "./clientes_sin_pedidos"

export default SPage.combinePages("reportes", {
    "": root,
    productos_mas_vendidos,
    usuarios,
    clientes_con_pedidos,
    clientes_sin_pedidos
});
import { SPage } from 'servisofts-component';
import root from './root';
import productos_mas_vendidos from "./productos_mas_vendidos"
import usuarios from "./usuarios"
import clientes_con_pedidos from "./clientes_con_pedidos"
import clientes_con_pedidos_mapa from "./clientes_con_pedidos_mapa"
import clientes_sin_pedidos from "./clientes_sin_pedidos"
import clientes_sin_pedidos_mapa from "./clientes_sin_pedidos_mapa"
import visita_vendedor from "./visita_vendedor"
import clientes_con_sin_pedidos_mapa from "./clientes_con_sin_pedidos_mapa"


export default SPage.combinePages("reportes", {
    "": root,
    productos_mas_vendidos,
    usuarios,
    clientes_con_pedidos,
    clientes_con_pedidos_mapa,
    clientes_sin_pedidos,
    clientes_sin_pedidos_mapa,
    visita_vendedor,
    clientes_con_sin_pedidos_mapa
});
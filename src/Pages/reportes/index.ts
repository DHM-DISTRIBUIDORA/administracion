import { SPage } from 'servisofts-component';
import root from './root';
import productos_mas_vendidos from "./productos_mas_vendidos"
import usuarios from "./usuarios"
import clientes_con_pedidos from "./clientes_con_pedidos"
import clientes_con_pedidos_mapa from "./clientes_con_pedidos_mapa"
import clientes_sin_pedidos from "./clientes_sin_pedidos"
import clientes_sin_pedidos_mapa from "./clientes_sin_pedidos_mapa"
import visita_vendedor from "./visita_vendedor"
import visita_transportista from "./visita_transportista"
import clientes_con_sin_pedidos_mapa from "./clientes_con_sin_pedidos_mapa"
import activaciones from "./activaciones"
import profile from './profile/index';
import Model from '../../Model';


export const Parent = {
    name: "tbemp",
    path: `/tbemp`,
    model: Model.tbemp,
    title:"empleado"
}

export default SPage.combinePages("reportes", {
    "": root,
    activaciones,
    productos_mas_vendidos,
    usuarios,
    clientes_con_pedidos,
    clientes_con_pedidos_mapa,
    clientes_sin_pedidos,
    clientes_sin_pedidos_mapa,
    visita_vendedor,
    visita_transportista,
    clientes_con_sin_pedidos_mapa,
    ...profile
});
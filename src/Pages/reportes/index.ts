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
import pedidos_por_vendedor from "./pedidos_por_vendedor"
import pedidos_por_vendedor_detalle from "./pedidos_por_vendedor_detalle"
import pedidos_por_proveedor from "./pedidos_por_proveedor"
import entregas_del_transportista from "./entregas_del_transportista"
import pedidos_mapa from "./pedidos_mapa"
import activaciones from "./activaciones"
import pedidos_rebotados from "./pedidos_rebotados"
import profile from './profile/index';
import log from "./log"
import mapa_calor_por_linea from './mapa_calor_por_linea';
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
    mapa_calor_por_linea,
    productos_mas_vendidos,
    usuarios,
    clientes_con_pedidos,
    clientes_con_pedidos_mapa,
    clientes_sin_pedidos,
    clientes_sin_pedidos_mapa,
    visita_vendedor,
    visita_transportista,
    clientes_con_sin_pedidos_mapa,
    pedidos_por_vendedor,
    pedidos_por_vendedor_detalle,
    entregas_del_transportista,
    pedidos_mapa,
    ...pedidos_rebotados,
    log,
    ...pedidos_por_proveedor,
    ...profile
});
import { SPage } from 'servisofts-component';
import Model from '../../Model';

import root from './root';
import picklist from './picklist';
import picklist2 from './picklist2';
import list from './list';
import desgrup from './desgrup';
import pedidoDetalle from './pedidoDetalle';
import listVendedor from './listVendedor';
import listVendedorPedidos from './listVendedorPedidos';
export default SPage.combinePages("transporte", {
    "": root,
    list,
    picklist,
    picklist2,
    pedidoDetalle,
    desgrup,
    listVendedor,
    listVendedorPedidos
})
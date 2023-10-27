import { SPage } from 'servisofts-component';
import Model from '../../Model';

import root from './root';
import picklist from './picklist';
import list from './list';
import pedidoDetalle from './pedidoDetalle';
export default SPage.combinePages("transporte", {
    "": root,
    list,
    picklist,
    pedidoDetalle,
})
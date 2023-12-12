import { SPage, SPageListProps } from 'servisofts-component';

import root from "./root"
import detalle from "./detalle"
import transportista from './transportista';
export default SPage.combinePages("gpx", {
    "": root,
    detalle,
    transportista

});
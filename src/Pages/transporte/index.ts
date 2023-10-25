import { SPage } from 'servisofts-component';
import Model from '../../Model';

import root from './root';
import picklist from './picklist';
export default SPage.combinePages("transporte", {
    "": root,
    picklist,
})
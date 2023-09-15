import { SPage } from 'servisofts-component';
import Model from '../../Model';

import root from './root';
import cliente from './cliente';
import list from './list';
import sinc from './sinc';

export default SPage.combinePages("vendedor", {
    "": root,
    // "": sinc,
    root,
    sinc,
    cliente,
    list
})
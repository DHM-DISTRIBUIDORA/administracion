import { SPage } from 'servisofts-component';
import Model from '../../Model';

import root from './root';
import cliente from './cliente';
import list from './list';
import sinc from './sinc';
import location from '../info/location';

export default SPage.combinePages("vendedor", {
    // "": root,
    "": location,
    root,
    sinc,
    cliente,
    list
})
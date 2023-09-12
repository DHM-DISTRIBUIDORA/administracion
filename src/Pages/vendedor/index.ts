import { SPage } from 'servisofts-component';
import Model from '../../Model';

import root from './root';
import cliente from './cliente';
import list from './list';

export default SPage.combinePages("vendedor", {
    "": root,
    cliente,
    list
})
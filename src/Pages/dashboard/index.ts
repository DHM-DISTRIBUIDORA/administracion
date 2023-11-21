import { SPage } from 'servisofts-component';
import root from './root';

import vendedor from './vendedor';


export default SPage.combinePages("dashboard", {
    "": root,
    vendedor
 
});
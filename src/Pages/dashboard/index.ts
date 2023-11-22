import { SPage } from 'servisofts-component';
import root from './root';
import vendedor from './vendedor';
import transportista from './transportista';

export default SPage.combinePages("dashboard", {
    "": root,
    vendedor,
    transportista
});
import { SPage } from 'servisofts-component';

import root from './root';
export const Parent = {
    name: "producto",
    path: "/producto"
}
export default SPage.combinePages(Parent.name, {
    "": root,

});
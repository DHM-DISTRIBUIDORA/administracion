import { SPage } from 'servisofts-component';

import root from './root';
import recibo from './recibo';
import edit from "./edit"

export const Parent = {
    name: "dm_cabfac",
    path: "/dm_cabfac"
}
export default SPage.combinePages(Parent.name, {
    "": root,
    recibo,
    edit
});
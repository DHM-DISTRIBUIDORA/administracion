import { SPage } from 'servisofts-component';

import root from './root';
import send from "./send"
export const Parent = {
    name: "pedidos",
    path: "/pedidos"
}
export default SPage.combinePages(Parent.name, {
    "": root,
    send

});
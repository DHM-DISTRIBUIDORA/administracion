import { SPage } from 'servisofts-component';

import root from './root';
import send from "./send"
export const Parent = {
    name: "notification",
    path: "/notification"
}
export default SPage.combinePages(Parent.name, {
    "": root,
    send

});
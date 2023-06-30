import { SPage } from 'servisofts-component';

import root from './root';
import editar from './editar';
import changepass from './changepass';
export const Parent = {
    name: "perfil",
    path: "/perfil"
}
export default SPage.combinePages(Parent.name, {
    "": root,
    "editar":editar,
    changepass

});
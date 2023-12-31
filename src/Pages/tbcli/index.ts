import { SPage } from 'servisofts-component';
import Model from '../../Model';

import list from './list';
import table from './table';
// import profile from './profile';
import _delete from './delete';
import edit from './edit';
import _new from "./new"
import find from './find';
import profile from './profile/index';
import mapa from './mapa';
import listCliCat from './listCliCat';


export const Parent = {
    name: "tbcli",
    path: `/tbcli`,
    model: Model.tbcli,
    title : "cliente"
}
export default SPage.combinePages(Parent.name, {
    "": list,
    list,
    table,
    // profile,
    "delete": _delete,
    "new":_new,
    edit,
    find,
    "mapa": mapa,
    ...profile,
    listCliCat
})
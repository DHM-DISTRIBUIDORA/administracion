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

export const Parent = {
    name: "tbcli",
    path: `/tbcli`,
    model: Model.tbcli
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
    ...profile
})
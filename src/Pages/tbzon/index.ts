import { SPage } from 'servisofts-component';
import Model from '../../Model';

import list from './list';
import table from './table';
import profile from './profile/index';
import _delete from './delete';
import edit from './edit';
import _new from "./new"
export const Parent = {
    name: "tbzon",
    path: `/tbzon`,
    model: Model.tbzon
}
export default SPage.combinePages(Parent.name, {
    "": list,
    list,
    table,
    ...profile,
    "delete": _delete,
    "new": _new,
    edit
})
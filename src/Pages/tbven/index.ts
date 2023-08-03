import { SPage } from 'servisofts-component';
import Model from '../../Model';

import list from './list';
import table from './table';
import _delete from './delete';
import edit from './edit';
import profile from './profile';
import _new from "./new"
export const Parent = {
    name: "tbven",
    path: `/tbven`,
    model: Model.tbven
}
export default SPage.combinePages(Parent.name, {
    "": list,
    list,
    table,
    "delete": _delete,
    "new": _new,
    profile,
    edit
})
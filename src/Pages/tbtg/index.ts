import { SPage } from 'servisofts-component';
import Model from '../../Model';
import list from './list';
import profile from './profile';


export const Parent = {
    name: "tbtg",
    path: `/tbtg`,
    model: Model.tbtg
}
export default SPage.combinePages(Parent.name, {
    "": list,
    // list,
    // table,
    // "delete": _delete,
    // "new": _new,
    profile,
    // edit
})
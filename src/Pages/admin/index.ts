import { SPage } from 'servisofts-component';
import Model from '../../Model';

import tbemp from './tbemp';
import tbempt from './tbempt';
export const Parent = {
    name: "admin",
    path: `/admin`,
    model: Model.tbemp,
    title:"empleado"
}
export default SPage.combinePages(Parent.name, {
    tbemp,
    tbempt
})
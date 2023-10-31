import { SPage } from 'servisofts-component';
// import root from "./root"
import table from "./table"
import test from './test';
export const Parent = {
    name: "storage",
    path: `/storage`,
    title: "cliente"
}
export default SPage.combinePages(Parent.name, {
    "": test,
    test,
    table
})
import { SPage } from 'servisofts-component';

import root from './root';

export const Parent = {
    name: "clientes",
    path: "/clientes"
}
export default SPage.combinePages(Parent.name, {
    "": root,
});
import { SPage } from 'servisofts-component';

import root from './root';
import historico from './historico';
import delivery from './delivery';
import mapa_conductor from './mapa_conductor';
export const Parent = {
    name: "pedidos",
    path: "/pedidos"
}
export default SPage.combinePages(Parent.name, {
    "": root,
    historico,
    delivery,
    mapa_conductor

});
import { SPage, SPageListProps } from 'servisofts-component';

import root from "./root"
import recuperar from './recuperar';
import recuperar_codigo from './recuperar_codigo';
import recuperar_pass from './recuperar_pass';
import codigo from './codigo';
import confirmar from './confirmar';
export default SPage.combinePages("login", {
    "": codigo,
    user: root,
    codigo,
    recuperar,
    recuperar_codigo,
    recuperar_pass,
    confirmar

});
import { SPage, SPageListProps } from 'servisofts-component';

import root from './root';
import carga from "./carga"
import login from "./login";
import registro from './registro';
import explorar from './explorar';
import favoritos from './favoritos';
import pedidos from './pedidos';
import producto from './producto';
import sql from './sql/index';
import privacidad from './privacidad';
import categoria from './categoria';
import clientes from './clientes';
import perfil from './perfil';

import rol from './rol';
import _public from "./public"
import usuario from './usuario';
import dm_usuarios from './dm_usuarios';
import tbemp from './tbemp';
import tbzon from './tbzon';
import tbemt from './tbemt';
import tbprd from './tbprd';
import tbprdlin from './tbprdlin';
import tbtg from './tbtg';
import ajustes from './ajustes';
import wiki from './wiki';
import distribucion from './distribucion';
import mapa from './mapa';
import carrito from './carrito';
import tbcli from './tbcli';
import tbven from './tbven';
import tbalm from './tbalm';
import reportes from './reportes';

import vendedor from './vendedor';
import dm_cabfac from './dm_cabfac';
import transporte from './transporte';

// import { Example } from "servisofts-charts"
import test3 from './test3';
import test2 from "./test2"
import test from "./test"
import storage from "./storage"
// export default SPage.combinePages("/", {
//   "":storage,
// });

export default SPage.combinePages("/", {
  // "":storage,
  "": carga,
  "root": root,
  wiki,
  ...login,
  ...registro,
  "explorar": explorar,
  "favoritos": favoritos,
  "pedidos": pedidos,
  sql,
  "privacidad": privacidad,
  "privacy": privacidad,
  ...producto,
  "categoria": categoria,
  ...dm_cabfac,
  ...clientes,
  ...usuario,
  ...perfil,
  ...rol,
  ..._public,
  ...dm_usuarios,
  ...tbemp,
  ...tbzon,
  ...tbprd,
  ...tbprdlin,
  ...tbtg,
  ...ajustes,
  ...mapa,
  ...distribucion,
  ...tbemt,
  ...carrito,
  ...tbcli,
  ...tbalm,
  ...tbven,
  ...reportes,
  ...vendedor,
  ...transporte,
  // test2,
  // test3,
  // test,
  // "chart": Example
});

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
import ajustes from './ajustes';
import wiki from './wiki';
import distribucion from './distribucion';
import mapa from './mapa';
import test2 from "./test2"
import test from "./test"
import carrito from './carrito';
import tbcli from './tbcli';
import tbven from './tbven';
export default SPage.combinePages("/", {
  // "":test,
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
  ...producto,
  "categoria": categoria,
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
  ...ajustes,
  ...mapa,
  ...distribucion,
  ...tbemt,
  ...carrito,
  ...tbcli,
  ...tbven,
  test2,
  test
});
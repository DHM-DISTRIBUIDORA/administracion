import { SPage, SPageListProps } from 'servisofts-component';

import root from './root';
import carga from "./carga"
import login from "./login";
import registro from './registro';
import explorar from './explorar';
import favoritos from './favoritos';
import pedidos from './pedidos';
import producto from './producto';
import test from './test';
import test2 from './test2';
import sql from './sql/index';
import privacidad from './privacidad';
import categoria from './categoria';
import clientes from './clientes';
import perfil from './perfil';

import rol from './rol';
import _public from "./public"
import dm_categorias from './dm_categorias';
import dm_productos from './dm_productos';
import usuario from './usuario';
import dm_usuarios from './dm_usuarios';
import dm_clientes from './dm_clientes';
import tbemp from './tbemp';
import tbzon from './tbzon';
import ajustes from './ajustes';
import wiki from './wiki';
import distribucion from './distribucion';
export default SPage.combinePages("/", {
  "": carga,
  "root": root,
  wiki,
  ...login,
  ...registro,
  "explorar": explorar,
  "favoritos": favoritos,
  "pedidos": pedidos,
  test,
  test2,
  sql,
  "privacidad": privacidad,
  ...producto,
  "categoria": categoria,
  ...clientes,
  ...usuario,
  ...perfil,
  ...rol,
  ..._public,
  ...dm_categorias,
  ...dm_productos,
  ...dm_usuarios,
  ...dm_clientes,
  ...tbemp,
  ...tbzon,
  ...ajustes,
  ...distribucion,
});
import { SPage, SPageListProps } from 'servisofts-component';

import root from './root';
import carga from "./carga"
// import mapa from './mapa';
import login from "./login";
import registro from './registro';
import explorar from './explorar';
import favoritos from './favoritos';
import pedidos from './pedidos';
import producto from './producto';
import test from './test';
import sql from './sql/index';
import privacidad from './privacidad';
import categoria from './categoria';
import clientes from './clientes';
// import direccion from './direccion';
import perfil from './perfil';
// import chat from './chat';
// import ayuda from './ayuda';

import rol from './rol';
import _public from "./public"
import dm_categorias from './dm_categorias';
import dm_productos from './dm_productos';
import usuario from './usuario';
export default SPage.combinePages("/", {
  // "": test,
  "": carga,
  "root": root,
  ...login,
  // mapa,
  ...registro,
  "explorar": explorar,
  "favoritos": favoritos,
  "pedidos": pedidos,
  test,
  sql,
  "privacidad": privacidad,
  ...producto,
  "categoria": categoria,

  ...clientes,
  ...usuario,
  // ...direccion,
  ...perfil,
  ...rol,
  ..._public,
  ...dm_categorias,
  ...dm_productos
  // ...chat,
  // ...ayuda,
  // ...ayuda
});
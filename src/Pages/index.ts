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
import ajustes from './ajustes';
export default SPage.combinePages("/", {
  "": carga,
  "root": root,
  ...login,
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
  ...perfil,
  ...rol,
  ..._public,
  ...dm_categorias,
  ...dm_productos,
  ...dm_usuarios,
  ...dm_clientes,
  ...ajustes,
});
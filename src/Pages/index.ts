import { SPage, SPageListProps } from 'servisofts-component';

import root from './root';
import carga from "./carga"
import login from "./login";
import registro from './registro';
import favoritos from './favoritos';
import pedidos_clientes from './pedidos_clientes';
import producto from './producto';
import sql from './sql/index';
import privacidad from './privacidad';
import politica_de_privacidad from './politica_de_privacidad';
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
import info from './info';
import buscar_cliente_codigo from './buscar_cliente_codigo';
import version_required from './version_required';
import notification_manager from './notification_manager';
import notification from './notification';
import gpx from './gpx';
import storage from "./storage"
import videos from './videos';
import blanco from './blanco';
import contacto from './contacto';
import dashboard from './dashboard';
import permissions from './permissions';

import admin from './admin';
// import { Example } from 'servisofts-charts'


// import test from "./test"
// export default SPage.combinePages("/", {

//   "":test,
//   ...gpx,
//   ...permissions
// });

export default SPage.combinePages("/", {
  // "":Example,
  "": carga,
  "root": root,
  wiki,
  ...login,
  ...registro,
  "favoritos": favoritos,
  ...pedidos_clientes,
  sql,
  "privacidad": privacidad,
  "privacy": privacidad,
  "politica_de_privacidad": politica_de_privacidad,
  ...producto,
  ...gpx,
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
  ...info,
  ...notification,
  ...videos,
  version_required,
  buscar_cliente_codigo,
  ...storage,
  // test2,
  notification_manager,
  // test,
  ...blanco,
  ...contacto,
  ...dashboard,
  ...permissions,
  ...admin
});

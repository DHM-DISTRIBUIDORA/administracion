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
import privacidad from './privacidad';

// import direccion from './direccion';
// import perfil from './perfil';
// import chat from './chat';
// import ayuda from './ayuda';
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
  "privacidad": privacidad,
  ...producto
  // ...direccion,
  // ...perfil,
  // ...chat,
  // ...ayuda,
  // ...ayuda
});
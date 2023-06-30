import { SPage, SPageListProps } from 'servisofts-component';

import root from './root';
// import carga from "./carga"
// import mapa from './mapa';
// import login from "./login";
// import registro from './registro';
// import direccion from './direccion';
// import perfil from './perfil';
// import chat from './chat';
// import ayuda from './ayuda';
export default SPage.combinePages("/", {
  // "": test,
  // "": carga,
  "": root,
  // "carga": carga,
  // ...login,
  // mapa,
  // ...registro,
  // ...direccion,
  // ...perfil,
  // ...chat,
  // ...ayuda,
  // ...ayuda
});
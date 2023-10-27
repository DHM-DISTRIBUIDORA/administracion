import { SPage, SPageListProps } from 'servisofts-component';
import root from './root';
import producto from './producto';
import explorar from './explorar';
import categoria from './categoria';
import buscar from "./buscar"
export default SPage.combinePages("public", {
  "": root,
  producto,
  explorar,
  categoria,
  buscar
});
import { SPage, SPageListProps } from 'servisofts-component';
import root from './root';
import producto from './producto';
import explorar from './explorar';
import categoria from './categoria';
export default SPage.combinePages("public", {
  "": root,
  producto,
  explorar,
  categoria
});
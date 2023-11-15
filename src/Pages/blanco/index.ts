import { SPage } from 'servisofts-component';

import root from './root';
import BuggyCounter from './BuggyCounter';
import ErrorBoundary from './ErrorBoundary';
import blanco2 from './blanco2';

export const Parent = {
    name: "blanco",
    path: "/blanco"
}
export default SPage.combinePages(Parent.name, {
    "": root,
    "BuggyCounter": BuggyCounter,
    "ErrorBoundary": ErrorBoundary,
    "blanco2": blanco2,
});
import { SPage } from 'servisofts-component';

import root from './root';
import BuggyCounter from './BuggyCounter';
import ErrorBoundary from './ErrorBoundary';

export const Parent = {
    name: "blanco",
    path: "/blanco"
}
export default SPage.combinePages(Parent.name, {
    "": root,
    "BuggyCounter": BuggyCounter,
    "ErrorBoundary": ErrorBoundary,
});
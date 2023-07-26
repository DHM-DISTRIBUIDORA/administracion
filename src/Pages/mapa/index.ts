import { SPage } from "servisofts-component";

import root from "./root";
import test from "./test"
export default SPage.combinePages("mapa",
    {
        "": root,
        test
    }
)
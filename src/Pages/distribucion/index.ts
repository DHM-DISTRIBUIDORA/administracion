import { SPage } from "servisofts-component";

import root from "./root";
import asignacion_visita from "./asignacion_visita";
import registro_visita from "./registro_visita";
export default SPage.combinePages("distribucion",
    {
        "": root,
        registro_visita,
        asignacion_visita

    }
)
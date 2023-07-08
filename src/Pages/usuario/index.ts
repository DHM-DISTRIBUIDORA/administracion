import { SPage } from "servisofts-component";
import Model from "../../Model";
import list from "./list";
import table from "./table";
import _new from "./new";
import profile from "./profile";
import edit from "./edit";
import _delete from "./delete";
import restore from "./restore";
import eliminados from "./eliminados";

const model = Model.usuario;

export const Parent = {
    name: "usuario",
    path: `/usuario`,
    model
}
export default SPage.combinePages(Parent.name, {
    "": list,
    "list": list,
    "eliminados": eliminados,
    "table": table,
    "new": _new,
    "profile": profile,
    "edit": edit,
    "delete": _delete,
    "restore": restore
})

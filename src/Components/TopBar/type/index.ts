import _default from "./_default";
import ubicacion from "./ubicacion";
import menu from "./menu";

export type TopBarTypes = "default" | "ubicacion" | "menu"
export default {
    "default": _default,
    ubicacion,
    menu
}
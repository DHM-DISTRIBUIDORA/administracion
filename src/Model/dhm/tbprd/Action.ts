import { SAction } from "servisofts-model";
export default class Action extends SAction {

    getAllSimple(extra?: {}) {
        return super.getAll({ type: "getAllSimple" })
    }
}
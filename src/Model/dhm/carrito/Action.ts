import { SAction } from "servisofts-model";
export default class Action extends SAction {

    setState(data) {
        this._dispatch({
            type: "setState",
            data: data
        });
    }

    getState() {
        return this._getState().data
    }

}
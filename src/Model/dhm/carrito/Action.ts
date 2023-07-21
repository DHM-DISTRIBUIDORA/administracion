import { SAction } from "servisofts-model";
export default class Action extends SAction {

    setState(data) {
        this._dispatch({
            ...this.model.info,
            type: "setState",
            ...data,
        });
    }

    getState() {
        return this._getReducer()
    }

}
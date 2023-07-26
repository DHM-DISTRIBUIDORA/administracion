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

    removeItem(key_item) {
        let dato = this.getState();
        delete dato.productos[key_item];
        this.setState(dato)
    }

    removeAll(){
        let dato = this.getState();
        dato.productos = {}
        this.setState(dato)
        console.log(this.getState())
    }

}
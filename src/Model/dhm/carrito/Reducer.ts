import { SReducer } from "servisofts-model";
import Parent from './index';
import { SStorage } from "servisofts-component";

export default class Reducer extends SReducer {

  initialState(extra?: {}) {

    let initState = {
      productos: [],
    };
    SStorage.getItem("carrito", (imt) => {
      if (!imt) return;
      let productos = JSON.parse(imt);
      if (!productos) return;
      initState.productos = productos;
    });
    return initState;
  }
  setState(state: any, action: any): void {
    state = { ...state, ...action };
    SStorage.setItem("carrito", JSON.stringify(state.productos));
  }

}
import { SReducer } from "servisofts-model";
import Parent from './index';

const initialState = {
  data: {}
};
export default class Reducer extends SReducer {


  setState(state: any, action: any): void {
    state = action;
  }

}
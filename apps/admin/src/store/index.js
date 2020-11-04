import { createStore, combineReducers } from 'redux';
import * as tabs from '../layout/store/tabs';

let store = createStore(
  combineReducers({...tabs}) // reducer 合并
);

export default store;

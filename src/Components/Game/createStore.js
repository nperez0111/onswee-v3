import { createStore, combineReducers } from 'redux';
import Reducer from './Reducer.js';
import NameReducer from './NameReducer.js';
import SelectReducer from '../Select/Reducer.js';
import defaultState from './defaultState.js';


export default () => createStore(combineReducers({ select: SelectReducer, names: NameReducer, game: Reducer }), defaultState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

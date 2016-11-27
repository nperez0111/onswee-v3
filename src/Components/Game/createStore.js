import { createStore, combineReducers } from 'redux';
import Reducer from './Reducer.js';
import NameReducer from './NameReducer.js';
import SelectReducer from '../Select/Reducer.js';
import defaultState from './defaultState.js';
import AIReducer from '../AI/Reducer.js';


export default () => {
    const routes = { select: SelectReducer, names: NameReducer, game: Reducer, ai: AIReducer }
    const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    return createStore(combineReducers(routes), defaultState, devTools)
}

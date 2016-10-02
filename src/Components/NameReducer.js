import { makeObj } from '../Utils/Utils.js';
export default function NameReducer(state, action) {

    switch (action.type) {
        case 'update':

            return state.setState(Object.assign({}, state.getState(), makeObj(action.id, action.name)))
        default:
            return state
    }
}

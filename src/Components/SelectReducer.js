import { makeObj } from '../Utils/Utils.js';
export default function SelectReducer(state, action) {
    switch (action.type) {
        case 'select':
            if (state.selected !== action.selected) {
                return Object.assign({}, state, makeObj('selected', action.selected))
            } else {
                return SelectReducer(state, { type: 'deselect' })
            }
        case 'deselect':
            return Object.assign({}, state, makeObj('selected', null))
        default:
            return state
    }
}

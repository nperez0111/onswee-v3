import { makeObj } from '../../Utils/Utils.js';
export default function NameReducer(state = {
    ai: false
}, action) {

    switch (action.type) {
        case 'update':
            const obj = makeObj('ai', action.value)
            return {...state, ...obj }

        default:
            return state
    }
}

import { makeObj } from '../../Utils/Utils.js';
export default function NameReducer(state, action) {

    switch (action.type) {
        case 'update':
            const obj = makeObj(action.id, action.name)
            return {...state, ...obj }

        default:
            return state
    }
}

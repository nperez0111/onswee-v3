import { makeObj } from '../../Utils/Utils.js';
export default function NameReducer(state = {
    player1: 'Player 1',
    player2: 'Player 2'
}, action) {

    switch (action.type) {
        case 'update':
            const obj = makeObj(action.id, action.name)
            return {...state, ...obj }

        default:
            return state
    }
}

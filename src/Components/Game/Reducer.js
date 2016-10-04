import Logic from './Logic.js';
import isInCorrectFormat, { is } from 'is-in-correct-format';

const playerFroTo = (a) => isInCorrectFormat(a, { player: is.number, from: is.number, to: is.number })
const setState = (state) => {
    return (obj) => state.setState(obj)
}
const incrementTurn = (state) => {
    return { turn: state.getState().turn + 1 }
}
export default function Reducer(state, action) {
    const { turn, board } = state.getState()
    const addTurn = incrementTurn(state)
    const { player, to } = action

    switch (action.type) {
        case 'move':
            {

                if (playerFroTo(action) && Logic.canMoveFromTo(player, board, action.from, to)) {

                    const postState = Logic.moveFromTo(player, board, action.from, to)

                    if (Logic.isWinIn(player, postState)) {

                        return setState(state)(Logic.getWinState(player)).clearHistory()

                    }

                    return setState(state)({...addTurn, board: postState })

                }
                break;
            }
        case 'put':
            {
                return setState(state)({...addTurn, board: Logic.add(Logic.getPlayer(turn), board, action.to) })
            }
        case 'restricted_move':
            {
                if (Logic.canMoveFromTo(player, board, action.from, to)) {
                    const postState = Logic.moveFromToWithRules(player, board, action.from, to)

                    if (postState === false) {

                        return setState(state)(Logic.getWinState(Logic.getOtherPlayer(player))).clearHistory()

                    }

                    return setState(state)({...addTurn, board: postState })
                }
                break;
            }
        default:
            return state
    }
    return state
}

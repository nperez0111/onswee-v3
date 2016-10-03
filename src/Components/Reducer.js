import GameLogic from './GameLogic.js';
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
    switch (action.type) {
        case 'move':
            let { player, to } = action
            if (playerFroTo(action) && GameLogic.canMoveFromTo(player, board, action.from, to)) {

                return setState(state)({...addTurn, board: GameLogic.moveFromTo(player, board, action.from, to) })
            }
            return state
        case 'put':
            return setState(state)({...addTurn, board: GameLogic.add(GameLogic.getPlayer(turn), board, action.to) })
        default:
            return state
    }
}

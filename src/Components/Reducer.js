import GameLogic from './GameLogic.js';
import isInCorrectFormat, { is } from 'is-in-correct-format';

const playerFroTo = (a) => isInCorrectFormat(a, { player: is.number, from: is.number, to: is.number })

export default function Reducer(state, action) {

    switch (action.type) {
        case 'move':
            const { turn, board } = state.getState()
            const { player, to } = action
            if (playerFroTo(action) && GameLogic.canMoveFromTo(player, board, action.from, to)) {

                return state.setState({ turn: turn + 1, board: GameLogic.moveFromTo(player, board, action.from, to) })
            }
            return state
        default:
            return state
    }
}

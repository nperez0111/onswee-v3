import GameLogic from './GameLogic.js';
import isInCorrectFormat, { is } from 'is-in-correct-format';

const playerFroTo = (a) => isInCorrectFormat(a, { player: is.number, from: is.number, to: is.number })

export default function Reducer(state, action) {

    switch (action.type) {
        case 'move':
            if (playerFroTo(action) && GameLogic.canMoveFromTo(action.player, state.board, action.from, action.to)) {
                let { turn, board } = state
                return { turn: turn + 1, board: GameLogic.moveFromTo(action.player, board, action.from, action.to) }
            }
            return state
        default:
            return state
    }
}

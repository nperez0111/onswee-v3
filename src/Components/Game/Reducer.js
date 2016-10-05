import Logic from './Logic.js';
import isInCorrectFormat, { is } from 'is-in-correct-format';
import UnDoable from '../../Utils/UnDoable.js';

const playerFroTo = (a) => isInCorrectFormat(a, { player: is.number, from: is.number, to: is.number })

const incrementTurn = (state) => {
    return { turn: state.getState().turn + 1 }
}

export default function Reducer(state = UnDoable.new(Logic.getInitialState()), action) {
    const { turn, board } = state.getState()
    const addTurn = incrementTurn(state)
    const { to } = action
    const player = Logic.getPlayer(turn)
    const addState = (newState) => UnDoable.new(newState, state.getHistory().concat(state.getState()), [])

    switch (action.type) {
        case 'undo':
        case 'redo':
            return state[action.type]()
        case 'move':
            {

                if (playerFroTo(action) && Logic.canMoveFromTo(player, board, action.from, to)) {

                    const postState = Logic.moveFromTo(player, board, action.from, to)

                    if (Logic.isWinIn(player, postState)) {

                        return addState(Logic.getWinState(player)).clearHistory()

                    }

                    return addState({...addTurn, board: postState })

                }
                break;
            }
        case 'addToBoard':
            {
                return addState({...addTurn, board: Logic.add(player, board, action.to) })
            }
        case 'restricted_move':
            {
                if (Logic.canMoveFromTo(player, board, action.from, to)) {
                    const postState = Logic.moveFromToWithRules(player, board, action.from, to)

                    if (postState === false) {

                        return addState(Logic.getWinState(Logic.getOtherPlayer(player))).clearHistory()

                    }

                    return addState({...addTurn, board: postState });
                }
                break;
            }
        default:
            return state
    }
    return state
}

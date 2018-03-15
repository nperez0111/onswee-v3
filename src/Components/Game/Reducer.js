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
    const ai = { ai: state.getState().ai || false }
    const { to } = action
    const updateBoard = board => {
        return {...addTurn, ...ai, board }
    }
    const player = Logic.getPlayer(turn)

    switch (action.type) {
        case 'undo':
        case 'redo':
            return state[action.type]()
        case 'ai_move':
        case 'move':
            {

                if (playerFroTo(action) && Logic.canMoveFromTo(player, board, action.from, to)) {

                    const postState = Logic.moveFromTo(player, board, action.from, to)

                    if (Logic.isWinIn(player, postState)) {

                        return state.setState({...ai, ...Logic.getWinState(player) }).clearHistory()

                    }

                    return state.setState(updateBoard(postState))

                }
                break;
            }
        case 'toggle_ai':
            {
                ai.ai = !ai.ai
                return state.setState({...state.getState(), ...ai })
            }
        case 'reset_board':
            {
                //reset board and forget all moves of the game just played
                return UnDoable.new(Logic.getInitialState())
            }
        case 'add_to_board':
            {
                return state.setState({...addTurn, ...ai, board: Logic.add(player, board, action.to) })
            }
        case 'ai_restricted_move':
        case 'restricted_move':
            {
                if (Logic.canMoveFromTo(player, board, action.from, to)) {
                    const postState = Logic.moveFromToWithRules(player, board, action.from, to)

                    if (postState === false) {

                        return state.setState(Logic.getWinState(Logic.getOtherPlayer(player))).clearHistory()

                    }

                    return state.setState(updateBoard(postState))
                }
                break;
            }
        default:
            return state
    }
    return state
}

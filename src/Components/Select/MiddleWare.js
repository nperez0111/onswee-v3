import GameLogic from '../Game/Logic.js';
import { makeObj } from '../../Utils/Utils.js';
import UnDoable from '../../Utils/UnDoable.js';

export default function(data) {

    if ('update' in data) {

        const board = this.state.game.getState().getState().board
        const { fro, to } = data.update
        const action = GameLogic.makeState(board[fro], fro, to)

        this.dispatchGame(action)
        console.log(UnDoable.toState)
        this.state.game.saveCurState('game', UnDoable.toState)

    } else if ('put' in data) {

        const action = makeObj(['type', 'to'], ['put', data.put])
        const board = this.state.game.getState().getState().board

        //make sure the position is not already filled otherwise ignore the event
        if (GameLogic.isEmptyPos(data.put, board)) {
            this.dispatchGame(action)
        }

    }

}

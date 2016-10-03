import GameLogic from '../Game/Logic.js';
import { makeObj } from '../../Utils/Utils.js';
export default function(data) {

    if ('update' in data) {

        const board = this.state.game.getState().getState().board
        const { fro, to } = data.update
        const action = GameLogic.makeState(board[fro], fro, to)

        this.dispatchGame(action)

    } else if ('put' in data) {
        console.log('put')
        const action = makeObj(['type', 'to'], ['put', data.put])
        this.dispatchGame(action)

    }

}

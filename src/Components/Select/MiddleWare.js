import GameLogic from '../Game/Logic.js';
import { makeObj } from '../../Utils/Utils.js';

export default function(data) {

    if ('emit' in data) {
        const board = this.state.game.getState().getState().board
        var action;
        switch (data.emit) {
            case 'move':
            case 'restricted_move':

                const { fro, to } = data.update
                const player = board[fro]
                action = GameLogic.makeState(player, fro, to, data.emit)
                this.dispatchGame(action)
                break;
            case 'put':
                action = makeObj(['type', 'to'], ['put', data.put])

                //make sure the position is not already filled otherwise ignore the event
                if (GameLogic.isEmptyPos(data.put, board)) {
                    this.dispatchGame(action)
                }
                break;
            default:
                GameLogic.trace(`Woa ${data.emit} doesn't exist as an action to be caught by this middle ware!`)
                break;
        }
    }
}

import GameLogic from '../Game/Logic.js';
import { makeObj } from '../../Utils/Utils.js';
import UnDoable from '../../Utils/UnDoable.js';

export default function(data) {

    if ('type' in data) {
        const board = this.state.game.getState().getState().board
        var action;
        switch (data.type) {
            case 'move':
            case 'restricted_move':

                var { fro, to } = data.update
                const player = board[fro]
                action = GameLogic.makeState(player, fro, to)

                this.dispatchGame(action)
                this.state.game.saveCurState('game', UnDoable.toState)
                break;
            case 'put':
                action = makeObj(['type', 'to'], ['put', data.put])

                //make sure the position is not already filled otherwise ignore the event
                if (GameLogic.isEmptyPos(data.put, board)) {
                    this.dispatchGame(action)
                }
                break;
            default:
                GameLogic.trace(`Woa ${data.type} doesn't exist as an action to be caught by this middle ware!`)
                break;
        }
    }
}

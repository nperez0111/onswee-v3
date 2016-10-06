import GameLogic from '../Game/Logic.js';
import { makeObj } from '../../Utils/Utils.js';
import isInCorrectFormat, { is } from 'is-in-correct-format';
const validGameObj = (obj) => isInCorrectFormat(obj, { player: is.number, from: is.number, to: is.number, type: is.string })

export default function(data) {

    if ('emit' in data) {
        const board = this.state.store.getState().game.getState().board
        var action;
        switch (data.emit) {

            case 'move':
            case 'restricted_move':

                const { fro, to } = data.update
                const player = board[fro]
                action = GameLogic.makeState(player, fro, to, data.emit)
                if (!validGameObj(action)) {
                    return
                }
                this.dispatchGame({ type: 'deselect' })
                this.dispatchGame(action)
                break;
            case 'put':
                action = makeObj(['type', 'to'], ['add_to_board', data.addToBoard])

                //make sure the position is not already filled otherwise ignore the event
                if (GameLogic.isEmptyPos(data.addToBoard, board)) {

                    this.dispatchGame(action)
                    this.dispatchGame({ type: 'deselect' })
                }
                break;
            default:
                GameLogic.trace(`Woa ${data.emit} doesn't exist as an action to be caught by this middle ware!`)
                break;
        }
    }
}

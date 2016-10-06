import { notify } from 'react-notify-toast';
import React from 'react';
import PlayerPiece from '../Views/PlayerPiece.js';
export default function WinMiddleWare() {
    const action = this.state.store.getState().game.getState()
    if ('emit' in action) {
        switch (action.emit) {
            case 'win':
                {
                    notify.show(<div className='notification-wrap'><PlayerPiece isActive={true} player={action.who} /> { `Player ${action.who} won!` }</div>)
                    this.dispatchGame({ type: 'reset_board' })
                    break
                }
            default:
                {
                    console.warn("unhandled event")
                }
        }
    }
}

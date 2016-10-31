import { notify } from 'react-notify-toast';
import React from 'react';
import PlayerPiece from '../Views/PlayerPiece.js';
export default function WinMiddleWare(action) {
    if ('emit' in action) {
        switch (action.emit) {
            case 'win':
                {
                    notify.show(<div className='notification-wrap'><PlayerPiece isActive={true} player={action.who} /> { `Player ${action.who} won!` }</div>)
                    this.dispatchGame({ type: 'reset_board' })
                    this.dispatchGame({ type: 'deselect' })
                    break
                }
            default:
                {
                    console.warn("unhandled event")
                }
        }
    }
}

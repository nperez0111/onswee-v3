import React, { Component, PropTypes } from 'react';
import PlayerPiece from './PlayerPiece.js';
import GameUtils from './GameUtils.js';

export default class Square extends Component {
    static propTypes = {
        position: PropTypes.number.isRequired,
        board: PropTypes.arrayOf(PropTypes.number).isRequired,
        turn: PropTypes.number.isRequired
    }
    render() {
        const { turn, position, board } = this.props;
        return (
            <div className={`square r${ Math.floor( position / 3 ) + 1 } c${ ( position % 3 ) + 1 }`}>
					{this.getPiece(board,position,turn)}
			</div>
        );
    }
    getPiece(board, position, turn) {
        if (board[position] !== null) {
            return (
                <PlayerPiece player={ board[ position ] } isActive={GameUtils.isPlayersTurn(board[position], turn) } />
            )
        }
        return ('');
    }
}

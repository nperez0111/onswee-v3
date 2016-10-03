import React, { Component, PropTypes } from 'react';
import PlayerPiece from './PlayerPiece.js';
import GameUtils from './GameUtils.js';
import { makeObj } from '../Utils/Utils.js';
import './Square.css';

export default class Square extends Component {
    static propTypes = {
        position: PropTypes.number.isRequired,
        board: PropTypes.arrayOf(PropTypes.number).isRequired,
        turn: PropTypes.number.isRequired
    }
    render() {
        const { onSelect, position, selected } = this.props;
        console.log(selected)
        return (
            <div className={`square r${ Math.floor( position / 3 ) + 1 } c${ ( position % 3 ) + 1 } ${selected?'selected':''}`} onClick={this.select(position,onSelect)}>
                    {this.getPiece(this.props)}
            </div>
        );
    }
    getPiece(props) {
        const { turn, position, board } = props;
        if (board[position] !== null) {
            return (
                <PlayerPiece player={ board[ position ] } isActive={GameUtils.isPlayersTurn(board[position], turn) } />
            )
        }
        return ('');
    }
    select(position, fn) {
        return () => { fn(makeObj(['type', 'selected'], ['select', position])) }
    }
}

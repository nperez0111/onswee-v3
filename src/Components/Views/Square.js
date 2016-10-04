import React, { Component, PropTypes } from 'react';
import PlayerPiece from './PlayerPiece.js';
import GameUtils from '../Game/Utils.js';
import { makeObj } from '../../Utils/Utils.js';
import './Square.css';

export default class Square extends Component {
    static propTypes = {
        position: PropTypes.number.isRequired,
        board: PropTypes.arrayOf(PropTypes.number).isRequired,
        turn: PropTypes.number.isRequired
    }
    render() {
        const { onSelect, position, selected, turn } = this.props;

        return (
            <div className={`square r${ Math.floor( position / 3 ) + 1 } c${ ( position % 3 ) + 1 } ${selected?'selected':''}`} onClick={this.select(position,onSelect,selected,turn)}>
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
    select(position, fn, selected, turn) {

        return () => {
            let obj = makeObj(['type', 'selected'], ['select', position])

            //if the current square is already selected do a move rather than a select
            if (selected) {
                obj.type = 'move'
                if (GameUtils.isExtraRulesRound(turn)) {
                    obj.type = 'restricted_move'
                }
            }


            if (GameUtils.isPlacingRound(turn)) {
                obj.type = 'put'
            }
            fn(obj)
        }
    }
}

import React, { Component, PropTypes } from 'react';
import Square from '../Views/Square.js';
import './Board.css';
export default class Board extends Component {
    static propTypes = {
        board: PropTypes.arrayOf(PropTypes.number).isRequired,
        turn: PropTypes.number.isRequired
    }
    render() {
        const { board, turn, onSelect, selected } = this.props;

        return (
            <div className='board-container'>{ this.getSquares(board, turn,onSelect,selected) }</div>
        );
    }
    getSquares(board, turn, onSelect, selected) {
        return board.map((player, pos) => {
            return (<Square key={pos} position={pos} board={board} turn={turn} onSelect={onSelect} selected={selected[pos]} />)
        });
    }
}

import React, { PropTypes } from 'react';
import Square from '../Views/Square.js';
import './Board.css';
const Board = ({ board, turn, onSelect, selected }) => {
    const getSquares = (board, turn, onSelect, selected) => {
        return board.map((player, pos) => {
            return (<Square key={pos} position={pos} board={board} turn={turn} onSelect={onSelect} selected={selected[pos]} />)
        });
    }
    return (
        <div className='board-container'>{ getSquares(board, turn,onSelect,selected) }</div>
    );
}

Board.propTypes = {
    board: PropTypes.arrayOf(PropTypes.number).isRequired,
    turn: PropTypes.number.isRequired
}

export default Board;

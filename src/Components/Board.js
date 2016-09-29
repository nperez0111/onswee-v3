import React, { Component, PropTypes } from 'react';
import Square from './Square.js';
export default class Board extends Component {
    static propTypes = {
        board: PropTypes.arrayOf(PropTypes.number).isRequired,
        turn: PropTypes.number.isRequired
    }
    render() {
        const { board, turn } = this.props;

        return (
            <div className='board-container'>{ this.getSquares(board, turn) }</div>
        );
    }
    getSquares(board, turn) {
        return board.map((player, pos) => {
            return (<Square key={pos} position={pos} board={board} turn={turn} />)
        });
    }
}

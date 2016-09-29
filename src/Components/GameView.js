import React, { Component } from 'react';
import { makeObj } from '../Utils/Utils.js';
import Board from './Board.js';
//import GameUtils from './GameUtils.js';
import PlayerHUD from './PlayerHUD.js';
//import TurnHUD from './TurnHUD.js';

export default class GameView extends Component {
    constructor(a) {
        super(a);
        this.state = {
            board: (new Array(9)).fill(null),
            turn: 1,
            player1: 'Player 1',
            player2: 'Player 2'
        }
    }
    render() {
        const { board, turn, player1, player2 } = this.state;
        return (
            <div className='game-container'>
            	{/*<TurnHUD>Player {GameUtils.getPlayer(turn)}'s turn</TurnHUD>*/}
    			<Board board={board} turn={turn} />
    			<PlayerHUD turn={turn} playerNames={[player1,player2]} onEdit={this.handle.bind(this)} />
    		</div>
        )
    }
    handle(id) {
        return function(e) {
            this.setState(makeObj(id, e.target.value));
        }.bind(this)
    }
}

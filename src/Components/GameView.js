import React, { Component } from 'react';
import { makeObj } from '../Utils/Utils.js';
import Board from './Board.js';
import GameUtils from './GameUtils.js';
import PlayerHUD from './PlayerHUD.js';
import TurnHUD from './TurnHUD.js';
import Storage from './Storage.js';
import Reducer from './Reducer.js';
import NameReducer from './NameReducer.js';
import UnDoable from './UnDoable.js';

export default class GameView extends Component {
    constructor(a) {
        super(a);
        this.state = {
            game: Storage.newStorage(Reducer, {
                board: [1, 2, 1, 2, 1, 2, 1, 2, 1], //(new Array(9)).fill(null),
                turn: 1
            }),
            names: Storage.newStorage(NameReducer, UnDoable({
                player1: 'Player 1',
                player2: 'Player 2'
            }))
        }
        this.handle = this.handle.bind(this);
    }
    render() {
        const { board, turn } = this.state.game.getState()
        const { player1, player2 } = this.state.names.getState().getState()
        return (
            <div className='game-container'>
                <TurnHUD turn={turn} player={GameUtils.getPlayer(turn)} playerNames={[player1,player2]} />
                <Board board={board} turn={turn} />
                <PlayerHUD turn={turn} playerNames={[player1,player2]} onEdit={this.handle} />
            </div>
        )
    }
    handle(id) {
        return e => {
            const newName = e.target.value
            const state = this.state.names
            this.setState(makeObj(['name'], [state.dispatch(makeObj(['id', 'name', 'type'], [id, newName, 'update']))]));
        }
    }
}

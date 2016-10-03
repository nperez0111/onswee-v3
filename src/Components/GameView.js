import React, { Component } from 'react';
import { makeObj } from '../Utils/Utils.js';
import Board from './Board.js';
import GameLogic from './GameLogic.js';
import PlayerHUD from './PlayerHUD.js';
import TurnHUD from './TurnHUD.js';
import Storage from './Storage.js';
import Reducer from './Reducer.js';
import NameReducer from './NameReducer.js';
import SelectReducer from './SelectReducer.js';
import UnDoable from './UnDoable.js';

export default class GameView extends Component {
    constructor(a) {
        super(a)
        this.state = {
            game: Storage.newStorage(Reducer, UnDoable({
                board: [1, null, 1, 2, 1, 2, 1, 2, 1], //(new Array(9)).fill(null),
                turn: 1
            })),
            names: Storage.newStorage(NameReducer, UnDoable({
                player1: 'Player 1',
                player2: 'Player 2'
            })),
            select: Storage.newStorage(SelectReducer, {
                selected: null
            })
        }
        this.state.select.on('willChange', Storage.log('Before'))
        this.state.select.on('hasChanged', Storage.log('After'))
        this.state.select.on('hasChanged', data => {
            if ('update' in data) {
                const board = this.state.game.getState().getState().board
                const { fro, to } = data.update
                const action = GameLogic.makeState(board[fro], fro, to)
                this.stateChangeOf('game')(action)
            }
        })
        this.state.names.on('hasChanged', Storage.log('After', a => a.getState()))
        this.handleNameChange = this.handleNameChange.bind(this)
        this.stateChangeOf = this.stateChangeOf.bind(this)
    }
    render() {
        const { board, turn } = this.state.game.getState().getState()
        const { player1, player2 } = this.state.names.getState().getState()
        const { selected } = this.state.select.getState()
        return (
            <div className='game-container'>
                <TurnHUD turn={turn} player={GameLogic.getPlayer(turn)} playerNames={[player1,player2]} />
                <Board board={board} turn={turn} onSelect={this.stateChangeOf('select')} selected={GameLogic.getPossibleMoveLocs(selected,board,turn)} />
                <PlayerHUD turn={turn} playerNames={[player1,player2]} onEdit={this.handleNameChange} />
            </div>
        )
    }
    stateChangeOf(ctx) {
        return action => {
            const dispatch = this.state[ctx].dispatch(action)

            this.setState(makeObj([ctx], [dispatch]))
            return dispatch
        }
    }
    handleNameChange(id) {
        return e => {
            const newName = e.target.value
            this.stateChangeOf('names')(makeObj(['id', 'name', 'type'], [id, newName, 'update']))
        }
    }
}

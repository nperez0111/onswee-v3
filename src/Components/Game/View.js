import React, { Component } from 'react';
import { makeObj } from '../../Utils/Utils.js';
import Board from './Board.js';
import GameLogic from './Logic.js';
import PlayerHUD from '../Views/PlayerHUD.js';
import TurnHUD from '../Views/TurnHUD.js';
import Notifications from 'react-notify-toast';
import AttachMiddleWares from './AttachMiddleWares.js';
import createStore from './createStore.js';

export default class GameView extends Component {
    constructor(a) {
        super(a)


        this.state = {
            store: createStore()
        }

        window.store = this.state.store

        AttachMiddleWares.call(this, this.state.store)

        this.handleNameChange = this.handleNameChange.bind(this)
        this.stateChangeOf = this.stateChangeOf.bind(this)
        this.undoableMethod = this.undoableMethod.bind(this)
    }
    render() {
        const { board, turn } = this.state.store.getState().game.getState()
        const { names, select } = this.state.store.getState()
        const { player1, player2 } = names
        const { selected } = select
        return (
            <div className='game-container'>
                <Notifications />
                <TurnHUD turn={turn} player={GameLogic.getPlayer(turn)} playerNames={[player1,player2]} >
                    <button onClick={this.undoableMethod('undo')}>Undo</button> 
                    <button onClick={this.undoableMethod('redo')}>Redo</button>
                </TurnHUD>
                <Board board={board} turn={turn} onSelect={this.stateChangeOf('store')} selected={GameLogic.getPossibleMoveLocs(selected,board,turn)} />
                <PlayerHUD turn={turn} playerNames={[player1,player2]} onEdit={this.handleNameChange} />
            </div>
        )
    }
    undoableMethod(func) {
        return () => {
            const obj = this.state.store.getState()
            console.log(obj)
            obj.game[func]()
            this.stateChangeOf('store')({ type: func })
        }
    }
    stateChangeOf(ctx) {
        return action => {
            const dispatch = this.state[ctx].dispatch(action)

            this.setState(makeObj([ctx], [this.state[ctx]]))
            return dispatch
        }
    }
    dispatchGame(action) {
        return this.stateChangeOf('store')(action)
    }
    handleNameChange(id) {
        return e => {
            const newName = e.target.value
            this.stateChangeOf('store')(makeObj(['id', 'name', 'type'], [id, newName, 'update']))
        }
    }
}

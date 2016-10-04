import React, { Component } from 'react';
import { makeObj } from '../../Utils/Utils.js';
import Board from './Board.js';
import GameLogic from './Logic.js';
import PlayerHUD from '../Views/PlayerHUD.js';
import TurnHUD from '../Views/TurnHUD.js';
import { createStore } from 'redux';
import Storage from '../../Utils/Storage.js';
import Reducer from './Reducer.js';
import NameReducer from './NameReducer.js';
import SelectReducer from '../Select/Reducer.js';
import UnDoable from '../../Utils/UnDoable.js';
import SelectMiddleWare from '../Select/MiddleWare.js';

export default class GameView extends Component {
    constructor(a) {
        super(a)

        const handleUndo = a => {
            const isInLocalStorage = a => 'init' in a

            return UnDoable.new(isInLocalStorage(a) ? a.init : a, a.history)
        }

        this.state = {
            game: Storage.getFromLocalStorage('game', Reducer, handleUndo, GameLogic.getInitialState()),
            names: createStore(NameReducer, {
                player1: 'Player 1',
                player2: 'Player 2'
            }),
            select: createStore(SelectReducer, {
                selected: null
            })
        }

        //Pretty log for state change of select
        this.state.select.subscribe(() => Storage.log('After', undefined, "Select")(this.state.select.getState()))
            //this.state.select.on('hasChanged', Storage.log('After', undefined, "Select"))

        //Pretty log for state change of names
        this.state.names.subscribe(Storage.log('After', () => this.state.names.getState()))
            //store names into local storage

        /*/Pretty log for state change of game
        this.state.game.on('hasChanged', Storage.log('After Move', a => '', "Game"))
        this.state.game.on('hasChanged', a => { GameLogic.trackcurrent(a.getState().board) })
        //*/
        this.state.game.on('hasChanged', function(state) {
            this.saveCurState('game', UnDoable.toState)
        })
        this.state.game.on('hasChanged', state => {
            const action = state.getState()
            if ('emit' in action) {
                switch (action.emit) {
                    case 'win':
                        {
                            alert(`Player ${action.who} won!`)
                            break
                        }
                    default:
                        {
                            console.warn("unhandled event")
                        }
                }
            }
        })



        //Super Important Middle ware to propagate changes from select to game
        this.state.select.subscribe(() => {
            const state = (this.state.select.getState());
            SelectMiddleWare.call(this, state)
        })

        this.handleNameChange = this.handleNameChange.bind(this)
        this.stateChangeOf = this.stateChangeOf.bind(this)
        this.undoableMethod = this.undoableMethod.bind(this)
    }
    render() {
        const { board, turn } = this.state.game.getState().getState()
        const { player1, player2 } = this.state.names.getState()
        const { selected } = this.state.select.getState()
        return (
            <div className='game-container'>
                <TurnHUD turn={turn} player={GameLogic.getPlayer(turn)} playerNames={[player1,player2]} >
                    <button onClick={this.undoableMethod('undo','game')}>Undo</button> 
                    <button onClick={this.undoableMethod('redo','game')}>Redo</button>
                </TurnHUD>
                <Board board={board} turn={turn} onSelect={this.stateChangeOf('select')} selected={GameLogic.getPossibleMoveLocs(selected,board,turn)} />
                <PlayerHUD turn={turn} playerNames={[player1,player2]} onEdit={this.handleNameChange} />
            </div>
        )
    }
    undoableMethod(func, ctx) {
        return () => {
            const obj = this.state[ctx]
            obj.getState()[func]()
            this.setState(makeObj([ctx], [obj]))
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
        return this.stateChangeOf('game')(action)
    }
    handleNameChange(id) {
        return e => {
            const newName = e.target.value
            this.stateChangeOf('names')(makeObj(['id', 'name', 'type'], [id, newName, 'update']))
        }
    }
}

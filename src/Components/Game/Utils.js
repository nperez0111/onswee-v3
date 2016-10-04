import Arrangements from './Arrangements.js';
import { makeObj } from '../../Utils/Utils.js';

export default class GameUtils extends Arrangements {
    static isPlayersTurn(player, turn) {
        return player === this.getPlayer(turn)
    }
    static getPlayer(turn) {
        return ((turn - 1) % 2) + 1
    }
    static getOtherPlayer(player) {
        if (player === this.Constants.player1) {
            return this.Constants.player2
        } else if (player === this.Constants.player2) {
            return this.Constants.player1
        }
        throw Error("Attempting to get opposite of:" + player)
    }
    static getPlayersPositions(player, board) {
        return board.reduce((prev, cur, i) => {
            if (cur === player) {
                return prev.concat(i)
            }
            return prev
        }, [])
    }
    static getPlayerNum(id) {
        return id === this.Constants.player1 || id === this.Constants.player2 ? id : false;
    }
    static isEmptyPos(pos, board) {
        return board[pos] === null
    }
    static hasPosIn(player, pos, board) {
        return player === board[pos]
    }
    static hasCenterIn(player, board) {
        return player === board[this.center]
    }
    static isBoardEmpty(board) {
        return board.every(function(cur) {
            return cur === null;
        });
    }
    static makeState(player, fro, to, type = 'move') {
        return makeObj(['player', 'from', 'to', 'type'], [player, fro, to, type])
    }
    static isPlacingRound(turn) {
        return turn < this.Constants.placingRound
    }
    static isExtraRulesRound(turn) {
        return turn < this.Constants.extraRulesRound
    }
    static getEmptyBoard() {
        return (new Array(9)).fill(null)
    }
    static getWinState(player) {
        const initialState = this.getInitialState()
        return {...initialState, emit: 'win', who: player }
    }
    static getInitialState() {
        return { board: this.getEmptyBoard(), turn: 1 }
    }
}

import Arrangements from './Arrangements.js';
import { makeObj } from '../../Utils/Utils.js';

export default class GameUtils extends Arrangements {
    static isPlayersTurn(player, turn) {
        return player === this.getPlayer(turn)
    }
    static getPlayer(turn) {
        if (turn < 1) {
            throw Error("Woa Turns start at 1 buddy")
        }
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
    static isCenterEmptyIn(board) {
        return this.isEmptyPos(this.center, board)
    }
    static hasPosIn(player, pos, board) {
        return player === board[pos]
    }
    static hasCenterIn(player, board) {
        return player === board[this.center]
    }
    static isBoardEmpty(board) {
        return board.every(function (cur) {
            return cur === null;
        });
    }
    static makeState(player, fro, to, type = 'move', ai = false) {
        const keys = ['player', 'from', 'to', 'type']
        const vals = [player, fro, to, type]
        if (ai) {
            keys.push('emit')
            vals.push('ai_move')
        }
        return makeObj(keys, vals)
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
        return { ...initialState, emit: 'win', who: player }
    }
    static getAIState(state) {
        const { board, turn } = state
        return { board, turn, ai: 'play' }
    }
    static getInitialState() {
        return {
            board: this.getEmptyBoard(),
            turn: 1,
            ai: false
        }
    }
}
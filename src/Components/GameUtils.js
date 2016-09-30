import Arrangements from './Arrangements.js';

export default class Gameutils extends Arrangements {
    static isPlayersTurn(player, turn) {
        return player === this.getPlayer(turn)
    }
    static getPlayer(turn) {
        return ((turn - 1) % 2) + 1
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
        return id === 1 || id === 2 ? id : false;
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
}

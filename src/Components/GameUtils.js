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
        return id === 1 || id == 2 ? id : false;
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
    static trackcurrent(board) {
        var bro = "|",
            brt = "|",
            br = "|";
        board.forEach((cur, i) => {
            if (i / 3 < 1) {
                bro += this.hasPosIn(this.getPlayerNum(1), i, board) ? ' X ' : this.isEmptyPosIn(i, board) ? ' ' + i + ' ' : ' O ';
            } else if (i / 3 < 2) {
                brt += this.hasPosIn(this.getPlayerNum(1), i, board) ? ' X ' : this.isEmptyPosIn(i, board) ? ' ' + i + ' ' : ' O ';
            } else {
                br += this.hasPosIn(this.getPlayerNum(1), i, board) ? ' X ' : this.isEmptyPosIn(i, board) ? ' ' + i + ' ' : ' O ';
            }
        });

        bro += "|";
        brt += "|";
        br += "|";
        //TODO getname
        const whosturn = "Now it's " + this.getName(this.get("player")) + "'s turn";

        this.logger(whosturn.split("").fill('_').join(""));
        this.logger("Turn Number:" + this.get("turns"));
        this.logger(bro, brt, br, whosturn, whosturn.split("").fill('‾').join(""));
    }
    static log = true;
    static logger(a) {
        if (this.log) {
            Array.from(arguments).forEach((err) => {
                console.log(err);
            })
        }
        return a;
    }
    static trace(a) {
        if (this.log) {
            Array.from(arguments).forEach((err) => {
                console.trace(err);
            })
        }
        return a;
    }
}

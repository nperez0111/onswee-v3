import GameUtils from './GameUtils.js';

export default class GameLogic extends GameUtils {
    isWinIn(player, board) {

        const positions = this.findPlayersPosIn(player, board).sort();

        //check to disregard values above 4 as they cant possibly be a win
        if (positions[0] > 3) {
            return false;
        }

        var possibleWaysToWin = this.winningArrangements[positions[0]];

        //if you have every position that is required to win you are a win
        return possibleWaysToWin.every((position) => {
            return this.hasPosIn(player, pos, board)
        })
    }
    canMoveInto(player, board, pos) {
        if (pos == this.center && board[this.center] === null) {
            return true;
        }
        //if its not empty skip to false otherwise check all possibles
        return (board[pos] === null) ? this.allPosMoveLocs[pos].some((loc) => {
            return (this.hasPosIn(player, loc, board))
        }) : false

    }
}

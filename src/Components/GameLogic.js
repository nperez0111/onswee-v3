import GameUtils from './GameUtils.js';

export default class GameLogic extends GameUtils {
    static isWinIn(player, board) {
        const positions = this.getPlayersPositions(player, board).sort();

        //check to disregard values above 4 as they cant possibly be a win
        if (positions[0] > 3) {
            return false;
        }

        var possibleWaysToWin = this.winningArrangements[positions[0]];

        //if you have every position that is required to win you are a win
        return possibleWaysToWin.every((position) => {
            return this.hasPosIn(player, position, board)
        })
    }
    static canMoveInto(player, pos, board) {

            if (!this.isEmptyPos(pos, board)) {
                return false
            }

            //any position can move to center
            if (pos === this.center) {
                return true;
            }

            //check all possibles that can move into specified pos
            return this.allPosMoveLocs[pos].some((loc) => {
                return (this.hasPosIn(player, loc, board))
            })

        }
        //test me
    static canMoveFromTo(player, board, fro, to) {

        //check if where we are moving is even empty
        if (this.isEmptyPos(to, board)) {

            //check if player even has that position
            if (this.hasPosIn(player, fro, board)) {

                //check if we can move to that position
                if ((fro === this.center || this.allPosMoveLocs[fro].some(a => {
                        return a === to
                    }))) {
                    return true;
                }
            }
        }
        return false;
    }
}

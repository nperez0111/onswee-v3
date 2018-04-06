import GameUtils from './Utils.js';

export default class GameLogic extends GameUtils {
    static isWinIn(player, board) {
        const positions = GameLogic.getPlayersPositions(player, board).sort();

        //check to disregard values above 4 as they cant possibly be a win
        if (positions[0] > 3) {
            return false;
        }

        var possibleWaysToWin = GameLogic.winningArrangements[positions[0]];

        //if you have every position that is required to win you are a win
        return possibleWaysToWin.every((position) => {
            return GameLogic.hasPosIn(player, position, board)
        })
    }
    static canMoveInto(player, pos, board) {

        if (!GameLogic.isEmptyPos(pos, board)) {
            return false
        }

        //any position can move to center
        if (pos === GameLogic.center) {
            return true;
        }

        //check all possibles that can move into specified pos
        return GameLogic.allPosMoveLocs[pos].some((loc) => {
            return (GameLogic.hasPosIn(player, loc, board))
        })

    }
    static canPlaceInto(player, pos, board) {
        return GameLogic.isEmptyPos(pos, board) && !GameLogic.hasIllegalLineIn(player, GameLogic.add(player, board, pos))
    }
    static moveFromTo(player, board, fro, to) {
        if (GameLogic.canMoveFromTo(player, board, fro, to)) {
            return GameLogic.hypotheticalMoveInFromTo(player, board, fro, to)
        }
        return false
    }
    static hypotheticalMoveInFromTo(player, board, fro, to) {

        const boardy = board.slice(0)
        boardy[fro] = null;
        boardy[to] = player;
        return boardy;

    }
    static add(player, bord, to) {
        const board = bord.slice(0)
        board[to] = player
        return board

    }
    static canMoveFromTo(player, board, fro, to) {

        //check if where we are moving is even empty
        if (GameLogic.isEmptyPos(to, board)) {

            //check if player even has that position
            if (GameLogic.hasPosIn(player, fro, board)) {

                //check if we can move to that position
                if (fro === GameLogic.center || GameLogic.allPosMoveLocs[fro].some(a => a === to)) {
                    return true;
                }
            }
        }
        return false;
    }
    static canMoveFromToWithRules(player, board, fro, to) {
        return GameLogic.canMoveFromTo(player, board, fro, to) && !GameLogic.hasIllegalLineIn(player, GameLogic.hypotheticalMoveInFromTo(player, board, fro, to))
    }
    static hasIllegalLineIn(player, board) {
        if (board.filter(c => c === player).length > 3 || board.filter(c => c === GameLogic.getOtherPlayer(player)).length > 3) {
            //check for the off chance there are too many pieces
            return true;
        }
        const illegals = GameLogic.winningArrangements.concat(GameLogic.illegalArrangements)

        return illegals.some(possibleLocs => {
            return possibleLocs.every(cur => GameLogic.hasPosIn(player, cur, board))
        })
    }
    static moveFromToWithRules(player, board, fro, to) {
        const postMove = GameLogic.moveFromTo(player, board, fro, to)
        if (postMove === false) {
            return false
        }
        if (GameLogic.hasIllegalLineIn(player, postMove)) {
            return false
        }
        return postMove

    }
    static changeBetween(prev, newy) {
        let ret = [];

        prev.forEach(function (cur, i) {
            if (cur !== (newy || [])[i]) {
                if (cur === null) {
                    ret[1] = i;
                }
                if (cur !== null) {
                    ret[0] = i;
                }
            }
        });
        return ret;
    }
    static getPossibleMoveLocs(selected, board, turn) {
        return board.map((loc, to) => {
            return GameLogic.canMoveFromTo(GameLogic.getPlayer(turn), board, selected, to)
        })
    }
}
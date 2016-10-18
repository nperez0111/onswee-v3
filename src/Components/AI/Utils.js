import Logic from '../Game/Logic.js'

export default class AIUtils extends Logic {
    static rotateBoard(board, howManyTimes = 0, matrix = this.rotateBoardRight) {
        if (howManyTimes > 1) {
            board = this.rotateBoard(board, howManyTimes - 1, matrix)
        }
        return matrix.map((cur, i) => board[i + cur])
    }
    static twoBoardEqual(board1, board2) {
        return board1.every(c => c == board2[c])
    }
    static areBoardsEqual(board1, board2) {
        if (this.twoBoardEqual(board1, board2)) {
            return true
        }
        return this.boardOrientations.some(board => {
            return this.twoBoardEqual(board1, this.rotateBoard(board2, 1, board))
        })
    }
    static justMoveAnywhere(player, board) {
        /*
                let move = []
                this.getPlayersPositions(player, board).some(fro => {
                    return this.returnResponse(baord, to => this.canMoveFromTo(player, board, fro, to) ? [fro, to] : false)
                })

                return move*/
        const positions = this.getPlayersPositions(player, board)
        return this.returnResponse(positions, fro => this.returnResponse(board, to => this.canMoveFromTo(player, board, fro, to) && [fro, to]))

    }
    static returnResponse(arr, func, defaultValue = false) {
        let val = false
        arr.some((cur, i) => {

            const resp = func(cur, i)

            if (resp === false || resp === undefined) {

                return false

            }
            val = resp
            return true

        })

        return val || defaultValue
    }
    static addToBoard(player, board) {
        const boardRankings = [4, 1, 3, 5, 7, 0, 2, 6, 8]

        return ['ADD', this.returnResponse(boardRankings, cur => this.isEmptyPos(cur, board) && !this.hasIllegalLineIn(player, this.add(player, board, cur)) && cur)]
    }

    static isWinInForOtherPlayer(player, board) {
        return this.isWinIn(this.getOtherPlayer(player), board)
    }
    static hasPossibleLineIn(player, board) {
        const hasBothPos = arr => this.hasPosIn(player, arr[0], board) && this.hasPosIn(player, arr[1], board)

        let hasCenter = false;
        if (this.hasCenterIn(player, board)) {
            //if hascenter do easy computation;
            hasCenter = this.retRes(this.pairArrangements.filter((c, i) => {
                return i > 3;
            }), (cur, i) => {
                const offset = 4 + i;
                if (hasBothPos(cur)) {

                    if (this.isEmptyPos(this.pairArrangements[-2 * (offset % 2) + offset + 1][-2 * (offset % 2) + 1], board)) {

                        return offset

                    }

                }

            }, null)

        }

        const ret = this.retRes(this.pairArrangements, (cur, i) => {
            if (hasBothPos(cur)) {
                return i;
            }
        }, null);
        return hasCenter === null ? false : hasCenter || ret === null ? 12 : ret;

    }

    static isAbleToWin(player, board) {

        const pairArrOutPut = this.hasPossibleLineIn(player, board)

        const hasFinalPieceToMoveIn = () => this.hasPosIn(player, this.pairCompleter[pairArrOutPut][0], board) || this.hasPosIn(player, this.pairCompleter[pairArrOutPut][1], board)
            //this.log( pairArrOutPut );
        if (pairArrOutPut == 12) {
            return false
        } else if (this.hasCenterIn(null, board) && (pairArrOutPut < 4)) {
            return true
        } else if (pairArrOutPut > 3 && hasFinalPieceToMoveIn() &&
            this.isEmptyPos(this.pairArrangements[pairArrOutPut + (-2 * (pairArrOutPut % 2) + 1)][(-1 * (pairArrOutPut % 2)) + 1], board)) {

            return true;
        }
        return false;

    }
}

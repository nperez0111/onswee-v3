import Logic from '../Game/Logic.js'

export default class AIUtils extends Logic {
    static rotateBoard(board, howManyTimes = 0, matrix = this.rotateBoardRight) {
        if (howManyTimes > 1) {
            board = this.rotateBoard(board, howManyTimes - 1, matrix)
        }
        return matrix.map((cur, i) => board[i + cur])
    }
    static twoBoardEqual(board1, board2) {
        return board1.every((c, i) => c == board2[i])
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
        const positions = this.getPlayersPositions(player, board)

        return this.returnResponse(positions, fro => this.returnResponse(board, (c, to) => this.canMoveFromTo(player, board, fro, to) && [fro, to]))
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
    static hasPossibleLineIn(player, board, retToBeBool = true) {
        const hasBothPos = arr => this.hasPosIn(player, arr[0], board) && this.hasPosIn(player, arr[1], board)
        const whichToCheck = i => this.hasCenterIn(player, board) ? i > 3 : i < 4

        const result = this.pairArrangements.map((c, i) => whichToCheck(i) && hasBothPos(c) && i).filter(a => a !== false)
        if (result.length === 0) {
            return false
        }
        return retToBeBool ? true : result
            //returns the indices of pairarrangement that have pieces on those positions


    }

    static isAbleToWin(player, board, retToBeBool = true, useOtherPlayer = false) {

        const indexes = this.hasPossibleLineIn(useOtherPlayer ? this.getOtherPlayer(player) : player, board, false)
        const hasFinalPieceToMoveIn = i => this.hasPosIn(player, this.pairCompleter[i][0], board) || this.hasPosIn(player, this.pairCompleter[i][1], board)
        const checkPairCompleter = index => this.isEmptyPos(this.pairCompleting[index], board)
        const resp = (fro, i) => [fro, this.pairCompleting[i]]
        if (indexes === false) {
            return false
        }
        return this.returnResponse(indexes, index => {
            if (index < 4) {
                if (this.hasCenterIn(null, board)) {
                    return retToBeBool ? true : resp(this.center, index)
                }
            }
            if (index > 3) {
                if (hasFinalPieceToMoveIn(index) && checkPairCompleter(index)) {

                    const completer = this.pairCompleter[index]

                    return retToBeBool ? true : this.hasPosIn(player, completer[0], board) ? resp(completer[0], index) : resp(completer[1], index);
                }
                return false
            }
        }, false)

    }
    static takeTheWin(player, board) {
        return this.isAbleToWin(player, board, false)
    }
    static isAbleToBlock(player, board, retToBeBool = true) {
        const posToBlock = this.isAbleToWin((player), board, false, true)
        return retToBeBool ? posToBlock !== false : posToBlock
    }
    static blockTheOtherPlayer(player, board) {
        return this.isAbleToBlock(player, board, false)
    }
    static makeAIState(player, fro, to, type = 'ai_move') {
        return this.makeState(player, fro, to, type)
    }
}

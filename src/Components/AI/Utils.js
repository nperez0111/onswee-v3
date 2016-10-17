import Logic from '../Game/Logic.js'

export default class AIUtils extends Logic {
    static rotateBoard(board, howManyTimes = 0, matrix = this.rotateBoardRight) {
        //DOES NOT WORK WTF
        if (howManyTimes > 1) {
            board = rotateBoard(board, howManyTimes - 1, matrix)
        }
        return matrix.map((cur, i) => board[i + cur])
    }
    static isWinInForOtherPlayer(player, board) {
        return this.isWinIn(this.getOtherPlayer(player), board)
    }
    static justMoveAnywhere(player, board) {
        /*
                let move = []
                this.getPlayersPositions(player, board).some(fro => {
                    return this.retRes(baord, to => this.canMoveFromTo(player, board, fro, to) ? [fro, to] : false)
                })

                return move*/
        const positions = this.getPlayersPositions(player, board)
        return this.retRes(positions, fro => this.retRes(board, to => this.canMoveFromTo(player, board, fro, to) && [fro, to]))

    }
    static retRes(arr, func, defaultValue = false) {
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
    static addtoBoard(player, board) {
        const boardRankings = [4, 1, 3, 5, 7, 0, 2, 6, 8]

        return this.retRes(boardRankings, cur => this.isEmptyPos(cur, board))
    }
}

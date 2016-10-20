import AIUtils from './Utils.js'

export default class AI extends AIUtils {

    static generateMoves(player, board, turnBool) {
        return this.trimArrangements(player, this.getPlayersPositions(player, board).map(fro => {
            return this.allPosMoveLocs[fro].filter(to => {
                return this.canMoveFromTo(player, board, fro, to);
            }).map(to => {
                return this.hypotheticalMoveInFromTo(player, board, fro, to)
            })
        }).reduce((prev, newy) => prev.concat(newy), []), turnBool)

    }
    static trimArrangements(player, boards, turnBool = false) {
        return boards.filter((board, i) => {

            return /*(turnBool && this.hasIllegalLineIn(player, board)) ||*/ !boards.slice(i + 1).some(other => this.areBoardsEqual(board, other))
        })
    }
    static decideMoveToTake(player, board) {
        const options = [{
            is: player => this.isPlacingRound(player),
            then: this.addToBoard
        }, {
            is: player => this.isExtraRulesRound(player),
            then: this.moveWithExtraRules
        }, {
            is: this.isAbleToWin,
            then: this.takeTheWin
        }, {
            is: this.isAbleToBlock,
            then: this.blockOtherPlayer
        }, {
            is: true,
            then: this.pickBestMove
        }, {
            is: true,
            then: this.justMoveAnywhere
        }]

        return this.returnResponse(options, option => option.is(player, board) && option.then(player, board), [null, null])
    }

}

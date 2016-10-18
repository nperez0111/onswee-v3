import AIUtils from './Utils.js'

export default class AI extends AIUtils {

    generateMoves(player, board, turnBool) {
        return this.trimArrangements(player, this.getPlayerPositions(player, board).map(fro => {
            return this.allPosMoveLocs[fro].filter(to => {
                return this.canMoveFromTo(player, board, fro, to);
            }).map(to => {
                return this.hypotheticalMoveInFromTo(player, board, fro, to)
            })
        }).reduce((prev, newy) => prev.concat(newy), []), turnBool)

    }
    trimArrangements(player, boards, turnBool = false) {
        if (!turnBool) {
            //At this rate it doesnt matter all that much
            return boards
        }
        return boards.filter(board => turnBool && this.hasIllegalLineIn(player, board))
    }
    decideMoveToTake(player, board) {
        const options = [{
            is: player => this.isPlacingRound(player),
            then: this.addToBoard
        }, {
            is: player => this.isExtraRulesRound(player),
            then: this.moveWithExtraRules
        }, {
            is: this.isWinIn,
            then: this.takeTheWin
        }, {
            is: this.isWinInForOtherPlayer,
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

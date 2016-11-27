import AIUtils from './Utils.js'
import MiniMax from './MiniMax.js'
import memoize from '../../Utils/memoizer.js'

export default class AI extends AIUtils {
    constructor(player) {
        super()
        this.mini = new MiniMax({
            genLevel: memoize(this.generateMoves),
            rankLevel: memoize(this.rankBoard),
            disregard: memoize((player, board) => this.isWinIn(player, board)),
            initialState: board,
            player

        })
    }

    static generateMoves(player, board, turnBool = false) {
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

            if (turnBool && this.hasIllegalLineIn(player, board)) {
                return false
            }

            const hasNoOtherBoardLikeThis = !boards.slice(i + 1).some(other => this.areBoardsEqual(board, other))

            return hasNoOtherBoardLikeThis
        })
    }
    static decideMoveToTake(player, board, turn) {
        const options = [{
                is: (player, board, turn) => this.isPlacingRound(turn),
                then: this.addToBoard
            }, {
                is: (player, board, turn) => this.isExtraRulesRound(turn),
                then: this.moveWithExtraRules
            }, {
                is: (player, board) => this.isAbleToWin(player, board),
                then: this.takeTheWin
            }, {
                is: (player, board) => this.isAbleToBlock(player, board),
                then: this.blockOtherPlayer
            },
            /*{
                       is: true,
                       then: this.pickBestMove
                   },*/
            {
                is: true,
                then: (player, board) => this.justMoveAnywhere(player, board)
            }
        ]

        return this.returnResponse(options, option => option.is(player, board, turn) && option.then(player, board), [null, null])
    }

    static pickBestMove(player, board, turn) {

        //this.mini.setState(player, board)

        const boardPicked = this.mini.findBestMove(5)
        if (boardPicked === null) {
            return false
        }
        return this.changeBetween(board, boardPicked)
    }

    static rankBoard(player, board) {
        return Object.values(this.statsToMeasure).reduce((prev, curStat) => {
            if (curStat.true.call(this, player, board)) {
                return prev + curStat.award
            }
            return prev
        }, 0)
    }

    static statsToMeasure = {
        hasCenter: {
            true: (player, board) => this.hasCenter(player, board),
            award: 50 //Arbitrary number alert 
        }
    };
    /*
    Need some way of generating those numbers rather than just hard coding them.

    */

}

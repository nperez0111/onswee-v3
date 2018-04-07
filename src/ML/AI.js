import TreeModel from 'tree-model'
import json from './net.json'
import brain from 'brain.js'
import Logic from '../Game/Logic'
const mapPlayerPositionsToObj = (positions, player) => new Array(9).fill(false).map((c, i) => positions.includes(i) ? 1 : 0).reduce((prev, cur, i) => {
    prev[player + i] = cur
    return prev
}, {})

class Node extends Logic {
    constructor({ board, turn, net }) {
        super()
        this.board = board
        this.turn = turn
        this.net = net
        this.rank = this.getRanking()
    }
    isExtraRulesRound() {
        return Logic.isExtraRulesRound(this.turn)
    }
    getPossiblesOf() {
        return Logic.getPlayersPositions(this.player, this.board).map(fro => {
            return Logic.allPosMoveLocs[fro].filter(to => {
                const canMove = this.isExtraRulesRound ? Logic.canMoveFromToWithRules : Logic.canMoveFromTo
                return canMove(this.player, this.board, fro, to);
            }).map(to => {
                return new Node({ board: Logic.hypotheticalMoveInFromTo(this.player, this.board, fro, to), turn: this.turn + 1, net: this.net })
            })
        })
    }
    getPositions(currentPlayer = true) {
        return Logic.getPlayersPositions(currentPlayer ? this.player : Logic.getOtherPlayer(this.player), this.board)
    }
    getOtherPositions() {
        return this.getPositions(false)
    }
    getRawRanking() {
        return this.net.run(Object.assign({}, mapPlayerPositionsToObj(this.getPositions(), this.playerName), mapPlayerPositionsToObj(this.getOtherPositions(), this.otherPlayerName)))
    }
    getRanking(player = Logic.Constants.player1) {
        if (!this.rank) {
            this.rank = this.getRawRanking().firstPlayerWin
        }

        return Logic.Constants.player1 === player ? this.rank : 1 - this.rank
    }
    print() {
        Logic.log(`Turn: ${this.turn}`)
        Logic.trackcurrent(this.board)
        Logic.log(`Rank: ${this.rank}`)
    }
    get player() {
        return Logic.getPlayer(this.turn)
    }
    get playerName() {
        return this.player === Logic.Constants.player1 ? 'firstPlayer' : 'secondPlayer'
    }
    get otherPlayerName() {
        return this.player === Logic.Constants.player2 ? 'firstPlayer' : 'secondPlayer'
    }
}
class Minimax {
    constructor() {

    }
    static findBestMove({ root, depth = 3, height = 1, isMax = true }) {
        if (depth === height) {
            return root
        }
        if (isMax) {

        } else {
            root.getPossiblesOf()
        }

    }
}

export default class AI extends Logic {
    constructor(options) {
        super()
        this.net = new brain.NeuralNetwork()
        this.net.fromJSON(json)
        console.log(this.net.run(Object.assign({}, mapPlayerPositionsToObj([0, 2, 4], 'secondPlayer'), mapPlayerPositionsToObj([1, 3, 5], 'firstPlayer'))))

        let n = new Node({ board: [null, 1, 2, 1, 2, 1, null, 2, null], turn: 7, net: this.net })
        Logic.trackcurrent(n.board)
        console.log('rw')
        n.getPossiblesOf().forEach(arr => {
            console.log(arr)
            arr.forEach(board => {
                board.print()
            })
        })
    }
    static justMoveAnywhere(player, board) {
        const positions = Logic.getPlayersPositions(player, board)

        return Logic.returnResponse(positions, fro => Logic.returnResponse(board, (c, to) => Logic.canMoveFromTo(player, board, fro, to) && [fro, to]))
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
    static isWinInForOtherPlayer(player, board) {
        return Logic.isWinIn(Logic.getOtherPlayer(player), board)
    }
    static hasPossibleLineIn(player, board, retToBeBool = true) {
        const hasBothPos = arr => Logic.hasPosIn(player, arr[0], board) && Logic.hasPosIn(player, arr[1], board)
        const whichToCheck = i => Logic.hasCenterIn(player, board) ? i > 3 : i < 4

        const result = Logic.pairArrangements.map((c, i) => whichToCheck(i) && hasBothPos(c) && i).filter(a => a !== false)
        if (result.length === 0) {
            return false
        }
        return retToBeBool ? true : result
        //returns the indices of pairarrangement that have pieces on those positions


    }

    static isAbleToWin(player, board, retToBeBool = true, useOtherPlayer = false) {

        const indexes = Logic.hasPossibleLineIn(useOtherPlayer ? Logic.getOtherPlayer(player) : player, board, false)
        const hasFinalPieceToMoveIn = i => Logic.hasPosIn(player, Logic.pairCompleter[i][0], board) || Logic.hasPosIn(player, Logic.pairCompleter[i][1], board)
        const checkPairCompleter = index => Logic.isEmptyPos(Logic.pairCompleting[index], board)
        const resp = (fro, i) => [fro, Logic.pairCompleting[i]]
        if (indexes === false) {
            return false
        }
        return AI.returnResponse(indexes, index => {
            if (index < 4) {
                if (Logic.isCenterEmptyIn(board)) {
                    return retToBeBool ? true : resp(Logic.center, index)
                }
            } else {
                if (hasFinalPieceToMoveIn(index) && checkPairCompleter(index)) {

                    const completer = Logic.pairCompleter[index]

                    return retToBeBool ? true : Logic.hasPosIn(player, completer[0], board) ? resp(completer[0], index) : resp(completer[1], index);
                }
                return false
            }
        }, false)

    }
    static addToBoard(player, board) {
        return AI.returnResponse(Logic.prefferedLocs, position => Logic.isEmptyPos(position, board) && [null, position])
    }
    static takeTheWin(player, board) {
        return AI.isAbleToWin(player, board, false)
    }
    static isAbleToBlock(player, board, retToBeBool = true) {
        const posToBlock = AI.isAbleToWin((player), board, false, true)
        return retToBeBool ? posToBlock !== false : posToBlock
    }
    static blockTheOtherPlayer(player, board) {
        return AI.isAbleToBlock(player, board, false)
    }
    static decideMoveToTake(player, board, turn) {
        const options = [{
                is: (player, board, turn) => Logic.isPlacingRound(turn),
                then: AI.addToBoard
            }, {
                is: (player, board, turn) => Logic.isExtraRulesRound(turn),
                then: AI.pickBestMove
            }, {
                is: (player, board) => AI.isAbleToWin(player, board),
                then: AI.takeTheWin
            }, {
                is: (player, board) => AI.isAbleToBlock(player, board),
                then: AI.blockOtherPlayer
            },
            {
                is: (player, board) => turn > Logic.Constants.extraRulesRound,
                then: AI.pickBestMove
            },
            {
                is: true,
                then: (player, board) => AI.justMoveAnywhere(player, board)
            }
        ]

        return AI.returnResponse(options, option => {
            console.log(option)
            return option.is(player, board, turn) && option.then(player, board)
        }, [null, null])
    }
    static pickBestMove(player, board, turn) {

        //this.mini.setState(player, board)

        const boardPicked = null
        if (boardPicked === null) {
            return [false, false]
        }
        return Logic.changeBetween(board, boardPicked)
    }
}
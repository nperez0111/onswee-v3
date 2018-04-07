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

export default class AI {
    constructor(options) {
        this.net = new brain.NeuralNetwork()
        this.net.fromJSON(json)
        window.net = this.net
        window.AI = this
        console.log(net.run(Object.assign({}, mapPlayerPositionsToObj([0, 2, 4], 'secondPlayer'), mapPlayerPositionsToObj([1, 3, 5], 'firstPlayer'))))

        let n = new Node({ board: [null, 1, 2, 1, 2, 1, null, 2, null], turn: 7, net })
        Logic.trackcurrent(n.board)
        console.log('rw')
        n.getPossiblesOf().forEach(arr => {
            console.log(arr)
            arr.forEach(board => {
                board.print()
            })
        })
    }
}
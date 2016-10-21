import Utils from './index.js'
import TreeModel from 'tree-model'

export default class MiniMax {

    constructor({ genLevel, rankLevel, initialState, player }) {

        this.genLevel = genLevel
        this.rankLevel = rankLevel
        this.state = initialState
        this.player = player
        this.tree = new TreeModel()

    }

    setState(state) {

        this.state = state

    }
    getState() {
        return this.state
    }
    makeFirstLevel(player = this.player, board = this.state) {
        return this.makeALevel(player, board, 1)
    }
    makeALevel(player = this.player, board = this.state, level) {
        return this.tree.parse(this.makeNode(player, board, level))
    }
    makeAnotherLevel(player = this.player, node) {
        return this.walker(node, cur => {
            const nextLevels = this.genLevel(player, cur.model.board).map(board => this.makeALevel(player, board, cur.model.level + 1))
            nextLevels.forEach(nextLevel => cur.addChild(nextLevel))
        }, player)
    }

    makeLevel(howManyDeep = 1, player = this.player, board = this.state) {

        if (howManyDeep === 1) {
            return this.makeFirstLevel(player, board)
        }
        if (howManyDeep === 2) {
            return this.makeAnotherLevel(Utils.getOtherPlayer(player), this.makeFirstLevel(player, board))
        }
        if (howManyDeep === 3) {
            return this.makeAnotherLevel(player, this.makeAnotherLevel(Utils.getOtherPlayer(player), this.makeFirstLevel(player, board)))
        }

    }
    walker(node, callback, level) {
        node.all(state => state.model.level === level).forEach(state => callback(state))
        return node
    }
    makeNode(player, board, level = 0) {
        return { id: JSON.stringify(board), rank: this.rankLevel(player, board), board, player, level }
    }

}

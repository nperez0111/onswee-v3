import Utils from './index.js'
import TreeModel from 'tree-model'

export default class MiniMax {

    constructor({ genLevel, rankLevel, initialState, player, disregard = a => false }) {

        this.genLevel = genLevel
        this.rankLevel = rankLevel
        this.state = initialState
        this.player = player
        this.tree = new TreeModel()
        this.disregard = disregard

    }

    setState(player, state) {
        this.player = player
        this.state = state

    }
    getState() {
        return this.state
    }
    makeFirstLevel(player = this.player, board = this.state) {
        return this.makeALevel(player, board, 1)
    }
    makeALevel(player = this.player, board = this.state, level, shouldGenNextLevel = true) {
        return this.tree.parse(this.makeNode(player, board, level, shouldGenNextLevel))
    }
    makeAnotherLevel(player = this.player, node, level) {
        return this.walker(node, cur => {
            if (cur.model.shouldGenNextLevel === false) {
                return
            }
            const nextBoards = this.genLevel(player, cur.model.board)
            if (nextBoards.some(board => this.disregard(player, board))) {
                //if disregard ever returns true then drop the parent node
                cur.drop()
                return
            }
            const nextLevel = cur.model.level + 1
            const nextLevels = nextBoards.map(board => this.makeALevel(player, board, nextLevel))

            nextLevels.forEach(level => cur.addChild(level))
        }, player)
    }

    makeLevel(howManyDeep = 1, player = this.player, board = this.state) {

        if (howManyDeep === 1) {

            return this.makeFirstLevel(player, board)

        }

        const arr = (new Array(howManyDeep - 1)).fill(false).map((c, i) => i)

        const makeNewLevel = (prev, i) => this.makeAnotherLevel(i % 2 === 0 ? Utils.getOtherPlayer(player) : player, prev, i + 1)

        return arr.reduce(makeNewLevel, this.makeFirstLevel(player, board))
    }
    walker(node, callback, level) {
        node.all(state => state.model.level === level).forEach(state => callback(state))
        return node
    }
    makeNode(player, board, level = 0, shouldGenNextLevel = true) {
        return { id: JSON.stringify(board), rank: this.rankLevel(player, board), shouldGenNextLevel, board, player, level }
    }
    findBestMove(howManyDeep) {
        const mainNode = this.makeLevel(howManyDeep)
        const best = []
        const betterThanAve = []
        const avePerLevel = []

        (new Array(howManyDeep - 1)).fill(false).map((c, i) => i).forEach(a => {
            avePerLevel[a] = this.findAveOfLevel(mainNode, a + 1)
            betterThanAve[a] = []
        })

        mainNode.walk((node) => {
            const { rank, level } = node.model

            if (best[level].model.rank > rank) {
                best[rank] = node
            }
            if (rank > avePerLevel[level]) {
                betterThanAve[level].push(node)
            }
        })

        return best[0]

    }
    findAveOfLevel(rootNode, level) {
        const ranks = []

        this.walker(rootNode, node => { ranks.push(node.model.rank) }, level)

        return ranks.reduce((prev, cur) => prev + cur, 0) / ranks.length
    }
    static sortLevels(fnode, snode) {
        return fnode.model.rank - snode.model.rank
    }

}

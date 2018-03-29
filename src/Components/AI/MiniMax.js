import Utils from './index.js'
import TreeModel from 'tree-model'

export default class MiniMax {
    static makeFirstLevel({ player, board, levelRanker }) {
        return this.makeALevel({ level: 1, player, board, levelRanker })
    }
    static makeALevel({ player, board, level, levelRanker }, shouldGenNextLevel = true) {
        const tree = new TreeModel()
        return tree.parse(this.makeNode(player, board, level, levelRanker, shouldGenNextLevel))
    }
    static makeAnotherLevel({ player, node, genLevel, disregard, levelRanker }) {
        return this.walker(node, cur => {
            if (cur.model.shouldGenNextLevel === false) {
                return
            }
            const nextBoards = genLevel(player, cur.model.board)
            if (nextBoards.some(board => disregard(player, board))) {
                //if disregard ever returns true then drop the parent node
                cur.drop()
                return
            }
            const nextLevel = cur.model.level + 1
            const nextLevels = nextBoards.map(board => this.makeALevel({ player, board, level: nextLevel, levelRanker }))

            nextLevels.forEach(curLevel => cur.addChild(curLevel))
        }, player)
    }

    static makeLevel({ howManyDeep = 1, player, board, levelRanker, genLevel, disregard = a => false }) {

        if (howManyDeep === 1) {

            return this.makeFirstLevel({ player, board, levelRanker })

        }

        const arr = (new Array(howManyDeep - 1)).fill(false).map((c, i) => i)

        const makeNewLevel = (prev, i) => this.makeAnotherLevel({ player: i % 2 === 0 ? Utils.getOtherPlayer(player) : player, node: prev, levelRanker, genLevel, disregard })

        return arr.reduce(makeNewLevel, this.makeFirstLevel({ player, board, levelRanker }))
    }
    static walker(node, callback, level) {
        node.all(state => state.model.level === level).forEach(state => callback(state))
        return node
    }
    static makeNode(player, board, level = 0, levelRanker, shouldGenNextLevel = true) {
        return { id: JSON.stringify(board), rank: levelRanker(player, board), shouldGenNextLevel, board, player, level }
    }
    static findBestMove(options) {
        const mainNode = this.makeLevel(options)
        const best = []
        const betterThanAve = []
        const avePerLevel = []
        const arr = new Array(options.howManyDeep - 1)

        arr.fill(false).map((c, i) => i).forEach((a) => {
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
    static findAveOfLevel(rootNode, level) {
        const ranks = []

        this.walker(rootNode, node => { ranks.push(node.model.rank) }, level)

        return ranks.reduce((prev, cur) => prev + cur, 0) / ranks.length
    }
    static sortLevels(fnode, snode) {
        return fnode.model.rank - snode.model.rank
    }

}
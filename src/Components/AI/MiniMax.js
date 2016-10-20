import Utils from './index.js'

export default class MiniMax {

    constructor({ genLevel, rankLevel, initialState, player }) {

        this.genLevel = genLevel
        this.rankLevel = rankLevel
        this.state = initialState
        this.player = player

    }

    setState(state) {

        this.state = state

    }

    makeLevel(howManyDeep = 1, player = this.player, state = this.state) {

        if (howManyDeep == 1) {

            return this.rankLevel(this.genLevel(player, state), player)

        }

        let curBoards = this.genLevel(player, state)

        //Figure that shit out
        //this isnt going to work.....
        return (new Array(howManyDeep - 1)).fill(true).map((a, i) => {

            const levels = this.rankLevel(curBoards, player).map((rank, i) => { board: curBoards[i], ranking: rank })
            curBoards = curBoards.map(board => this.genLevel(i % 2 == 0 ? Utils.getOtherPlayer(player) : player, board))

            return levels

        })

    }
    static isBoard(board) {
        return board[0] === null || board[0] === this.getPlayerNum(1) || board[0] === this.getPlayerNum(2)
    }
    rankLevel(level, player) {
        if (level[0])
            return level.map(board => this.rankLevel(player, board))

    }

}

export default class Gameutils {
    static isPlayersTurn(player, turn) {
        return player === turn % 2
    }
    static getPlayer(turn) {
        return turn % 2
    }
    static getPlayersPositions(player, board) {
        return board.reduce((prev, cur, i) => {
            if (cur === player) {
                return prev.concat(i)
            }
            return prev
        }, [])
    }
}

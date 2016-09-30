import GameUtils from './GameUtils.js';
const g = GameUtils;
const e = expect;
const b = [1, null, 2, 1, 2, null, 2, 1, null];
const w = [1, 2, null, 2, 1, null, null, 2, 1];
it('gets player number', () => {
    e(g.getPlayerNum(1)).toBe(1)
    e(g.getPlayerNum(2)).toBe(2)
    e(g.getPlayerNum(0)).toBe(false)
    e(g.getPlayerNum(3)).toBe(false)
})
it('gets current player based on turn', () => {
    e(g.getPlayer(1)).toBe(g.getPlayerNum(1))
    e(g.getPlayer(2)).toBe(g.getPlayerNum(2))
    e(g.getPlayer(1)).not.toBe(g.getPlayerNum(2))
})
it('gets whether it is the current players turn', () => {
    e(g.isPlayersTurn(1, 1)).toBe(true)
    e(g.isPlayersTurn(2, 2)).toBe(true)
    e(g.isPlayersTurn(2, 1)).toBe(false)
    e(g.isPlayersTurn(1, 2)).toBe(false)
})
it('gets players position in a board', () => {
    e(g.getPlayersPositions(1, [2, null, 1, 1, 1, null])).toEqual([2, 3, 4])
    e(g.getPlayersPositions(2, [2, null, 1, 1, 1, 2, null, 2])).toEqual([0, 5, 7])
})
it('knows when the board is empty', () => {
    e(g.isBoardEmpty([null, null, null, null, null])).toBe(true)
    e(g.isBoardEmpty([1, null, null, null])).toBe(false)
})
it('knows when the player has a position within a board', () => {
    e(g.hasPosIn(1, 0, b)).toBe(true)
    e(g.hasPosIn(2, 0, b)).toBe(false)
    e(g.hasPosIn(1, 3, b)).toBe(true)
})
it('knows who has the center of the board', () => {
    e(g.hasCenterIn(1, b)).toBe(false)
    e(g.hasCenterIn(2, b)).toBe(true)
})
it('knows an empty position', () => {
    e(g.isEmptyPos(1, b)).toBe(true)
    e(g.isEmptyPos(2, b)).toBe(false)
})

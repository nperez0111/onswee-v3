import GameUtils from './Utils.js';
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
it('knows how to get another player', () => {
    e(g.getOtherPlayer(1)).toBe(2)
    e(g.getOtherPlayer(2)).toBe(1)
    e(() => g.getOtherPlayer(true)).toThrow(Error)
})
it('knows how to make an empty board', () => {
    e(g.getEmptyBoard()).toEqual([null, null, null, null, null, null, null, null, null])
})
it('knows when the placing round is', () => {
    e(g.isPlacingRound(6)).toBe(true)
    e(g.isPlacingRound(7)).toBe(false)
    e(g.isPlacingRound(9)).toBe(false)
})
it('knows when the extra rules round is', () => {
    e(g.isExtraRulesRound(12)).toBe(true)
    e(g.isExtraRulesRound(13)).toBe(false)
    e(g.isExtraRulesRound(14)).toBe(false)
})

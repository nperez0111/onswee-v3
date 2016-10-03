import GameLogic from './GameLogic.js';
const g = GameLogic;
const e = expect;
const b = [1, null, 2, 1, 2, null, 2, 1, null];
const w = [1, 2, null, 2, 1, null, null, 2, 1];
it('knows when there is a winning board', () => {
    e(g.isWinIn(1, w)).toBe(true)
    e(g.isWinIn(2, b)).toBe(true)
    e(g.isWinIn(1, b)).toBe(false)
    e(g.isWinIn(2, w)).toBe(false)
})
it('knows whether a player can move into a position', () => {
    e(g.canMoveInto(1, 1, b)).toBe(true)
    e(g.canMoveInto(2, 1, b)).toBe(true)
    e(g.canMoveInto(1, 2, [1, 2, null, 1, null, null, 1, 2, 1])).toBe(false)
})
it('knows whether a player can move from one position to another', () => {
    e(g.canMoveFromTo(1, b, 0, 1)).toBe(true)
    e(g.canMoveFromTo(1, b, 0, 2)).toBe(false)
    e(g.canMoveFromTo(2, b, 0, 1)).toBe(false)
    e(g.canMoveFromTo(2, b, 0, 2)).toBe(false)
    e(g.canMoveFromTo(1, b, 0, 3)).toBe(false)
})
it('knows the diff between two boards', () => {
    const newone = [null, 1, 2, 1, 2, null, 2, 1, null]
    e(g.changeBetween(b, newone)).toEqual([0, 1])
})
it('knows the possible move locations', () => {
    e(g.getPossibleMoveLocs(0, b, 1)).toEqual([false, true, false, false, false, false, false, false, false])
    e(g.getPossibleMoveLocs(3, b, 1)).toEqual([false, false, false, false, false, false, false, false, false])
    e(g.getPossibleMoveLocs(7, b, 1)).toEqual([false, false, false, false, false, false, false, false, true])
})

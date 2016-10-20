import Utils from './Utils.js';
const g = Utils
const e = expect
const b = [1, null, 2, 1, 2, null, 2, 1, null]
const w = [1, 2, null, 2, 1, null, null, 2, 1]

it('has the returnResponse function', () => {
    e(Utils.returnResponse([1, 2, 3], val => val === 2 && val + 3)).toBe(5)
    e(Utils.returnResponse([1, 2, 3], val => val === 'nonexistent', "default")).toBe("default")
})

it('knows when the other player is going to win', () => {
    e(Utils.isWinInForOtherPlayer(2, w)).toBe(true)
    e(Utils.isWinInForOtherPlayer(1, w)).toBe(false)
})

it('knows how to rotate a board', () => {
    e(Utils.rotateBoard(b)).toEqual([2, 1, 1, 1, 2, null, null, null, 2])
    e(Utils.rotateBoard(b, 1, Utils.rotateBoardLeft)).toEqual([2, null, null, null, 2, 1, 1, 1, 2])
})

it('adds to the board', () => {
    e(Utils.addToBoard(1, Utils.getEmptyBoard())).toEqual(['ADD', 4])
    e(Utils.addToBoard(1, Utils.add(1, Utils.getEmptyBoard(), 4))).toEqual(['ADD', 1])
})

it('can rotate a board multiple times', () => {
    e(Utils.rotateBoard(b, 2)).toEqual([null, 1, 2, null, 2, 1, 2, null, 1])
    e(Utils.rotateBoard(b, 3)).toEqual([2, null, null, null, 2, 1, 1, 1, 2])
})

it('knows when two boards are equivalent', () => {
    e(g.areBoardsEqual(g.rotateBoard(b, 2), b)).toBe(true)
    e(g.areBoardsEqual(g.rotateBoard(g.rotateBoard(b, 1, g.flipHorizontal)), b)).toBe(true)
    e(g.areBoardsEqual(g.rotateBoard(g.rotateBoard(b, 1, g.flipVertical), 2), b)).toBe(true)
    e(g.areBoardsEqual(g.rotateBoard(g.rotateBoard(b, 1, g.flipVertical), 1, g.flipTopLeft), b)).toBe(true)
    e(g.areBoardsEqual(g.rotateBoard(b), w)).toBe(false)
})

it('knows when there is a possible line', () => {
    e(g.hasPossibleLineIn(2, [1, 1, 2, 1, 2, null, null, 2, null])).toBe(true)
    e(g.hasPossibleLineIn(2, [1, null, 2, 1, 2, null, 1, 2, null], false)).toEqual([7, 8])

})
it('knows when a line can be completed', () => {
    e(g.isAbleToWin(2, [1, 1, 2, 1, 2, null, null, 2, null])).toBe(true)
    e(g.isAbleToWin(2, [null, 1, 2, 1, 2, null, 1, 2, null])).toBe(false)
    e(g.isAbleToWin(2, [1, 1, 2, 1, 2, null, null, 2, null], false)).toEqual([7, 6])
})
it('knows when a line can be blocked', () => {

    e(g.isAbleToBlock(1, [1, 1, 2, 1, 2, null, null, 2, null])).toBe(true)
    e(g.isAbleToBlock(1, [1, 1, 2, 1, 2, null, null, 2, null], false)).toEqual([3, 6])
})

it('knows how to just move anywhere', () => {
    e(g.justMoveAnywhere(1, [2, 2, 1, 2, 1, 2, null, 2, 1])).toEqual([4, 6])
})

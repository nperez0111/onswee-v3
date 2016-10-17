import Utils from './Utils.js';
const g = Utils;
const e = expect;
const b = [1, null, 2, 1, 2, null, 2, 1, null];
const w = [1, 2, null, 2, 1, null, null, 2, 1];
it('has the retres function', () => {
    e(Utils.retRes([1, 2, 3], val => val === 2 && val + 3)).toBe(5)
    e(Utils.retRes([1, 2, 3], val => val === 'nonexistent', "default")).toBe("default")
})
it('knows when the other player is going to win', () => {
        e(Utils.isWinInForOtherPlayer(2, w)).toBe(true)
        e(Utils.isWinInForOtherPlayer(1, w)).toBe(false)
    })
    /*
    it('knows how to rotate a board', () => {
        e(Utils.rotateBoard(b)).toEqual([2, 1, 1, "undefined", 2, "undefined", null, null, 2])
    })
    */

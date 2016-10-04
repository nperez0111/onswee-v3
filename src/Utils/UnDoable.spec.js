import UnDoable from './UnDoable.js';
const e = expect;
const u = UnDoable;
it('returns an object', () => {
    e(u(1)).toBeTruthy()
})
it('knows the current state', () => {
    e(u(1).getState()).toBe(1)
})
it('knows how to set a new state', () => {
    e(u(1).setState(2).getState()).toBe(2)
    e(u(1).setState(2).getState()).not.toBe(1)
})
it('knows how to undo a state', () => {
    e(u(1).setState(2).undo().getState()).toBe(1)
    e(u(1).setState(2).getState()).toBe(2)
})
it('knows how to redo a state', () => {
    e(u(1).setState(2).undo().redo().getState()).toBe(2)
})
it('knows when it is unavailable to undo', () => {
    e(u(1).undo()).toBe(false)
})
it('knows when it is unavailable to redo', () => {
    e(u(1).redo()).toBe(false)
})
it('stores history', () => {
    e(u(1).setState(2).getHistory()).toEqual([1])
    e(u(1).setState(2).setState(3).undo().redo().undo().getHistory()).toEqual([1])
})
it('knows how to undo multiple times over', () => {
    e(u(1).setState(2).setState(3).setState(4).revert(1).getState()).toBe(3)
    e(u(1).setState(2).setState(3).setState(4).revert(2).getState()).toBe(2)
    e(u(1).setState(2).setState(3).setState(4).revert(3).getState()).toBe(1)
    e(u(1).setState(2).setState(3).setState(4).revert(4)).toBe(false)
    e(u(1).setState(2).setState(3).setState(4).revert(0)).toBe(false)
})
it('knows how to go back and forth', () => {
    e(u(1).setState(2).undo().redo().getState()).toBe(2)
})

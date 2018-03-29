import UnDoable from './UnDoable.js';
const e = expect;
const u = UnDoable.new;
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
    e(u(1).setState(2).setState(3).undo().undo().getState()).toBe(1)
})
it('knows how to redo a state', () => {
    e(u(1).setState(2).undo().redo().getState()).toBe(2)
    e(u(1).setState(2).setState(3).undo().undo().redo().getState()).toBe(2)
    e(u(1).setState(2).setState(3).setState(4).undo().undo().redo().undo().redo().getState()).toBe(3)
})
it('stores history', () => {
    e(u(1).setState(2).getHistory()).toEqual([1])
    e(u(1).setState(2).setState(3).undo().redo().undo().getHistory()).toEqual([1])
})
it('knows how to undo multiple times over', () => {
    e(u(1).setState(2).setState(3).setState(4).revert(1).getState()).toBe(3)
    e(u(1).setState(2).setState(3).setState(4).revert(2).getState()).toBe(2)
    e(u(1).setState(2).setState(3).setState(4).revert(3).getState()).toBe(1)
    e(u(1).setState(2).setState(3).setState(4).revert(4).getState()).toBe(1)
    e(u(1).setState(2).setState(3).setState(4).revert(0)).toEqual(u(1).setState(2).setState(3).setState(4))
})
it('knows how to go back and forth', () => {
    e(u(1).setState(2).undo().redo().getState()).toBe(2)
})
it('allows clearing of history', () => {
    e(u(1).setState(2).clearHistory().getHistory()).toEqual([])
})
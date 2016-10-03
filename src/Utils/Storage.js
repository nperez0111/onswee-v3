import LocalStorage from './LocalStorage.js';

export default class Storage {
    constructor(reducer, state = {}) {
        this.state = state
        this.reducer = reducer
        this.subscribers = {}
    }
    static log(time, func = b => b, label = '') {
        return a => { console.log(`%c${label} State ${time}: %c${JSON.stringify(func(a), null, '\t')}`, "color:lightgreen", "color:inherit") }
    }
    static newStorage(reducer, state) {
        return new Storage(reducer, state)
    }
    saveCurState(prefix) {
        Storage.saveState(prefix, this.state)
    }
    loadStateIntoNewStorage(prefix, reducer) {
        return Storage.newStorage(reducer, Storage.loadState(prefix) || undefined)
    }
    static saveState(prefix, state) {
        LocalStorage.setObj(`${prefix}-state`, state)
    }
    static loadState(prefix) {
        return LocalStorage.getObj(`${prefix}-state`)
    }
    getState() {
        return this.state
    }
    dispatch(actionList) {
        const takeTwo = (fn) => {
            return (a, b) => {
                return fn(a, b)
            }
        }
        const actions = Array.isArray(actionList) ? actionList : [actionList]

        this.fireWith('willChange', this.state)
        this.state = actions.reduce(takeTwo(this.reducer), this.state)
        this.fireWith('hasChanged', this.state)
        return this
    }
    on(ev, func) {
        if (!(ev in this.subscribers)) {
            this.subscribers[ev] = []
        }

        this.subscribers[ev] = [...this.subscribers[ev], func]

    }
    fireWith(ev, data) {
        if (ev in this.subscribers) {
            return this.subscribers[ev].map((func) => {
                return func.call(this, data)
            })
        }
    }
    fire(ev) {
        return this.fireWith.call(this, ev, this)
    }
}

import LocalStorage from '../Utils/LocalStorage.js';

export default class Storage {
    constructor(reducer, state = {}) {
        this.state = state
        this.reducer = reducer
        this.subscribers = {}
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

        this.fireSpecific('willChange', this.state)
        this.state = actions.reduce(takeTwo(this.reducer), this.state)
        this.fireSpecific('hasChanged', this.state)
    }
    on(ev, func) {
        if (!(ev in this.subscribers)) {
            this.subscribers[ev] = []
        }

        this.subscribers[ev].push(func)

    }
    fireSpecific(ev, data) {
        if (ev in this.subscribers) {
            return this.subscribers[ev].map((func) => {
                return func.call(this, data)
            })
        }
    }
    fire(ev) {
        return this.fireSpecific(ev, this)
    }
}

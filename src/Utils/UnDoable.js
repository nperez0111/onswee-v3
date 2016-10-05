export default class UnDoable {
    constructor(initState, hist = [], future = []) {
        this.present = initState
        this.history = hist || []
        this.future = future || []
    }
    static new(init, history, future) {
        return new UnDoable(init, history, future)
    }
    getState() {
        return this.present
    }
    getHistory() {
        return this.history
    }
    getFuture() {
        return this.future
    }
    clearHistory() {
        this.history = []
        this.future = []
        return this
    }
    undo() {
        if (this.history.length === 0) {
            return this
        }
        const history = this.history.slice(0)
        const newState = history.pop()
        const future = this.future.concat(this.present)
        const present = newState
        return UnDoable.new(present, history, future)
    }
    redo() {
        if (this.future.length === 0) {
            return this
        }
        const future = this.future.slice(0)
        const oldState = future.pop()
        const history = this.history.concat(this.present)
        const present = oldState
        return UnDoable.new(present, history, future)
    }
    revert(howManyTimes) {
        if (howManyTimes < 1) {
            return this
        }

        return (new Array(howManyTimes - 1)).fill(false).reduce(prev => prev.undo(), this.undo())
    }
    setState(newState) {
        this.history.push(this.present)
        this.present = newState
        this.future = []
        return this
    }
    static toObj(state) {
        return { init: state.getState(), history: state.getHistory() }
    }
}

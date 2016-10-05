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
        return this.history.slice(0)
    }
    getFuture() {
        return this.future.slice(0)
    }
    addToHistory() {
        return this.getHistory().concat(this.getState())
    }
    addToFuture() {
        return this.getFuture().concat(this.getState())
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
        const history = this.getHistory()
        const present = history.pop()
        const future = this.addToFuture()
        return UnDoable.new(present, history, future)
    }
    redo() {
        if (this.future.length === 0) {
            return this
        }
        const future = this.getFuture()
        const present = future.pop()
        const history = this.addToHistory()
        return UnDoable.new(present, history, future)
    }
    revert(howManyTimes) {
        if (howManyTimes < 1) {
            return this
        }

        return (new Array(howManyTimes - 1)).fill(false).reduce(prev => prev.undo(), this.undo())
    }
    setState(newState) {
        return UnDoable.new(newState, this.addToHistory(), [])
    }
    static toObj(state) {
        return { init: state.getState(), history: state.getHistory() }
    }
}

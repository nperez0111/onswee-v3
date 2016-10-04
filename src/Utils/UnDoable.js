export default class UnDoable {
    constructor(initState, hist) {
        this.present = initState
        this.history = hist || []
        this.future = []
    }
    static new(init, history) {
        return new UnDoable(init, history)
    }
    getState() {
        return this.present
    }
    getHistory() {
        return this.history
    }
    undo() {
        if (this.history.length === 0) {
            return false
        }
        const newState = this.history.pop()
        this.future.push(this.present)
        this.present = newState
        return this
    }
    redo() {
        if (this.future.length === 0) {
            return false
        }
        const oldState = this.future.pop()
        this.history.push(this.present)
        this.present = oldState
        return this
    }
    revert(howManyTimes) {
        if (howManyTimes < 1) {
            return false
        }
        for (let i = 0; i < howManyTimes - 1; i++) {
            this.undo()
        }
        return this.undo()
    }
    setState(newState) {
        this.history.push(this.present)
        this.present = newState
        this.future = []
        return this
    }
    static toState(state) {
        return { init: state.getState(), history: state.getHistory() }
    }
}

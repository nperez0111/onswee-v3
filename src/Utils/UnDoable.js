class UnDoable {
    constructor(initState) {
        this.present = initState
        this.history = []
        this.future = []

    }
    getState() {
        return this.present
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
        const oldState = this.future.shift()
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
}
export default (toUndo) => {
    return new UnDoable(toUndo)
}

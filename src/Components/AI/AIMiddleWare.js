import AI from './'

const sleep = function(duration) {
    return function(...args) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve(...args)
            }, duration)
        })
    }
}

export default function WinMiddleWare() {
    const action = this.state.store.getState().game.getState()
    const { board, turn } = this.state.store.getState().game.getState()
    if ('emit' in action) {
        switch (action.emit) {
            case 'ai_move':
                {
                    /*
                    const [fro, to] = AI.pickBestMove(2, board, turn)
                    this.dispatchGame(AI.makeAIState(2, fro, to, action.emit))
                    */
                    const that = this
                    Promise.resolve(AI.pickBestMove(2, board, turn))
                    .then(sleep(1000))
                    .then([fro, to] => that.dispatchGame(AI.makeAIState(2, fro, to, action.emit)))

                    break
                }
            default:
                {
                    console.warn("unhandled event")
                }
        }
    }
}

export default function WinMiddleWare() {
    const action = this.state.store.getState().game.getState()
    if ('emit' in action) {
        switch (action.emit) {
            case 'win':
                {
                    alert(`Player ${action.who} won!`)
                    break
                }
            default:
                {
                    console.warn("unhandled event")
                }
        }
    }
}

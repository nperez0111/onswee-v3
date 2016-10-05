import UnDoable from '../../Utils/UnDoable.js'
import Logic from './Logic.js'
import LocalStorage from '../../Utils/LocalStorage.js'
const hydrate = (obj) => {
    return {...obj, game: UnDoable.new(obj.game.present, obj.game.history, obj.game.future) }
}
const obj = {
        select: {
            selected: null
        },
        names: {
            player1: "Player 1",
            player2: "Player 2"
        },
        game: {
            present: Logic.getInitialState()
        }
    }
    //load from localstorage here
export default hydrate(LocalStorage.getObjWithDefault('game', obj))

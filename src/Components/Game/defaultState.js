import UnDoable from '../../Utils/UnDoable.js'
import Logic from './Logic.js'
const obj = {
        select: {
            selected: null
        },
        names: {
            player1: "Player A",
            player2: "Player B"
        },
        game: UnDoable.new(Logic.getInitialState())
    }
    //load from localstorage here
export default obj

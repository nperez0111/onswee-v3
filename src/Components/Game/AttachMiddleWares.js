import onWin from './WinMiddleWare.js';
import SelectMiddleWare from '../Select/MiddleWare.js';
import Storage from '../../Utils/Storage.js';
import LocalStorage from '../../Utils/LocalStorage.js';

export default function(store) {


    store.subscribe(() => {
        const state = this.state.store.getState()
        Storage.log('After')(state)

        onWin.call(this, state.game.getState())

        SelectMiddleWare.call(this, state.select)

        LocalStorage.setObj('game', state)
    })

}

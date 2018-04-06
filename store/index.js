import Logic from '../src/Game/Logic'
const getPlayer = which => which === Logic.Constants.player1 ? 'firstPlayer' : which === Logic.Constants.player2 ? 'secondPlayer' : (new Error("Wrong number to get player with"));
export const state = () => ({
    firstPlayer: {
        name: 'First Player',
        wins: 0
    },
    secondPlayer: {
        name: 'Second Player',
        wins: 0
    },
    game: Logic.getInitialState(),
    ai: false
})

export const mutations = {
    setName(state, { which, name }) {
        state[getPlayer(which)].name = name
    },
    addWin(state, which) {
        state[getPlayer(which)].wins++
    },
    addToBoard(state, index) {
        state.game.board = Logic.add(this.getters.getPlayer, state.game.board, index)
    },
    moveFromTo(state, { from, to }) {
        state.game.board = Logic.moveFromTo(this.getters.getPlayer, state.game.board, from, to)
    },
    moveFromToWithRules(state, { from, to }) {
        state.game.board = Logic.moveFromToWithRules(this.getters.getPlayer, state.game.board, from, to)
    },
    setGame(state, to) {
        state.game = to
    },
    incrementTurn(state) {
        state.game.turn++
    },
    setAI(state, to) {
        state.ai = to
    }
}

export const getters = {
    getPlayer(state) {
        return Logic.isPlayersTurn(Logic.Constants.player1, state.game.turn) ? Logic.Constants.player1 : Logic.Constants.player2
    }
}
export const actions = {
    updateName({ commit }, { which, name }) {
        commit('setName', { which, name })
    },
    updateWin({ commit }, { which }) {
        commit('addWin', which)
    },
    add({ commit }, index) {
        commit('addToBoard', index)
        commit('incrementTurn')
        if (state.ai) {
            dispatch('aiTurn')
        }
    },
    moveFromTo({ commit, getters, state, dispatch }, payload) {
        commit('moveFromTo', payload)
        if (Logic.isWinIn(getters.getPlayer, state.game.board)) {
            commit('addWin', getters.getPlayer)
            dispatch('reset')
        } else {
            commit('incrementTurn')
        }

        if (state.ai) {
            dispatch('aiTurn')
        }
    },
    moveFromToWithRules({ commit }, payload) {
        commit('moveFromToWithRules', payload)
        commit('incrementTurn')
        if (state.ai) {
            dispatch('aiTurn')
        }
    },
    reset({ commit }) {
        commit('setGame', Logic.getInitialState())
    },
    aiTurn({ commit, state, dispatch }) {
        console.log('Attempted AI turn when no AI present')
        //commit('incrementTurn')
    }
}
import Logic from '../src/Game/Logic'
import AI from '../src/ML/AI';
const ai = new AI(),
    delay = time => new Promise((resolve) => setTimeout(resolve, time)),
    AI_DELAY = () => delay(900),
    getPlayer = which => which === Logic.Constants.player1 ? 'firstPlayer' : which === Logic.Constants.player2 ? 'secondPlayer' : (new Error("Wrong number to get player with"));
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
    ai: {
        state: 'active',
        animating: false
    }
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
    setAI(state, key, value) {
        if (value === undefined) {
            value = key
            key = 'state'
        }
        state.ai = { ...state.ai, [key]: value }
    }
}

export const getters = {
    getPlayer(state) {
        return Logic.isPlayersTurn(Logic.Constants.player1, state.game.turn) ? Logic.Constants.player1 : Logic.Constants.player2
    },
    isActiveAI(state) {
        return state.ai.state === 'active'
    },
    gameStarted(state) {
        return state.turns > 2
    }
}
export const actions = {
    updateName({ commit }, { which, name }) {
        commit('setName', { which, name })
    },
    updateWin({ commit }, { which }) {
        commit('addWin', which)
    },
    add({ commit, state, dispatch, getters }, { index, aiTurn }) {
        commit('addToBoard', index)
        commit('incrementTurn')
        if (getters.isActiveAI && !aiTurn) {
            dispatch('aiTurn')
        }
    },
    moveFromTo({ commit, getters, state, dispatch }, payload) {
        commit('moveFromTo', payload)
        if (Logic.isWinIn(getters.getPlayer, state.game.board)) {
            commit('addWin', getters.getPlayer)
            dispatch('reset')
            return
        } else {
            commit('incrementTurn')
        }

        if (getters.isActiveAI && !payload.aiTurn) {
            dispatch('aiTurn')
        }
    },
    moveFromToWithRules({ commit, state, dispatch, getters }, payload) {
        commit('moveFromToWithRules', payload)
        commit('incrementTurn')
        if (getters.isActiveAI && !payload.aiTurn) {
            dispatch('aiTurn')
        }
    },
    reset({ commit }) {
        commit('setGame', Logic.getInitialState())
    },
    aiTurn({ commit, state, dispatch, getters }) {
        return new Promise((resolve, reject) => {
            console.group("AI Turn:")
            const turn = state.game.turn,
                board = state.game.board,
                [fro, to] = AI.decideMoveToTake(getters.getPlayer, board, turn)
            console.log("From:", fro, "To:", to)
            if (fro === false && to === false) {
                AI_DELAY().then(() => commit('setAI', 'error')).then(reject)
                console.groupEnd("AI Turn:")
                return
            }
            if (Logic.isPlacingRound(turn)) {
                AI_DELAY().then(() => dispatch('add', { index: to, aiTurn: true })).then(resolve)
            } else if (Logic.isExtraRulesRound(turn)) {
                AI_DELAY().then(() => dispatch('moveFromToWithRules', { from: fro, to: to, aiTurn: true })).then(resolve)
            } else {
                AI_DELAY().then(() => dispatch('moveFromTo', { from: fro, to: to, aiTurn: true })).then(resolve)
            }
            console.groupEnd("AI Turn:")
        })
    },
    setAIState({ commit, state, dispatch, getters }, currentState) {
        commit('setAI', currentState)
        if (currentState === 'error') {
            commit('addWin', getters.getPlayer)
            dispatch('reset')
            return
        }
        if (getters.gameStarted) {
            dispatch('reset')
        }
    }
}
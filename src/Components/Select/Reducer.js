export default function SelectReducer(state = {
    selected: null
}, action) {

    switch (action.type) {
        case 'select':

            if (state.selected !== action.selected) {

                return { selected: action.selected }

            } else {

                return SelectReducer(state, { type: 'deselect' })

            }

        case 'deselect':

            return { selected: null }
        case 'move':
        case 'restricted_move':
            return { update: { fro: state.selected, to: action.selected, type: action.type }, emit: action.type }
        case 'put':
            return { put: action.selected, emit: action.type }
        default:
            return state
    }

}

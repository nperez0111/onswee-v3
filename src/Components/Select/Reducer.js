export default function SelectReducer(state, action) {

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
            return { update: { fro: state.selected, to: action.selected, type: action.type }, type: action.type }
        case 'put':
            return { put: action.selected, type: action.type }
            /*case 'restricted_move':
                return {}*/
        default:
            return state
    }

}

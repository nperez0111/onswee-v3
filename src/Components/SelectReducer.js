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
            return { update: { fro: state.selected, to: action.selected } }


        default:
            return state
    }

}

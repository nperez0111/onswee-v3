export default function SelectReducer(state, action) {

    switch (action.type) {
        case 'select':

            if (state.selected !== action.selected) {

                return {...state, selected: action.selected }

            } else {

                return SelectReducer(state, { type: 'deselect' })

            }

        case 'deselect':

            return {...state, selected: null }

        default:
            return state
    }

}

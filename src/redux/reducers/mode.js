import {MODE_EDIT} from '../actions/mode'

const initialState = MODE_EDIT

export default (state = initialState, action) => {
    switch (action.type) {
        case 'MODE_SET':
            return action.payload
        default:
            return state
    }
}
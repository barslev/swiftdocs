import Immutable from 'seamless-immutable'
import { createActions, createReducer } from 'reduxsauce'

const INITIAL_STATE = Immutable({title: ''})

const { Types, Creators } = createActions({
    titleChange: ['title'],
})

export const SessionReduxTypes = Types
export default Creators

export const reducer = createReducer(INITIAL_STATE, {
    
    [Types.TITLE_CHANGE]: (state, action) => state.merge({
        title: action.title
    }),
})
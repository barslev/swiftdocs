import Immutable from 'seamless-immutable'
import { createActions, createReducer } from 'reduxsauce'
import { ContentsReduxTypes } from './contents';

const INITIAL_STATE = Immutable({
    // No elements, no styles...
})

const { Types, Creators } = createActions({
    styleSet: ['id', 'style'],
    styleUpdate: ['id', 'prop', 'value'],
})

export const SessionReduxTypes = Types
export default Creators

export const reducer = createReducer(INITIAL_STATE, {
    
    [Types.STYLE_SET]: (state, action) => state.merge({
        [action.id]: action.style
    }),
    
    [Types.STYLE_UPDATE]: (state, action) => state.setIn(
        action.id + '.' + action.prop, action.value
    ),

    [ContentsReduxTypes.CONTENT_REMOVE]: (state, action) => state.without(action.id),

    [ContentsReduxTypes.CONTENT_INSERT]: (state, action) => state.merge({
        [action.content.id]: {}
    }),
})
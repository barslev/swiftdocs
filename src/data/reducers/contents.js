import Immutable from 'seamless-immutable'
import { createActions, createReducer } from 'reduxsauce'

const INITIAL_STATE = Immutable([
    {id: 'first_page', element: 'page', container_id:null}
])

const { Types, Creators } = createActions({

    contentRemove: ['id'],
    contentInsert: ['index', 'content'],
    contentUpdateState: ['id', 'state'],
    contentMove: ['oldIndex', 'newIndex', 'content'],

})

export const ContentsReduxTypes = Types
export default Creators

export const reducer = createReducer(INITIAL_STATE, {

    [Types.CONTENT_REMOVE]: (state, action) => state.filter(
        content => content.id !== action.id
    ),

    [Types.CONTENT_INSERT]: (state, action) => {
        let contents = state.asMutable()
        contents.splice(action.index, 0, action.content)
        return Immutable(contents)
    },

    [Types.CONTENT_MOVE]: (state, action) => {
        let contents = state.asMutable()
        contents.splice(action.oldIndex, 1)
        contents.splice(action.newIndex, 0, action.content)
        return Immutable(contents)
    },

    [Types.CONTENT_UPDATE_STATE]: (state, action) => state.map(content => {
        if (content.id === action.id) {
            return content.merge({
                state: action.state
            })
        }
    }),

})
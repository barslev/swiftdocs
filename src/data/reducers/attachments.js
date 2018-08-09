import Immutable from 'seamless-immutable'
import { createActions, createReducer } from 'reduxsauce'

const INITIAL_STATE = Immutable({
    // No attachments
})

const { Types, Creators } = createActions({
    attachmentRemove: ['id'],
    attachmentAdd: ['id', 'data'],
    attachmentMarkUploaded: ['id'],
})

export const AttachmentsReduxTypes = Types
export default Creators

export const reducer = createReducer(INITIAL_STATE, {
    [Types.ATTACHMENT_ADD]: (state, action) => state.merge({
        [action.id]: {
            uploaded: false,
            data: action.data,
        }
    }),
    [Types.ATTACHMENT_REMOVE]: (state, action) => state.without(action.id),
    [Types.ATTACHMENT_MARK_UPLOADED]: (state, action) => state.setIn(action.id + '.uploaded', true)
})
import Immutable from 'seamless-immutable'
import { createActions, createReducer } from 'reduxsauce'

const INITIAL_STATE = Immutable({
    data: null,
    loading: true,
    lastError: null,
})

const { Types, Creators } = createActions({
    dataStartLoading: null,
    dataReceived: ['data'],
    dataFailedLoading: ['error'],
})

export const DataReduxTypes = Types
export default Creators

export const reducer = createReducer(INITIAL_STATE, {
    [Types.DATA_RECEIVED]: (state, action) => state.merge({
        loading: false,
        data: action.data,
    }),
    [Types.DATA_START_LOADING]: state => state.merge({loading: true}),
    [Types.DATA_FAILED_LOADING]: (state, action) => state.merge({
        loading: false,
        lastError: action.error,
    }),
})
import Immutable from 'seamless-immutable'
import { createActions, createReducer } from 'reduxsauce'

const INITIAL_STATE = Immutable({
	version: '0.5.0',
	margins: {
		top: 25,
		left: 25,
		right: 25,
		bottom: 25
	},
	// Default page dimensions in mm
	dimensions: {
		width: 210,
		height: 297
	},
	// Default page background color
	color: '#ffffff',
	languages: [
		'en'
	],
})

const { Types, Creators } = createActions({
    defaultsUpdate: ['defaults'],
})

export const DefaultsReduxTypes = Types
export default Creators

export const reducer = createReducer(INITIAL_STATE, {
	[Types.DEFAULTS_UPDATE]: (state, action) => state.merge(action.defaults)
})
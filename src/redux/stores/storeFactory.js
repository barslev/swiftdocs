import Vue from 'vue'
import {createStore} from 'redux'
import reducers from '../reducers'

export default function (state) {
	if (!state) {
		state = undefined
	}
	return createStore(reducers, state)
}
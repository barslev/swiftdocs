import Vue from 'vue'
import {createStore} from 'redux'
import reducers from '../reducers'

export default function (state) {
	if (state === null) {
		state = undefined
	}
	return createStore(reducers, state)
}
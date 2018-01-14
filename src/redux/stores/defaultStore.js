import Vue from 'vue'
import Revue from 'revue'	
import {createStore, combineReducers} from 'redux'

import mode from '../reducers/mode'
import title from '../reducers/title'
import pages from '../reducers/pages'
import styles from '../reducers/styles'
import contents from '../reducers/contents'
import defaults from '../reducers/defaults'

// create a redux store
const reduxStore = createStore(combineReducers({
	mode,
	title,
	pages,
	styles,
	contents,
	defaults,
}))
// binding the store to Vue instance, actions are optional
const store = new Revue(Vue, reduxStore)
// expose the store for your component to use
export default store
import { combineReducers } from 'redux'

import mode from './mode'
import title from './title'
import pages from './pages'
import styles from './styles'
import contents from './contents'
import defaults from './defaults'

export default combineReducers({
    mode,
    title,
    pages,
    styles,
    contents,
    defaults,
})
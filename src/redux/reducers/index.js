import { combineReducers } from 'redux'

import title from './title'
import pages from './pages'
import styles from './styles'
import session from './session'
import contents from './contents'
import defaults from './defaults'

export default combineReducers({
    title,
    pages,
    styles,
    session,
    contents,
    defaults,
})
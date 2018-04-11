import { combineReducers } from 'redux';

import data from './data'
import title from './title'
import styles from './styles'
import session from './session'
import contents from './contents'
import defaults from './defaults'
import attachments from './attachments'

export default combineReducers({
    data,
    title,
    styles,
    session,
    contents,
    defaults,
    attachments,    
})
import {combineReducers} from 'redux'

export default combineReducers({
    data: require('./data').reducer,
    title: require('./title').reducer,
    styles: require('./styles').reducer,
    session: require('./session').reducer,
    contents: require('./contents').reducer,
    defaults: require('./defaults').reducer,
    attachments: require('./attachments').reducer,
    // Add more reducers...
})
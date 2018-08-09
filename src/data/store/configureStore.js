import { createStore } from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'

/**
 * Reducers...
 */
import rootReducer from '../reducers'

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [
        'data',
        'session',
        'defaults',
        'contents',
    ],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
    let store = createStore(persistedReducer)
    let persistor = persistStore(store)

    if (module.hot) {
        module.hot.accept(() => {
            const nextRootReducer = require('../reducers')
            store.replaceReducer(
                persistedReducer(persistConfig, nextRootReducer)
            )
        })
    }

    return {store, persistor}
}
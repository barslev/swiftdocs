import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import configureStore from './data/store/configureStore'
import Document from './document/Document'

const store = configureStore()

class App extends Component {
  render() {
    return <Provider store={store.store}>
      <PersistGate loading={null} persistor={store.persistor}>
        <div className="App">
          <Document></Document>
        </div>
      </PersistGate>
    </Provider>
  }
}

export default App;

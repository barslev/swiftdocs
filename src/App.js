import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import configureStore from './data/store/configureStore'

import TopMenu from './ui/menus/TopMenu'
import Document from './document/Document'

import './styles/app.scss'

const store = configureStore()

class App extends Component {
  render() {
    return <Provider store={store.store}>
      <PersistGate loading={null} persistor={store.persistor}>
        <div className="App">
          <TopMenu />
          <Document></Document>
        </div>
      </PersistGate>
    </Provider>
  }
}

export default App;

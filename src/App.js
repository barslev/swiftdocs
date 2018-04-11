import React, { Component } from 'react'
import { Provider } from 'react-redux'

import store from './store'
import Document from './document/Document'

class App extends Component {
  render() {
    return <Provider store={store}>
      <div className="App">
        <Document></Document>
      </div>
    </Provider>
  }
}

export default App;

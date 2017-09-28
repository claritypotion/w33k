import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import App from './containers/App'

window.React = React
const store = createStore(reducer)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>, document.getElementById('root'))
})

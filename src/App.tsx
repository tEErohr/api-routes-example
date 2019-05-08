import React from 'react'
import { Provider } from 'react-redux'

import logo from './logo.svg'
import './App.css'
import { configureStore } from './store/configureStore'
import StatusComponent from './components/status/StatusComponent'

const store = configureStore()

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className='App'>
        <StatusComponent />
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
            Learn React2
          </a>
        </header>
      </div>
    </Provider>
  )
}

export default App

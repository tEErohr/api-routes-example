import React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router' // react-router v4/v5
import { ConnectedRouter } from 'connected-react-router'

import logo from './logo.svg'
import './App.css'
import { configureStore } from './store/configureStore'
import StatusComponent from './components/status/StatusComponent'
import { history } from './store/history'
import Link from './routing/components/Link'

const store = configureStore()

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Route path='/'>
          <div className='App'>
            <header data-section='app-header'>
              <StatusComponent />
              <Switch>
                <Route exact path='/:slug'>
                  {data => JSON.stringify(data, null, '  ')}
                </Route>
              </Switch>
            </header>
            <section data-section='app-body'>
              <div data-section='app-sidebar'>
                <ul>
                  <li>
                    <Link to='foo'>Go Foo</Link>
                  </li>
                  <li>
                    <Link to='bla'>Go Bla</Link>
                  </li>
                </ul>
              </div>
              <div data-section='app-content'>
                <Switch>
                  <Route path='/foo'>
                    <h3>Foo it is!</h3>
                  </Route>
                  <Route path='/:slug'>
                    {props => {
                      const { slug = 'World' } = (props.match && props.match.params) || {}
                      return <h3>{`Hello ${slug}`}</h3>
                    }}
                  </Route>
                </Switch>
              </div>
            </section>
          </div>
        </Route>
      </ConnectedRouter>
    </Provider>
  )
}

export default App

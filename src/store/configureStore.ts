import { createStore, applyMiddleware } from 'redux'
import { rootReducerFactory } from './rootReducer'
import { history } from './history'
import { routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'

const middlewareComposition = composeWithDevTools(applyMiddleware(routerMiddleware(history)))

/* tslint:disable:no-underscore-dangle */
export const configureStore = () => {
  const store = createStore(rootReducerFactory(history), middlewareComposition)
  return store
}
/* tslint:enable */

import { createStore, combineReducers } from 'redux'
import { statusRootReducer } from './status/module'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: any
  }
}

/* tslint:disable:no-underscore-dangle */
export const configureStore = () => {
  const store = createStore(
    combineReducers({
      status: statusRootReducer,
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
  return store
}
/* tslint:enable */

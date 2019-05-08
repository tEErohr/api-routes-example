import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'
import { statusRootReducer } from './status/module'
import { History } from 'history'

export const rootReducers = {
  status: statusRootReducer,
}

export const rootReducer = combineReducers(rootReducers)

export const rootReducerFactory = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    ...rootReducers,
  })

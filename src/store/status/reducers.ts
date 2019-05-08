import { combineReducers, AnyAction } from 'redux'
import { StatusState } from './interfaces'
import { isStatusMessageAction } from './typechecks'

const message = (state: StatusState['message'] = null, action: AnyAction) => {
  if (isStatusMessageAction(action)) {
    return action.message
  }
  return state
}

export const statusRootReducer = combineReducers<StatusState>({
  message,
})

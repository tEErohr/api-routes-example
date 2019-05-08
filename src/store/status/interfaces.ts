import { Action } from 'redux'
import { STATUS_MESSAGE_UPDATE } from './constants'

export interface StatusState {
  message: string | null
}

export interface StatusMessageAction extends Action<typeof STATUS_MESSAGE_UPDATE>, StatusState {}

export interface StatusActions {
  updateStatusMessage(message: string | null): StatusMessageAction
}

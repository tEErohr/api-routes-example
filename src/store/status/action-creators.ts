import { StatusMessageAction } from './interfaces'
import { STATUS_MESSAGE_UPDATE } from './constants'

export function updateStatusMessage(message: string | null): StatusMessageAction {
  return {
    type: STATUS_MESSAGE_UPDATE,
    message,
  }
}

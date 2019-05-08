import { STATUS_MESSAGE_UPDATE } from './constants'
import { StatusMessageAction } from './interfaces'

export function isStatusMessageAction(other: any): other is StatusMessageAction {
  return 'object' === typeof other && 'type' in other && other.type === STATUS_MESSAGE_UPDATE
}

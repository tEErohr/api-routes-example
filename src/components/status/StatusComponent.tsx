import * as React from 'react'
import { StatusState, actionCreators as statusActionCreators } from '../../store/status/module'
import { connect } from 'react-redux'
import { PartialState } from '../../common/types'

export type StatusProps = StatusState & typeof statusActionCreators

export class Status extends React.Component<StatusProps> {
  readonly updateMessage = () => {
    const message = `Hello, it is ${new Date()}`
    this.props.updateStatusMessage(message)
  }

  render() {
    return (
      <section>
        <header>Status</header>
        <p>{this.props.message}</p>
        <button onClick={this.updateMessage}>Update</button>
      </section>
    )
  }
}

export default connect(
  (state: PartialState<StatusState, 'status'>) => {
    const { status } = state
    return status
  },
  statusActionCreators,
)(Status)

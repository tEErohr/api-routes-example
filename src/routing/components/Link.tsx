import React, { ReactChildren, ReactNode } from 'react'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'

export interface LinkProps {
  to: string
  children?: ReactNode
  push: typeof push
}

export function createLinkHandler(props: LinkProps) {
  return function(event: React.MouseEvent) {
    event.preventDefault()
    //event.stopPropagation()
    props.push(props.to)
  }
}

export const Link: React.FC<LinkProps> = (props: LinkProps) => (
  <a href={props.to} onClick={createLinkHandler(props)}>
    {props.children}
  </a>
)

export default connect(
  null,
  { push },
)(Link)

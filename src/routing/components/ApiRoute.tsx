import * as React from 'react'
import { RouteProps, Route, RouteChildrenProps } from 'react-router'
import { isFunction } from 'util'
import { string } from 'prop-types'

export interface ApiRouteResolver<T = any> {
  (location?: RouteChildrenProps['location'], match?: RouteChildrenProps['match']): Promise<T>
}

export interface ApiRouteChildProps<T = any> extends RouteChildrenProps {
  payload: T
}

export interface ApiRouteChildFactory<T = any, E extends ApiRouteChildProps<T> = ApiRouteChildProps<T>> {
  (childProps: ApiRouteChildProps<T>): React.ReactElement<E>
}

export type ApiRouteChildren<T = any, E extends ApiRouteChildProps<T> = ApiRouteChildProps<T>> =
  | React.ReactElement<E>
  | ApiRouteChildFactory<T, E>

export interface ApiRouteProps<T = any, E extends ApiRouteChildProps<T> = ApiRouteChildProps<T>> extends RouteProps {
  children: React.ReactElement<E> | ApiRouteChildFactory<T, E>
  resolver: ApiRouteResolver<T>
}

export const resolverCache = new WeakMap<ApiRouteResolver, Map<string, any>>()
export const getResolverCache = (resolver: ApiRouteResolver): Map<string, any> => {
  let dataCache: Map<string, any> = resolverCache.get(resolver) || new Map()
  if (!resolverCache.has(resolver)) {
    console.log('Add new cache for resolver', resolver, dataCache)
    resolverCache.set(resolver, dataCache)
  }
  return dataCache
}

function useProtectedState<T>(initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const originalState = React.useState(initialValue)
  const [state, setState] = originalState
  let mounted = true
  React.useEffect(
    () => () => {
      mounted = false
    },
    [],
  )
  const setStateProtected: React.Dispatch<React.SetStateAction<T>> = (nextState: React.SetStateAction<T>) => {
    if (mounted) {
      setState(nextState)
    }
  }
  return [state, setStateProtected]
}

export const ApiRoute = (props: ApiRouteProps) => {
  const { resolver, ...routeProps } = props
  const cache = getResolverCache(resolver)
  const cacheKey = props.location && props.location.key ? props.location.key : null
  const initialData = cacheKey ? cache.get(cacheKey) : null
  const [data, setData] = useProtectedState(initialData)
  const [status, setStatus] = useProtectedState('idle')

  React.useEffect(() => {
    if (data) {
      setStatus('loaded')
    } else if (status === 'idle') {
      resolver(props.location).then(setData)
      setStatus('loading')
    }
  })

  cacheKey && data && cache.set(cacheKey, data)

  return (
    <Route {...routeProps}>
      {(childProps: RouteChildrenProps) => {
        if (!childProps.match) {
          return null
        }
        const apiChildProps: ApiRouteChildProps = { ...childProps, payload: data }

        if (React.isValidElement(routeProps.children)) {
          return React.cloneElement(routeProps.children, apiChildProps)
        }
        return routeProps.children(apiChildProps)
      }}
    </Route>
  )
}

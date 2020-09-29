import React, { useState, createElement, useCallback, useMemo } from 'react'
import { createContext, useContextSelector } from 'use-context-selector'

let keyCount = 0

const ActionsContext = createContext(null)

export function Provider({ children }) {
  const initState = new Map()
  const [state, setState] = useState(initState)
  const actions = useMemo(
    () => ({
      read: (val) => {
        const isInitRender = !state.get(val.id)
        if (isInitRender) {
          state.set(val.id, val.initState)
          return state.get(val.id)
        }
        return state.get(val.id)
      },
      write: (newStateValue, id) => {
        setState((prev) => new Map(prev.set(id, newStateValue)))
      },
    }),
    [state]
  )

  return createElement(
    ActionsContext.Provider,
    { value: { actions } },
    children
  )
}

export function fire(initState) {
  return { id: ++keyCount, initState }
}

export function useFire(fire) {
  const actionsContext = useContextSelector(
    ActionsContext,
    useCallback(
      ({ actions }) => {
        const state = actions.read(fire)
        return { state, ...actions, id: fire.id }
      },
      [fire]
    )
  )

  const setFire = useCallback(
    (newStateValue) => {
      if (typeof newStateValue === 'function') {
        const prevState = actionsContext.state
        return actionsContext.write(newStateValue(prevState), actionsContext.id)
      }
      return actionsContext.write(newStateValue, actionsContext.id)
    },
    [actionsContext]
  )

  return [actionsContext.state, setFire]
}

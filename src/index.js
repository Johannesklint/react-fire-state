import React, { useState, createElement, useCallback, useMemo } from 'react'
import { createContext, useContextSelector } from 'use-context-selector'

let idCount = 0

const ActionsContext = createContext(null)

export function Provider({ children }) {
  const initState = new Map()
  const [state, setState] = useState(initState)
  const actions = useMemo(
    () => ({
      read: (val) => {
        const initRender = !state.get(val.id)
        if (initRender) {
          state.set(val.id, val.initState)
          return state.get(val.id)
        }
        return state.get(val.id)
      },
      write: (val, id) => {
        setState((prev) => new Map(prev.set(id, val)))
      },
    }),
    [state]
  )
  return createElement(
    ActionsContext.Provider,
    { value: { actions, state } },
    children
  )
}

export function fire(initState) {
  return { id: ++idCount, initState }
}

export function useFire(fire) {
  const actionsContext = useContextSelector(
    ActionsContext,
    useCallback(
      ({ actions, state }) => {
        const prevStateOrInitState = actions.read(fire)
        return { prevStateOrInitState, ...actions, ...state, id: fire.id }
      },
      [fire]
    )
  )

  const setFire = useCallback(
    (updateState) => {
      if (typeof updateState === 'function') {
        return actionsContext.write(
          updateState(actionsContext.prevStateOrInitState),
          actionsContext.id
        )
      }
      return actionsContext.write(updateState, actionsContext.id)
    },
    [actionsContext]
  )
  const state = actionsContext.prevStateOrInitState
  return [state, setFire]
}

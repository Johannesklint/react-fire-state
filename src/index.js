import React, { useState, createElement, useCallback, useMemo } from 'react'
import { createContext, useContextSelector } from 'use-context-selector'

let idCount = -1

const ActionsContext = createContext(null)

export function Provider({ children }) {
  const initState = new Map()
  const [state, setState] = useState(initState)
  const actions = useMemo(
    () => ({
      read: (value) => {
        const isInitRender = !state.get(value.id)
        if (isInitRender) {
          const name = value.name ? value.name : convertNumberToLetter(value.id)
          const newState = { value: value.initState, name }
          state.set(value.id, newState)

          return state.get(value.id)
        }
        return state.get(value.id)
      },
      write: (newStateValue, id) => {
        setState((prev) => new Map(prev.set(id, newStateValue)))
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

function convertNumberToLetter(s) {
  return String.fromCharCode(97 + s)
}

export function fire(initState, name) {
  return { id: ++idCount, initState, name }
}

export function useFire(fire) {
  const actionsContext = useContextSelector(
    ActionsContext,
    useCallback(
      ({ actions }) => {
        const state = actions.read(fire)
        return { state, ...actions, ...fire }
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

function convertMapToObject(map) {
  return Array.from(map).reduce((acc, [key, value]) => {
    return { ...acc, [value.name]: value.value }
  }, {})
}

export function useAllFires() {
  return useContextSelector(
    ActionsContext,
    useCallback(({ state }) => {
      return convertMapToObject(state)
    }, [])
  )
}

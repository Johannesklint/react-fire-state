import React, { useState, createElement, useCallback, useMemo } from 'react'
import { createContext, useContextSelector } from 'use-context-selector'

let keyCount = 0 // global key count for all fire's

const ActionsContext = createContext(null)
const StateContext = createContext(null)

export function Provider({ children }) {
  const initState = new Map()
  const [state, setState] = useState(initState)
  const actions = useMemo(
    () => ({
      read: (val) => {
        const initRender = !state.get(val.id)
        if (initRender) {
          state.set(val.id, val.init)
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
    { value: actions },
    createElement(StateContext.Provider, { value: state }, children)
  )
}

export function fire(read, write) {
  const config = {
    id: ++keyCount,
  }
  if (typeof read === 'function') {
    config.read = read
  } else {
    config.init = read
    config.read = (get) => {
      return get(config)
    }
    config.write = (get, set, update) => {
      set(config, typeof update === 'function' ? update(get(config)) : update)
    }
  }
  if (write) {
    config.write = write
  }

  return config
}

export function useFire(fire) {
  const value = useContextSelector(
    ActionsContext,
    useCallback(
      (state) => {
        const initState = state.read(fire)
        return { initState, ...state, id: fire.id }
      },
      [fire]
    )
  )
  const stateContext = useContextSelector(StateContext, (x) => {
    if (x.has(value.id)) {
      return value.initState
    }
    return x
  })

  const setFire = useCallback(
    (update) => {
      if (typeof update === 'function') {
        return value.write(update(stateContext), value.id)
      }
      return value.write(update, value.id)
    },
    [value, stateContext]
  )

  return [stateContext, setFire]
}

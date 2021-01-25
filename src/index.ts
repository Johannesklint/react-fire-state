import * as React from 'react'
import { createContext, useContextSelector } from 'use-context-selector'

let idCount = 0

type Actions = {
  write: Function
  read: Function
}

type State = Map<string, { id: number; name: string; value: string }>

type Context = {
  actions: Actions
  state: State
}

const ActionsContext = createContext<Context>({
  actions: {
    write: () => {},
    read: () => {},
  },
  state: new Map(),
})

export function Provider({ children }: { children: React.ReactNode }) {
  const initState = new Map()
  const [state, setState] = React.useState(initState)
  const actions = React.useMemo(
    () => ({
      read: (value: { id: number; name: string; initState: unknown }) => {
        const isInitRender = !state.get(value.id)
        if (isInitRender) {
          const name = value.name ? value.name : convertNumberToLetter(value.id)
          const newState = { value: value.initState, name }
          state.set(value.id, newState)

          return state.get(value.id)
        }
        return state.get(value.id)
      },
      write: (newStateValue: unknown, id: number, name: string) => {
        setState((prev) => {
          return new Map(
            prev.set(id, {
              value: newStateValue,
              name,
            })
          )
        })
      },
    }),
    [state]
  )

  return React.createElement(
    ActionsContext.Provider,
    { value: { actions, state } },
    children
  )
}

function convertNumberToLetter(str: number) {
  return String.fromCharCode(96 + str)
}

export function fire(initState: unknown, name: string = '') {
  return { id: ++idCount, initState, name }
}

interface IFire {
  id: number
  initState: unknown
  name: string
}

export function useFire(fire: IFire) {
  const actionsContext = useContextSelector(
    ActionsContext,
    React.useCallback(
      ({ actions }: Context) => {
        const state = actions.read(fire)
        return { state, ...actions, ...fire }
      },
      [fire]
    )
  )

  const setFire = React.useCallback(
    (newStateValue: Function | unknown) => {
      const { name } = actionsContext.state
      if (typeof newStateValue === 'function') {
        const prevState = actionsContext.state
        return actionsContext.write(
          newStateValue(prevState),
          actionsContext.id,
          name
        )
      }

      return actionsContext.write(newStateValue, actionsContext.id, name)
    },
    [actionsContext]
  )

  return [actionsContext.state, setFire]
}

function convertMapToObject(map: Map<string, { name: string; value: string }>) {
  return Array.from(map).reduce((acc, [_, value]) => {
    return { ...acc, [value.name]: value.value }
  }, {})
}

export function useAllFires() {
  return useContextSelector(
    ActionsContext,
    React.useCallback(({ state }: Context) => {
      return convertMapToObject(state)
    }, [])
  ) as any
}

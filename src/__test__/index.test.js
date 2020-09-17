import React from 'react'
import '@testing-library/jest-dom'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { TehcProvider, useTehc, TehcHoc } from '../'

describe('Tehc', () => {
  afterEach(() => {
    cleanup()
  })

  test('changing state with one argument', () => {
    function FakeComp() {
      const [state, dispatch] = useTehc()
      return (
        <div>
          <p data-testid="state">{state}</p>
          <button onClick={() => dispatch('updated state')}>
            Change state
          </button>
        </div>
      )
    }
    render(
      <TehcProvider store={{ state: 'init state' }}>
        <FakeComp />
      </TehcProvider>
    )
    expect(screen.getByTestId('state')).toHaveTextContent('init state')
    fireEvent.click(screen.getByText('Change state'))
    expect(screen.getByTestId('state')).toHaveTextContent('updated state')
  })

  test('changing state function as a argument', () => {
    function FakeComp() {
      const [state, dispatch] = useTehc()
      return (
        <div>
          <p data-testid="state">{state}</p>
          <button onClick={() => dispatch((prev) => `${prev} updated state`)}>
            Change state
          </button>
        </div>
      )
    }
    render(
      <TehcProvider store={{ state: 'init state' }}>
        <FakeComp />
      </TehcProvider>
    )
    expect(screen.getByTestId('state')).toHaveTextContent('init state')
    fireEvent.click(screen.getByText('Change state'))
    expect(screen.getByTestId('state')).toHaveTextContent(
      'init state updated state'
    )
  })

  test('with custom reducer', () => {
    function reducer(state, action) {
      switch (action.type) {
        case 'increment':
          return { count: state.count + 1 }
        case 'decrement':
          return { count: state.count - 1 }
        default:
          throw new Error()
      }
    }
    function Counter() {
      const [state, dispatch] = useTehc()
      return (
        <div>
          <p data-testid="state">{state.count}</p>
          <button onClick={() => dispatch({ type: 'increment' })}>
            increment
          </button>
          <button onClick={() => dispatch({ type: 'decrement' })}>
            decrement
          </button>
        </div>
      )
    }
    render(
      <TehcProvider store={{ state: { count: 0 }, reducer }}>
        <Counter />
      </TehcProvider>
    )
    expect(screen.getByTestId('state')).toHaveTextContent(0)
    fireEvent.click(screen.getByText('increment'))
    expect(screen.getByTestId('state')).toHaveTextContent(1)
    fireEvent.click(screen.getByText('decrement'))
    expect(screen.getByTestId('state')).toHaveTextContent(0)
  })

  test('with hoc', () => {
    const Hoc = TehcHoc(({ state, dispatch }) => {
      return (
        <div>
          <p data-testid="state">{state}</p>
          <button onClick={() => dispatch('updated state')}>
            Change state
          </button>
        </div>
      )
    })

    render(
      <TehcProvider store={{ state: 'some-state' }}>
        <Hoc />
      </TehcProvider>
    )
    expect(screen.getByTestId('state')).toHaveTextContent('some-state')
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByTestId('state')).toHaveTextContent('updated state')
  })
})

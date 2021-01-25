import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider, useFire, useAllFires, fire } from '..'

test('reading and writing to state', () => {
  const store = fire(0)
  function Reader() {
    const [state] = useFire(store)
    return <div>{state.value}</div>
  }

  function Writer() {
    const [_, setState] = useFire(store)
    return (
      <button onClick={() => setState((prev: any) => prev.value + 1)}>
        increment
      </button>
    )
  }
  render(
    <Provider>
      <Reader />
      <Writer />
    </Provider>
  )
  const incrementBtn = screen.getByText('increment')
  expect(screen.getByText('0')).toBeInTheDocument()
  fireEvent.click(incrementBtn)
  expect(screen.getByText('1')).toBeInTheDocument()
  fireEvent.click(incrementBtn)
  expect(screen.getByText('2')).toBeInTheDocument()
})

test('with names', () => {
  const store = fire('value', 'name')
  function Reader() {
    const [state] = useFire(store)
    return <div>{state.value}</div>
  }

  function Writer() {
    const [_, setState] = useFire(store)
    const allFires = useAllFires()
    return (
      <button
        onClick={() => setState((prev: any) => prev.value + ' and then some')}
      >
        {allFires.value}
      </button>
    )
  }
  render(
    <Provider>
      <Reader />
      <Writer />
    </Provider>
  )

  expect(screen.getByText('value')).toBeInTheDocument()
  expect(screen.queryByText('value and then some')).not.toBeInTheDocument()
  fireEvent.click(screen.getByRole('button'))
  expect(screen.getByText('value and then some')).toBeInTheDocument()
})

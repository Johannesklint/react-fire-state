import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider, useFire, fire } from '../'

test('reading and writing to state', () => {
  const store = fire(0)
  function Reader() {
    const [state] = useFire(store)
    return <div>{state}</div>
  }

  function Writer() {
    const [_, setState] = useFire(store)
    return (
      <button onClick={() => setState((prev) => prev + 1)}>increment</button>
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

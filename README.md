# tehc

Another state management library? - Yes, why not? Do we need this library? I think not but here you are anyway! 😁

## Installation

`npm install tehc`

## Usage

```jsx
import { TehcProvider, useTehc } from 'tehc'

// state will be 'some-state' at first render
// once clicking on the button in `Updater`
// it will be updated to 'updated-state'
function Reader() {
  const [state] = useTehc()
  return <p>{state}</p>
}

// first argument is the current state
// it will change from 'some-state' to 'update-state' on the button click
function Updater() {
  const [_, dispatch] = useTehc()
  return <button onClick={() => dispatch('updated-state')}>Update</button>
}

function App() {
  return (
    <TehcProvider store={{ state: 'some-state' }}>
      <Reader />
      <Updater />
    </TehcProvider>
  )
}
```

You have the possibility to read previous state much like `useState` callback function

```jsx
function Comp() {
  const [state, dispatch] = useTehc()
  return (
    <button
      onClick={() => {
        // read previous state
        dispatch((prev) => prev + 1)
      }
    >
      Click me!
    </button>
  )
}
```

You can also pass a custom reducer to `TehcProvider`

```jsx
import { TehcProvider, useTehc } from 'tehc'

// state.count will be 0 on first render
// clicking increment and decrement will update state.count to -1 or +1
function Counter() {
  const [state, dispatch] = useTehc(0)
  return (
    <div>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>decrement</button>
    </div>
  )
}
function App() {
  function reducer(state, action) {
    switch (action.type) {
      case 'increment':
        return { count: state.count + 1 }
      case 'decrement':
        return { count: state.count - 1 }
      default:
        throw new Error('Noo!')
    }
  }
  return (
    <TehcProvider store={{ state: { count: 0 }, reducer }}>
      <Counter />
    </TehcProvider>
  )
}
```

If you prefer use the HOC

```jsx
const ComponentHoc = TehcHoc(({ state, dispatch }) => {
  return (
    <div>
      {state}
      <button onClick={() => dispatch('Hey!')}>Ok!</button>
    </div>
  )
})

function App() {
  return (
    <TehcProvider store={{ state: 'some-state' }}>
      <ComponentHoc />
    </TehcProvider>
  )
}
```

# tehc

## Installation

`npm install react-state-fire`

## Usage

There is no need to pass an inital store to the `Provider` just add whatever you want with `fire` - it let's you add a new state instance whenver/wherever you want.
It works a little bit like [Recoil](https://github.com/facebookexperimental/Recoil) but its not as fancy

```jsx
import { fire, useFire, Provider } from 'react-state-fire'

const store = fire(0)
function FirstCounter() {
  const [count, setCount] = useFire(store)
  return (
    <div>
      <h1>First counter</h1>
      {count}
      <button onClick={() => setCount((prev) => prev + 1)}>increment</button>
    </div>
  )
}

const store2 = fire(1337)
function SecondCounter() {
  const [count, setCount] = useFire(store2)
  return (
    <div>
      <h1>Second counter</h1>
      {count}
      <button onClick={() => setCount((prev) => prev + 1)}>increment</button>
    </div>
  )
}

function Reader() {
  const [firstCount] = useFire(store)
  const [secondCount] = useFire(store2)
  return (
    <div>
      <p>{firstCount}</p>
      <p>{secondCount}</p>
    </div>
  )
}

function App() {
  return (
    <Provider>
      <FirstCounter />
      <SecondCounter />
      <Reader />
    </Provider>
  )
}
```

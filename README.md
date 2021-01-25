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
      {count.value}
      <button onClick={() => setCount((prev) => prev.value + 1)}>increment</button>
    </div>
  )
}

const store2 = fire(1337)
function SecondCounter() {
  const [count, setCount] = useFire(store2)

  return (
    <div>
      <h1>Second counter</h1>
      {count.value}
      <button onClick={() => setCount((prev) => prev.value - 1)}>decrement</button>
    </div>
  )
}

function Reader() {
  const [firstCount] = useFire(store)
  const [secondCount] = useFire(store2)

  return (
    <div>
      <p>{firstCount.value}</p>
      <p>{secondCount.value}</p>
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

Pass a name to your `fire` to keep track of them.

```jsx
const store = fire('some-value', 'some-name')
```

If you don't pass in a name you still get a default name in a lowercase letter. The first `fire` you initialize will have the name "`a`" and the second will be "`b`" and so on…

Here is a full example with the hook `useAllFires` to retrieve all `fire's` that are stored

```jsx
import { fire, useFire, useAllFires, Provider } from 'react-state-fire'

// first argument is init value and second argument is the name of the fire
const namedFireOne = fire('hello', 'helloName')
function NamedFireComponentOne() {
  const [count, setCount] = useFire(namedFireOne)

  return (
    <div>
      <h1>NamedFireComponentOne</h1>
      {count.value}
      <button onClick={() => setCount('something else')}>click me!</button>
    </div>
  )
}

// first argument is init value and second argument is the name of the fire
const namedFireTwo = fire('goodbye', 'goodbyeName')
function NamedFireComponentTwo() {
  const [count, setCount] = useFire(namedFireTwo)
  return (
    <div>
      <h1>NamedFireComponentTwo</h1>
      {count.value}
      <button
        onClick={() =>
          setCount((prev) => prev.value + ' something with previous value')
        }
      >
        click me!
      </button>
    </div>
  )
}

function ReadAllStores() {
  const allFires = useAllFires()
  // below you can retrieve all fires by name
  return (
    <div>
      <p>{allFires.helloName}</p>
      <p>{allFires.goodbyeName}</p>
    </div>
  )
}
function App() {
  return (
    <Provider>
      <NamedFireComponentOne />
      <NamedFireComponentTwo />
      <ReadAllStores />
    </Provider>
  )
}
```


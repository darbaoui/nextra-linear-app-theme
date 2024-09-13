// Example from https://beta.reactjs.org/learn

import { useState } from 'react'
import styles from './counters.module.css'

function MyButton({countInit = 0}) {
  const [count, setCount] = useState(countInit)

  function handleClick() {
    setCount(count + 1)
  }

  return (
    <div>
      <button onClick={handleClick} className={styles.counter}>
        Clicked {count} times
      </button>
    </div>
  )
}

export default function MyApp({countInit = 0}) {
  return <MyButton countInit={countInit} />
}

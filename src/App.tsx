import { useState } from 'react'
import { Button } from './components/button'
import styles from "./App.module.css";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Button className={styles.button} onClick={() => setCount(count + 1)}>Count: {count}</Button>
    </div>
  )
}

export default App

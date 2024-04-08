import { useState } from "react"

import "./App.css"

function App() {
    const [count, setCount] = useState(0)
    console.log(count)
    return <div>{count}</div>
}

export default App

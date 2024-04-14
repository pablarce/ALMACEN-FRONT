import { useState } from "react"

import ContactDataFetcher from "./components/UseQueryContext"

function App() {
    const { data, error, isLoading } = ContactDataFetcher()
    console.log()
    return <div>{data[0].firstName}</div>
}

export default App

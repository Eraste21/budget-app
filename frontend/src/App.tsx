import { useEffect, useState } from "react"

const App = () => {
  const url = 'http://localhost:3001/'
  const [data, setData] = useState('')
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setData(data.message))
      .catch(err => console.error('Error :', err))
  }, [])
  return (
    <div>
      <h1>
        Budget App
      </h1>
      <span>Backend : {data}</span>
    </div>
  )
}

export default App
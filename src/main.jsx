import React from 'react'
import ReactDOM from 'react-dom/client'

function TestApp() {
  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h1>Amplify Access test</h1>
      <p>If you can see this, React is working and the problem is inside App.jsx.</p>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TestApp />
  </React.StrictMode>,
)

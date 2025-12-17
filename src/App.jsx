import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div className="container">
      <div className="content">
        <h1 className="title">Little Wings Play School</h1>
        <p className="subtitle">We are preparing something amazing for you.</p>
        <div className="badge">Launching Soon</div>
        <a href="/feedback.html" className="feedback-link">Give Feedback</a>
      </div>
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
    </div>
  )
}

export default App

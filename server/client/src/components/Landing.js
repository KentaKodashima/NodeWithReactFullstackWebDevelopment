import './Landing.css'
import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>QESurvey</h1>
      <p>QESurvey offers you the best solution to collect surveys from users!</p>
      <div className="button-block">
        <Link to="/surveys" className="btn-large custom-button">
          Go to your survey dashboard
        </Link>
        <Link to="/survey/new" className="btn-large custom-button">
          Create a new survey
        </Link>
      </div>
    </div>
  )
}

export default Landing
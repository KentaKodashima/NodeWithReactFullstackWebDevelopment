import React from 'react'

const RequireLogin = () => {
  return (
    <div className="require-login-contents">
      <p>
        You're not logged in!<br />
        Please login to create a new survey.
      </p>
      <div className="btn-large button-survey-new deep-purple lighten-1">
        <a href="/auth/google" className="white-text">Login with Google</a>
      </div>
    </div>
  )
}

export default RequireLogin
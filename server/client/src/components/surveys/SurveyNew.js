import './RequireLogin.scss'
import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from "react-redux"

import SurveyForm from './SurveyForm'
import SurveyFormReview from './SurveyFormReview'
import RequireLogin from './RequireLogin'

class SurveyNew extends Component {
  state = { showFormReview: false }

  renderContent() {
    if (this.props.auth) {
      if (this.state.showFormReview) {
        return (
          <SurveyFormReview
            onCancel={() => this.setState({ showFormReview: false })}
          />
        )
      }

      return (
        <SurveyForm
          onSurveySubmit={() => this.setState({ showFormReview: true })}
        />
      )
    }

    return (
      <RequireLogin />
    )
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth }
}

const surveyNew = connect(mapStateToProps)(SurveyNew)

// Clearing all values when the user clicks Cancel
export default reduxForm({
  form: 'surveyForm'
})(surveyNew)
import _ from 'lodash'
import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'

import SurveyField from './SurveyField'
import validateEmails from '../../utils/validateEmail'
import formFields from './formFields'

class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name, meta }) => {
      return (
        <Field key={name} component={SurveyField} type="text" label={label} name={name} />
      )
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="orange accent-3 btn-flat white-text" >
            Cancel
          </Link>
          <button type="submit" className="deep-purple lighten-1 btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    )
  }
}

const validate = (values) => {
  const errors = {}

  // || '' handles the case that there is no email
  errors.recipients = validateEmails(values.recipients || '')

  _.each(formFields, ({ name }) => {
    // values.name refers to the value itself ||| name: 'value'
    if (!values[name]) {
      errors[name] = 'You must provide a value'
    }
  })

  return errors
}

export default reduxForm({
  validate,
  form: 'surveyForm', // Would be the name of the key in Redux Store
  destroyOnUnmount: false // keep the values
})(SurveyForm)
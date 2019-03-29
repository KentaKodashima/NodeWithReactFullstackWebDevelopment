import './SurveyList.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSurveys, deleteSurvey } from '../../actions'

class SurveyList extends Component{
  componentDidMount() {
    this.props.fetchSurveys()
  }

  renderLastResponded(survey) {
    if (!survey.lastResponded) {
      return "No response yet"
    } else {
      return new Date(survey.lastResponded).toLocaleDateString()
    }
  }

  renderNoSurveysScreen() {
    return (
      <div className="col s12" >
        <p>Create your first survey!</p>
      </div>
    )
  }

  renderSurveys() {
    return this.props.surveys.reverse().map(survey => {
      return (
        <div className="col s6" key={survey._id} >
          <div className="card grey lighten-4">
            <div className="card-content" >
              <span className="card-title deep-purple-text text-lighten-1">{survey.title}</span>
              <div className="card-body">
                {survey.body}
              </div>
              <div>
                <p>
                  Sent On: { new Date(survey.dateSent).toLocaleDateString() }
                </p>
                <p>
                  Last Responded: { this.renderLastResponded(survey) }
                </p>
              </div>
            </div>
            <div className="card-action">
              <a className="deep-purple-text text-lighten-1">Yes: {survey.yes}</a>
              <a className="deep-purple-text text-lighten-1">No: {survey.no}</a>
              <button
                className="btn-floating btn-small waves-effect waves-light right"
                onClick={() => this.props.deleteSurvey(survey._id)}
              >
                <i className="material-icons deep-purple lighten-1">delete_forever</i>
              </button>
            </div>
        </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="list-container">
        <div className="row">
          {this.renderSurveys()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ surveys }) => {
  return { surveys }
}

export default connect(
  mapStateToProps,
  { fetchSurveys, deleteSurvey }
)(SurveyList)
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSurveys, deleteSurvey } from '../../actions'

class SurveyList extends Component{
  componentDidMount() {
    this.props.fetchSurveys()
  }

  renderSurveys() {
    return this.props.surveys.reverse().map(survey => {
      return (
        <div className="col s6" key={survey._id} >
          <div className="card grey lighten-2">
            <div className="card-content" >
              <span className="card-title">{survey.title}</span>
              <p>
                {survey.body}
              </p>
              <p className="right">
                Sent On: { new Date(survey.dateSent).toLocaleDateString() }
              </p>
            </div>
            <div className="card-action">
              <a className="red-text text-accent-1">Yes: {survey.yes}</a>
              <a className="red-text text-accent-1">No: {survey.no}</a>
              <button
                className="btn-floating btn-small waves-effect waves-light red right"
                onClick={() => this.props.deleteSurvey(survey._id)}
              >
                <i className="material-icons">delete_forever</i>
              </button>
            </div>
        </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div>
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
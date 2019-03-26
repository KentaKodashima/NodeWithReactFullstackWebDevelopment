import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSurveys } from '../../actions'

class SurveyList extends Component{
  componentDidMount() {
    this.props.fetchSurveys()
  }

  renderSurveys() {
    return this.props.surveys.reverse().map(survey => {
      return (
        <div className="card grey lighten-2" key={survey._id}>
          <div className="card-content" >
            <span className="card-title">{survey.title}</span>
            <p>
              {survey.body}
            </p>
            <p className="right">
              Sent On: { new Date(survey.sendDate).toLocaleDateString() }
            </p>
          </div>
          <div className="card-action">
            <a className="red-text text-accent-1">Yes: {survey.yes}</a>
            <a className="red-text text-accent-1">No: {survey.no}</a>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col s6">
            {this.renderSurveys()}
          </div>
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
  { fetchSurveys }
)(SurveyList)
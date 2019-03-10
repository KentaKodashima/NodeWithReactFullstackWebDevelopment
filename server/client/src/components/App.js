import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from "react-redux"
import * as actions from '../actions'

import Header from './Header'
import Landing from './Landing'
import Dashboard from './Dashboard'
import SurveyNew from './surveys/SurveyNew'

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div className="container">
            <Header />
            <Route path="/" exact component={Landing} />
            <Route path="/surveys" component={Dashboard} />
            <Route path="/survey/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default connect(null, actions)(App)
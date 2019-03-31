import './Header.scss'
import React, { Component } from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import { slide as Menu } from 'react-burger-menu'

import Payments from './Payments'

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return
      case false:
        return <li><a href="/auth/google">Login with Google</a></li>
      default:
        return [
          <li key="payments" className="menu-item"><Payments /></li>,
          <li key="credits" className="menu-item" style={{ margin: '0 10px' }}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key="login" className="menu-item"><a href="/api/logout">Logout</a></li>
        ]
    }
  }
  
  render() {
    return (
      <nav className="green accent-3">
        <div className="nav-wrapper container">
          <Link
            to={this.props.auth ? '/surveys' : '/'}
            className="left brand-logo"
          >
            QESurvey
          </Link>
          <ul className="right nav-items-pc">
            {this.renderContent()}
          </ul>
          <Menu right noOverlay>
            {this.renderContent()}
          </Menu>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth }
}

export default connect(mapStateToProps)(Header)
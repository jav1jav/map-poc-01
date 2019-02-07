import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, UserHome, Welcome} from './components'
import {me, getSession} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/welcome" component={Welcome} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route path="/user" component={UserHome} />
            <Route component={UserHome} />
          </Switch>
        )}
        {/* Displays our Welcome component as a fallback */}
        {!isLoggedIn && (
          <Switch>
            {/* <Route path="/" component={Welcome} /> */}
            <Route component={Welcome} />
          </Switch>
        )}

      </Switch>
    )
  }
}


/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(getSession())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}


// Notes to self:
// is '<Route path="/" component={Welcome} />' a way to handle fallback or default routes?
// remember that you have a testLocation component and a graph component and they had routes earlier
// but you deleted these components and you will probably also delete the navbar
// import testLocation from './components/testLocation'
// import graphPage from './components/graph'

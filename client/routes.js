import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, Map, Welcome} from './components'
import {me, getSession} from './store'
import broadcastStats from './components/broadcastStats'
import broadcastFake from './components/broadcastFake'
import broadcastFake2 from './components/broadcastFake2'
import testLocation from './components/testLocation'
import graphPage from './components/graph'

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
        <Route path="/signup" component={Signup} />
        <Route path="/test" component={testLocation} />
        <Route path="/broadcast" component={broadcastStats} />
        <Route path="/broadcastFake" component={broadcastFake} />
        <Route path="/broadcastFake2" component={broadcastFake2} />
        <Route path="/graphs" component={graphPage} />
        <Route path="/map" component={Map} />
        <Route path="/welcome" component={Welcome} />
        {/* <Route path="/" component={Welcome} /> */}
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route path="/" component={UserHome} />
          </Switch>
        )}
        {!isLoggedIn && (
          <Switch>
            <Route path="/" component={Welcome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        {/* <Route component={Welcome} /> */}
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

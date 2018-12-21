import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1>map-poc-01</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Link to="/test">Test Location</Link>
          <Link to="/broadcast">Broadcast Stats</Link>
          <Link to="/broadcastFake">Broadcast Fake Stats</Link>
          <Link to="/broadcastFake2">Fake Track Workout</Link>
          <Link to="/graphs">Graphs</Link>
          <Link to="/map">Map</Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/test">Test Location</Link>
          <Link to="/broadcast">Broadcast Stats</Link>
          <Link to="/broadcastFake">Broadcast Fake Stats</Link>
          <Link to="/broadcastFakes2">Fake Track Workout</Link>
          <Link to="/graphs">Graphs</Link>
          <Link to="/map">Map</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

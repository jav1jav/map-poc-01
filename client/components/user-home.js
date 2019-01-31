import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store'
import RunnerPage from './runnerPage'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, id, handleClick} = props

  return (
    <div>
      <h3>User: {email + ', ID: ' + id}</h3>

      <button type="submit" onClick={handleClick}>
        Logout
      </button>
      {id === 3 ?
        <div>Coach Dashboard</div>
        :
        <RunnerPage id={id} />
      }
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    id: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}

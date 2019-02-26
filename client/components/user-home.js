import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout, reinitializeStats, clearStatsEmitter} from '../store'
import {RunnerPage, CoachPage} from '.'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, id, statsEmitterTimeoutId, handleClick} = props
  return (
    <React.Fragment>
      <div id="header">
        <div>{email} (ID: {id})</div>
        <button id="logout" type="submit" onClick={() => handleClick(statsEmitterTimeoutId)}>LOGOUT</button>
      </div>
      {id === 3 ? <CoachPage id={id} /> : <RunnerPage id={id} />}
    </React.Fragment>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    id: state.user.id,
    statsEmitterTimeoutId: state.stat.statsEmitterTimeoutId
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick(statsEmitterTimeoutId) {
      dispatch(logout())
      dispatch(clearStatsEmitter(statsEmitterTimeoutId))
      dispatch(reinitializeStats())
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

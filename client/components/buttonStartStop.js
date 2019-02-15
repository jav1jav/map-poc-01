import React from 'react'
import {updatePageWithText, sendRunnerStats} from './runnerMapUtils'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {toggleStartStop} from '../store/stat'

const ButtonStartStop = props => {
  const {id, statsBeingSent, startSharingStats, stopSharingStats} = props
  return (
    <React-Fragment>
      <div>
        <button
          id="startButton"
          className={statsBeingSent ? 'hide' : 'display'}
          type="submit"
          onClick={() => startSharingStats(id)}
        >
          Start Sharing Location Stats
        </button>
      </div>
      <div>
        <button
          id="stopButton"
          className={statsBeingSent ? 'display' : 'hide'}
          type="submit"
          onClick={stopSharingStats}
        >
          Stop Sharing Location Stats
        </button>
      </div>
    </React-Fragment>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    id: state.user.id,
    statsBeingSent: state.stat.sendingStats
  }
}

const mapDispatch = dispatch => {
  let timeoutId = null

  function startSharingStats(id) {
    alert('sharing stats')
    updatePageWithText('Started sharing stats.')
    dispatch(toggleStartStop())
    sendRunnerStats(id)
    timeoutId = setInterval(sendRunnerStats, 3000, id)
  }

  function stopSharingStats() {
    clearTimeout(timeoutId)
    dispatch(toggleStartStop())
    alert('not sharing stats')
    updatePageWithText('Stopped sharing stats.')
  }

  return {
    startSharingStats, stopSharingStats
  }
}

export default connect(mapState, mapDispatch)(ButtonStartStop)

/**
 * PROP TYPES
 */
ButtonStartStop.propTypes = {
  id: PropTypes.number,
  statsBeingSent: PropTypes.bool
}

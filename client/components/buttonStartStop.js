import React from 'react'
import {updatePageWithText, sendRunnerStats} from './runnerMapUtils'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {toggleStartStop} from '../store/stat'

const ButtonStartStop = props => {
  const {id, statsBeingSent, startSharingStats, stopSharingStats} = props
  return (
    <div id="buttonStartStopContainer">
        <button
          id="startButton"
          className={'buttonStartStop ' + (statsBeingSent ? 'hide' : '')}
          type="submit"
          onClick={() => startSharingStats(id)}
        >
          START
        </button>
        <button
          id="stopButton"
          className={'buttonStartStop ' + (statsBeingSent ? '' : 'hide')}
          type="submit"
          onClick={stopSharingStats}
        >
          STOP
        </button>

    </div>
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

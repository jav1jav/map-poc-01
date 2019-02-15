import React from 'react'
import {updatePageWithText, sendRunnerStats} from './runnerMapUtils'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
// import store from '../store'
import {toggleStartStop} from '../store/stat'

const ButtonStartStop = props => {
  console.log('buttonStartStop.js | props', props)
  const {id, statsBeingSent, startSharingStats, stopSharingStats} = props
  return (
    <React-Fragment>
      {/* <div>
          <button type="submit" onClick={() => sendRunnerStats(props.id)}>
            Send Current Position
          </button>
        </div> */}
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
    // sessionID: state.sessionID,
    // stats: state.stat.stats,
    // lastStat: state.stat.lastStat,
    id: state.user.id,
    lastStat: state.stat.lastStat,
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
  // sessionID: PropTypes.string,
  // stats: PropTypes.array,
  // lastStat: PropTypes.object
  statsBeingSent: PropTypes.bool
}

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

const convertMilliseconds = ms => {
  const addZero = num => (num < 10 ? '0' + num : num)
  const totalSeconds = Math.floor(ms / 1000)
  const seconds = addZero(totalSeconds % 60)
  const minutes = addZero(Math.floor(totalSeconds / 60))
  return minutes + ':' + seconds
}

const StatsTable = props => {

  const {lastStat, stats} = props

  const firstStatTime = lastStat.hr ? new Date(stats[0].time) : 0
  const lastStatTime = lastStat.hr ? new Date(lastStat.time) : 0

  const displayTime = lastStat.hr
    ? convertMilliseconds(lastStatTime - firstStatTime)
    : '00:00'

  return (
    <div className="statsTable statsFormat">
      <div className="statsColumn statsFormat">
        <div className="statHeader statsFormat">time:</div>
        <div className="stat statsFormat">{displayTime}</div>
      </div>
      <div className="statsColumn statsFormat">
        <div className="statHeader statsFormat">hr:</div>
        <div className="stat statsFormat">{lastStat.hr}</div>
      </div>
      <div className="statsColumn statsFormat">
        <div className="statHeader statsFormat">cad:</div>
        <div className="stat statsFormat">{lastStat.cad}</div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    sessionID: state.sessionID,
    stats: state.stat.stats,
    lastStat: state.stat.lastStat
  }
}

export default connect(mapState)(StatsTable)

/**
 * PROP TYPES
 */
StatsTable.propTypes = {
  sessionID: PropTypes.string,
  stats: PropTypes.array,
  lastStat: PropTypes.object
}

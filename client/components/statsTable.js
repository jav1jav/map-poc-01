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

  const displayTime = convertMilliseconds(lastStatTime - firstStatTime)

  return (
    <div className="statsTable">
      <div className="statsColumn statsFormat">
        <div className="statHeader statsFormat">TIME</div>
        <div className="stat statsFormat">{displayTime}</div>
      </div>
      <div className="statsColumn statsFormat">
        <div className="statHeader statsFormat">&#9829; RATE</div>
        <div className="stat statsFormat">{lastStat.hr || 0}</div>
      </div>
      <div className="statsColumn statsFormat">
        <div className="statHeader statsFormat">CADENCE</div>
        <div className="stat statsFormat">{lastStat.cad || 0}</div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    stats: state.stat.stats,
    lastStat: state.stat.lastStat
  }
}

export default connect(mapState)(StatsTable)

/**
 * PROP TYPES
 */
StatsTable.propTypes = {
  stats: PropTypes.array,
  lastStat: PropTypes.object
}

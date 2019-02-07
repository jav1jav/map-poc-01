import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

const StatsTable = ({stats, lastStat}) => {
  return stats.length > 0 ? (
    <div>
      <div>time:{lastStat.time}</div>
      <div>hr:{lastStat.hr}</div>
      <div>cad:{lastStat.cad}</div>
    </div>
  )
    :
    <div>statsTable loading</div>
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

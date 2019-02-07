import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'



const StatsTable = ({stats}) => {

  // const stats = props.stats
    // console.log('map.js | cdm | stats from props: ', stats)

    // const stats = this.props.stats
    // if (stats.length > 0) {
    //   const lastStat = stats[stats.length - 1]

    // }

    // let lng = -122.48369693756104
    // let lat = 37.83381888486939
    // let ele = 0
    // let time = 0
    // let hr = 0
    // let cad = 0
    // if (stats.length > 0) {
    //   lon = lastStat.lon
    //   lat = lastStat.lat
    //   ele = lastStat.ele
    //   time = lastStat.time
    //   hr = lastStat.hr
    //   cad = lastStat.cad
    // }

    let lastStat = {}
    if (stats.length > 0) {
       lastStat = stats[stats.length -1]
    }



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
    stats: state.stat
  }
}

export default connect(mapState)(StatsTable)

/**
 * PROP TYPES
 */
Map.propTypes = {
  sessionID: PropTypes.string,
  stats: PropTypes.array
}

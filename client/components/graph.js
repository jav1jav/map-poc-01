/* App.js */
var React = require('react')
var CanvasJSReact = require('./canvasjs.react')
var CanvasJSChart = CanvasJSReact.CanvasJSChart
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

// const data = require('./data.json')

// const hrArr = data.trkpt.map(el => ({
//   x: new Date(el.time),
//   // y: +el.extensions.TrackPointExtension.hr
//   y: +el.hr
// }))

// const cadArr = data.trkpt.map(el => ({
//   x: new Date(el.time),
//   // y: +el.extensions.TrackPointExtension.cad
//   y: +el.cad
// }))

const Graph = ({stats}) => {
  function toggleDataSeries(e) {
    if (typeof e.dataSeries.visible === 'undefined' || e.dataSeries.visible) {
      e.dataSeries.visible = false
    } else {
      e.dataSeries.visible = true
    }
    e.chart.render()
  }

  const hrArr = stats.map(el => ({
    x: new Date(el.time),
    // y: +el.extensions.TrackPointExtension.hr
    y: +el.hr
  }))

  const cadArr = stats.map(el => ({
    x: new Date(el.time),
    // y: +el.extensions.TrackPointExtension.cad
    y: +el.cad
  }))

  const options = {
    title: {
      text: 'Heart Rate & Cadence'
    },
    axisY: {
      title: 'Heart Rate',
      lineColor: '#C24642',
      tickColor: '#C24642',
      labelFontColor: '#C24642',
      titleFontColor: '#C24642'
    },

    axisY2: {
      title: 'Cadence',
      lineColor: '#7F6084',
      tickColor: '#7F6084',
      labelFontColor: '#7F6084',
      titleFontColor: '#7F6084'
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: 'pointer',
      itemclick: toggleDataSeries
    },
    data: [
      {
        type: 'line',
        name: 'heart rate',
        color: '#C24642',
        axisYIndex: 0,
        showInLegend: true,
        dataPoints: hrArr
      },
      {
        type: 'line',
        name: 'Cadence',
        color: '#7F6084',
        axisYType: 'secondary',
        showInLegend: true,
        dataPoints: cadArr
      }
    ]
  }
  return (
    <div>
      <CanvasJSChart
        options={options}
        /* onRef={ref => this.chart = ref */
      />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  )
}

// module.exports = App

// export default App

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

export default connect(mapState)(Graph)

/**
 * PROP TYPES
 */
Graph.propTypes = {
  sessionID: PropTypes.string,
  stats: PropTypes.array,
  lastStat: PropTypes.object
}

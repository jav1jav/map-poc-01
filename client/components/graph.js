//NOTE: this component needs a little work. It had been a stateless component
//where you fed the inputs to the graph, and tied the inputs to state, and then
//just updated state, but then there was no way to leave the page without an
//canvasjs error. So the latest change was to make it a class that you could use
//componentDidMount / Unmount events to error handle.
//
//Also examined trying to reference the chart itself and delete it, but that
//did not work
//
//Ultimately I created a React errorBoundary around the component, but there's
//some cleanup to do here.

import React, {Component} from 'react'
import CanvasJSReact from './canvasjs.react'
const CanvasJSChart = CanvasJSReact.CanvasJSChart

import PropTypes from 'prop-types'
import {connect} from 'react-redux'

export const deleteGraph = () => {
  console.log('graph.js | deleteGraph runs | CanvasJSChart', CanvasJSChart)
  // const element = document.getElementById('canvasjs-react-chart-container-0');
  // element.parentNode.removeChild(element)
  // CanvasJSChart.remove()
}

class Graph extends Component {
  constructor() {
    super()
    // this.state = {
    //   stats: []
    // }
    // this.toggleDataSeries = this.toggleDataSeries.bind(this)
  }

  toggleDataSeries(e) {
    if (typeof e.dataSeries.visible === 'undefined' || e.dataSeries.visible) {
      e.dataSeries.visible = false
    } else {
      e.dataSeries.visible = true
    }
    e.chart.render()
  }

  render() {
    console.log('graph.js | rendering graph | props: ', this.props)
    const {stats} = this.props

    const hrArr = stats.map(el => ({
      x: new Date(el.time),
      y: +el.hr
    }))

    const cadArr = stats.map(el => ({
      x: new Date(el.time),
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
        itemclick: this.toggleDataSeries
      },
      data: [
        {
          type: 'line',
          name: 'Heart Rate',
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

    return stats.length > 0 ? <CanvasJSChart options={options} onRef={ref => this.chart = ref} /> : <div>No stats to graph</div>

    /*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    stats: state.stat.stats
  }
}

export default connect(mapState)(Graph)

/**
 * PROP TYPES
 */
Graph.propTypes = {
  stats: PropTypes.array
}

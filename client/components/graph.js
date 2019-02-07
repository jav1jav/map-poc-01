/* App.js */
var React = require('react')
var Component = React.Component
var CanvasJSReact = require('./canvasjs.react')
var CanvasJS = CanvasJSReact.CanvasJS
var CanvasJSChart = CanvasJSReact.CanvasJSChart
const data = require('./data.json')

const hrArr = data.trkpt.map(el => ({
  x: new Date(el.time),
  // y: +el.extensions.TrackPointExtension.hr
  y: +el.hr
}))

const cadArr = data.trkpt.map(el => ({
  x: new Date(el.time),
  // y: +el.extensions.TrackPointExtension.cad
  y: +el.cad
}))

class App extends Component {
  toggleDataSeries(e) {
    if (typeof e.dataSeries.visible === 'undefined' || e.dataSeries.visible) {
      e.dataSeries.visible = false
    } else {
      e.dataSeries.visible = true
    }
    e.chart.render()
  }

  render() {
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
        <CanvasJSChart options={options}
        /* onRef={ref => this.chart = ref */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    )
  }
}
// module.exports = App

export default App

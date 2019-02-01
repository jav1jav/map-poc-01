import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'


/**
 * COMPONENT
 */

class statsTable extends React.Component {

  componentDidMount() {
    const stats = this.props.stats
    // console.log('map.js | cdm | stats from props: ', stats)
    let lng = -122.48369693756104
    let lat = 37.83381888486939
    let ele =
    let time =
    let hr =
    let cad =
    if (stats.length > 0) {
      lng = stats[stats.length - 1][0]
      lat = stats[stats.length - 1][1]
      ele =
      time =
      hr =
      cad =
    }

  }

  updateLayer() {

    const coordinates = this.props.coordinates
    // console.log(
    //   'map.js | updateLayer | this.props.coordinates ',
    //   coordinates
    // )
    this.map.addLayer({
      id: 'route' + coordinates.length,
      type: 'line',
      source: {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: coordinates
          }
        }
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#888',
        'line-width': 8
      }
    })
    this.map.flyTo({center: coordinates[coordinates.length-1]});
  }

  render() {
    // console.log('map.js | render | props: ', this.props)
    this.map && this.props.coordinates.length > 0 && this.updateLayer()
    // if (this.props.coordinates.length > 0) {
    //   const coordinates = this.props.coordinates
    //   const lng = coordinates[coordinates.length - 1][0]
    //   const lat = coordinates[coordinates.length - 1][1]

    //   this.createMap(lng, lat)
    //   this.updateLayer()
    // }

    return <div>statsTable</div>
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    sessionID: state.sessionID,
    coordinates: state.stat
  }
}

export default connect(mapState)(statsTable)

/**
 * PROP TYPES
 */
Map.propTypes = {
  sessionID: PropTypes.string
}

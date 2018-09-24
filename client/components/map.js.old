import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'

mapboxgl.accessToken =
  'pk.eyJ1IjoiamF2aWVyY2FyZXkiLCJhIjoiY2ptYjN4aG5pMDEwcjNwbnF1M2twYW91ZSJ9.UITbabUfCeSDBAXMykIMvw'

let counter = 0

const data = [
  [-122.48369693756104, 37.83381888486939],
  [-122.48348236083984, 37.83317489144141],
  [-122.48404026031496, 37.83114119107971],
  [-122.48404026031496, 37.83049717427869],
  [-122.48348236083984, 37.829920943955045],
  [-122.48356819152832, 37.82954808664175],
  [-122.48507022857666, 37.82944639795659],
  [-122.48610019683838, 37.82880236636284],
  [-122.48695850372314, 37.82931081282506],
  [-122.48700141906738, 37.83080223556934],
  [-122.48751640319824, 37.83168351665737],
  [-122.48803138732912, 37.832158048267786],
  [-122.48888969421387, 37.83297152392784],
  [-122.48987674713133, 37.83263257682617],
  [-122.49043464660643, 37.832937629287755],
  [-122.49125003814696, 37.832429207817725],
  [-122.49163627624512, 37.832564787218985],
  [-122.49223709106445, 37.83337825839438],
  [-122.49378204345702, 37.83368330777276]
]

/**
 * COMPONENT
 */

class Map extends React.Component {
  map

  constructor(props) {
    super(props)
    this.state = {
      lng: -122.486052,
      lat: 37.830348,
      zoom: 17,
      coords: []
    }
  }

  componentDidMount() {
    this.setState({
      coords: this.props.coordinates
    })

    const {lng, lat, zoom} = this.state
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [-122.42744019999999, 37.7713775],
      zoom,
      legendControl: {
        position: 'topright'
      }
    })

    this.map.on('move', () => {
      const {lng, lat} = map.getCenter()

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: this.map.getZoom().toFixed(2)
      })
    })

    this.map.on('load', () => {
      this.updateLayer()
    })
  }

  updateLayer() {
    this.map.addLayer({
      id: 'route' + this.state.coords.length,
      type: 'line',
      source: {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: this.state.coords
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
  }

  updateLayer2() {
    this.setState({
      coords: data.slice(0, ++counter)
    })
  }

  render() {
    if (this.state.coords.length !== this.props.coordinates.length) {
      this.setState({
        coords: this.props.coordinates
      })
    }


    console.log('rendering | state', this.state)
    this.map && this.state.coords.length > 0 && this.updateLayer()

    const {lng, lat, zoom} = this.state

    return (
      <div>
        <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
          <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
        </div>
        <div className="inline-block absolute top right mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
          <div>
            <button
              id="update"
              type="submit"
              onClick={() => this.updateLayer2()}
            >
              Update
            </button>
          </div>
        </div>
        <div
          ref={el => (this.mapContainer = el)}
          className="absolute top right left bottom"
        />
      </div>
    )
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

export default connect(mapState)(Map)

/**
 * PROP TYPES
 */
Map.propTypes = {
  sessionID: PropTypes.string
}

import React from 'react'

import Map from './map'
import StatsTable from './statsTable'
import ButtonStartStop from './buttonStartStop'


export default function runnerPage() {
  if (!navigator.geolocation) {
    return <div>'geolocation not supported'</div>
  } else {
    return (
      <React-fragment>
        <Map />
        <StatsTable />
        <ButtonStartStop />
        <div id="log" className="hide" />
      </React-fragment>
    )
  }
}

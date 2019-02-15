import React from 'react'
import {Map, StatsTable, ButtonStartStop} from './'

export default function runnerPage() {
  if (!navigator.geolocation) {
    return <div>'geolocation not supported'</div>
  } else {
    return (
      <React.Fragment>
        <Map />
        <StatsTable />
        <ButtonStartStop />
        <div id="log" className="hide" />
      </React.Fragment>
    )
  }
}

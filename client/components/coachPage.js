import React from 'react'
// import Map from './map'
// import StatsTable from './statsTable'
import {Graph, StatsTable, Map} from './'

export default function coachPage(props) {
    const runnerId = 2
    return (
      <React-fragment>
        <Map />
        <StatsTable />
        <Graph />
      </React-fragment>
    )

}

import React from 'react'
import {Graph, StatsTable, Map} from './'

export default function coachPage() {
  return (
    <React.Fragment>
      <Map />
      <StatsTable />
      <Graph />
    </React.Fragment>
  )
}

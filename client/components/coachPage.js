import React from 'react'
import {Graph, StatsTable, Map, ErrorBoundary} from './'

export default function coachPage() {
  return (
    <React.Fragment>
      <Map />
      <StatsTable />
      <ErrorBoundary>
        <Graph />
      </ErrorBoundary>
    </React.Fragment>
  )
}

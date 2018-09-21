import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <div id='map'>map</div>
      <Routes />
    </div>
  )
}

export default App

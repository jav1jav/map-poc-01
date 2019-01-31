import {EventEmitter} from 'events'
export const broadcaster = new EventEmitter()

import store from '../store'
import {gotStat} from '../store/stat'


const dataIn = require('./data.json')
const data = dataIn.trkpt.map(el => [el.lon, el.lat])

let counter = 0

export function sendRunnerStats(shouldBroadcast = true) {
  const userId = 2
  let latitude = null
  let longitude = null

  if (counter < data.length) {
    latitude = data[counter][1]
    longitude = data[counter++][0]
  } else {
    counter = 0
    latitude = data[counter][1]
    longitude = data[counter++][0]
  }

  shouldBroadcast &&
    broadcaster.emit('sendRunnerStats', longitude, latitude, userId)
  store.dispatch(gotStat([longitude, latitude]))
  //updatePageWithText(`lat: ${latitude} lng: ${longitude}`)
}

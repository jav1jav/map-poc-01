import io from 'socket.io-client'
import { broadcaster, convertStatsArrayToObj } from './components/runnerMapUtils'
import store from './store'
import { gotStat } from './store/stat'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('forwardRunnerStats', function(...payload) {
  // console.log('client/socket.js | payload for forwardRunnerStats:', payload)
  const stat = convertStatsArrayToObj(payload)
  // console.log('client/socket.js | object created from convert function:', stat)
  store.dispatch(gotStat(stat))
});

broadcaster.on('sendRunnerStats', (...payload) => {
  socket.emit('sendRunnerStats', ...payload);
})

export default socket

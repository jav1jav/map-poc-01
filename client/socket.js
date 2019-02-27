import io from 'socket.io-client'
import { broadcaster, convertStatsArrayToObj } from './components/runnerMapUtils'
import store from './store'
import { gotStat } from './store/stat'

const socket = io.connect(window.location.origin)

export const socketDisconnect = () => {
  socket.io.disconnect()
}

export const socketReconnect = () => {
  socket.connect(window.location.origin, {'forceNew':true })
}


socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('disconnect', () => {
  console.log('Disconnected!')
})

socket.on('forwardRunnerStats', function(...payload) {
  const stat = convertStatsArrayToObj(payload)
  store.dispatch(gotStat(stat))
});

broadcaster.on('sendRunnerStats', (...payload) => {
  socket.emit('sendRunnerStats', ...payload);
})

export default socket

import io from 'socket.io-client'
import { broadcaster } from './components/broadcastStats'
import store from './store'
import { gotStat } from './store/stat'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('sendRunnerStats', function(lng, lat, userId) {
  const stat = [lng, lat]
  store.dispatch(gotStat(stat))
});

broadcaster.on('sendRunnerStats', (...payload) => {
  socket.emit('sendRunnerStats', ...payload);
  console.log('client/sockets.js | client broadcast', ...payload);
})

export default socket

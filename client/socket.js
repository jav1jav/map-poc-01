import io from 'socket.io-client'
import { broadcaster } from './components/runnerMapUtils'
import store from './store'
import { gotStat } from './store/stat'

// import {connect} from 'react-redux'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('forwardRunnerStats', function(lng, lat, userId) {
  const stat = [lng, lat]
  store.dispatch(gotStat(stat))
});

broadcaster.on('sendRunnerStats', (...payload) => {
  socket.emit('sendRunnerStats', ...payload);
  // console.log('client/sockets.js | client broadcast', ...payload);
})

// const mapState = state => {
//   return {
//     email: state.user.email,
//     id: state.user.id
//   }
// }

//export default connect(mapState)(socket)

export default socket

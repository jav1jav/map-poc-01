// import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_STAT = 'GOT_STAT'
const TOGGLE_START_STOP_BUTTON = 'TOGGLE_START_STOP_BUTTON'

/**
 * INITIAL STATE
 */
const defaultStats = []
const defaultLastStat = {}
const initialState = {
  stats: defaultStats,
  lastStat: defaultLastStat,
  sendingStats: false
}

/**
 * ACTION CREATORS
 */
export const gotStat = stat => {
  console.log('stat.js | running gotStat() action creator')
  return {type: GOT_STAT, stat}
}
export const toggleStartStop = () => {
  console.log('stat.js | running toggleStartStop() action creator')
  return {type: TOGGLE_START_STOP_BUTTON}
}

/**
 * THUNK CREATORS
 */
// export const me = () => async dispatch => {
//   try {
//     const res = await axios.get('/auth/me')
//     dispatch(gotUser(res.data || defaultUser))
//   } catch (err) {
//     console.error(err)
//   }
// }


/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_STAT:
      return { ...state,
        stats: state.stats.concat([action.stat]),
        lastStat: action.stat
      }
    case TOGGLE_START_STOP_BUTTON:
      return { ...state,
        sendingStats: !state.sendingStats
      }
    default:
      return state
  }
}

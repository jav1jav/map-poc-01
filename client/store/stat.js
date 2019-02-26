// import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_STAT = 'GOT_STAT'
const TOGGLE_START_STOP_BUTTON = 'TOGGLE_START_STOP_BUTTON'
const REINTIALIZE_STATS = 'REINTIALIZE_STATS'
const SET_STATS_EMITTER_TIMEOUT_ID = 'SET_STATS_EMITTER_TIMEOUT_ID'
const CLEAR_STATS_EMITTER_TIMEOUT_ID = 'CLEAR_STATS_EMITTER_TIMEOUT_ID'


/**
 * INITIAL STATE
 */
const defaultStats = []
const defaultLastStat = {}
const initialState = {
  stats: defaultStats,
  lastStat: defaultLastStat,
  sendingStats: false,
  statsEmitterTimeoutId: null
}

/**
 * ACTION CREATORS
 */
export const gotStat = stat => ({type: GOT_STAT, stat})
export const toggleStartStop = () => ({type: TOGGLE_START_STOP_BUTTON})
export const reinitializeStats = () => ({type: REINTIALIZE_STATS})
export const setStatsEmitterTimeoutId = id => ({type: SET_STATS_EMITTER_TIMEOUT_ID, id})
export const clearStatsEmitterTimeoutId = () => ({type: CLEAR_STATS_EMITTER_TIMEOUT_ID})



/**
 * THUNK CREATORS
 */
export const clearStatsEmitter = (statsEmitterTimeoutId) => dispatch => {
  clearTimeout(statsEmitterTimeoutId)
  dispatch(clearStatsEmitterTimeoutId())
}



/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_STAT:
      return {
        ...state,
        stats: state.stats.concat([action.stat]),
        lastStat: action.stat
      }
    case TOGGLE_START_STOP_BUTTON:
      return {
        ...state,
        sendingStats: !state.sendingStats
      }
    case SET_STATS_EMITTER_TIMEOUT_ID:
      return {
        ...state,
        statsEmitterTimeoutId: action.id
      }
    case CLEAR_STATS_EMITTER_TIMEOUT_ID:
      return {
        ...state,
        statsEmitterTimeoutId: null
      }
    case REINTIALIZE_STATS:
      return initialState
    default:
      return state
  }
}

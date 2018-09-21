// import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_STAT = 'GOT_STAT'

/**
 * INITIAL STATE
 */
const defaultStats = []

/**
 * ACTION CREATORS
 */
export const gotStat = stat => ({type: GOT_STAT, stat})

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
export default function(state = defaultStats, action) {
  switch (action.type) {
    case GOT_STAT:
      return state.concat([action.stat])
    default:
      return state
  }
}

import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_SESSION = 'GOT_SESSION'


/**
 * INITIAL STATE
 */
const defaultSessionID = ''

/**
 * ACTION CREATORS
 */
export const gotSession = sessionID => ({type: GOT_SESSION, sessionID})

/**
 * THUNK CREATORS
 */
export const getSession = () => async dispatch => {
  try {
    const res = await axios.get('/auth/session')
    dispatch(gotSession(res.data || defaultSessionID))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultSessionID, action) {
  switch (action.type) {
    case GOT_SESSION:
      return action.sessionID
    default:
      return state
  }
}

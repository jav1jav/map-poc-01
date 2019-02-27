// import runnerPage from './runnerPage';

/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as Map} from './map'
export {default as UserHome} from './user-home'
export {default as Welcome} from './welcome'
export {Login, Signup} from './auth-form'
export {default as RunnerPage} from './runnerPage'
export {default as CoachPage} from './coachPage'
export {default as Graph} from './graph'
export {deleteGraph} from './graph'
export {default as StatsTable} from './statsTable'
export {default as ButtonStartStop} from './buttonStartStop'
export {default as ErrorBoundary} from './errorBoundary'

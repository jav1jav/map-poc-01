import React from 'react'
import {Login} from './auth-form'

const Welcome = () => {
  return (
    <div>
      <div>
        <h1>Welcome to The Runner's Coach Dashboard</h1>
        <div>
          This is a proof of concept app for a dashboard to display real time
          running statistics to a coach. To see all features of the POC, use one
          browser window to log in as an athelete and another incognito window
          to log in as a coach.
        </div>
        <div>There are 3 accounts:</div>
        <ol>
          <h3>
            <li>
              FakeAthelete (username: fakeathlete@email.com, password: 123)
            </li>
          </h3>
          <ul>
            <li>
              The FakeAthlete account shows a runner's experience using the app,
              best seen on a mobile device. A logged-in runner is presented a
              map showing their location and a set of statistics about their run
              (heart rate, stride rate, pace, etc...). Click the start button to
              start a workout and the app automatically generates fake running
              statistics for a previously executed track workout.
            </li>
          </ul>
          <h3>
            <li>
              RealAthlete (username: realathlete@email.com, password: 123)
            </li>
          </h3>
          <ul>
            <li>
              The RealAthlete account shows the runner's experience but instead
              of generating fake statistics, the app will send the actual
              location of the device. (You must respond positively to the prompt
              from the browser to allow the app to access location data). Log in
              as the RealAthlete on a mobile device, click the start button and
              begin walking to generate location data.
            </li>
          </ul>
          <h3>
            <li>Coach (username: coach@email.com, password:123)</li>
          </h3>
          <ul>
            <li>
              The Coach's experience allows the coach to select an athlete and
              then view a dashboard of that athlete's live performance.
            </li>
          </ul>
        </ol>
      </div>
      <Login />
    </div>
  )
}

export default Welcome

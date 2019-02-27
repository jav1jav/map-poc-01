import React from 'react'
import {Login} from './auth-form'

const Welcome = () => {
  const pathName = window.origin
  return (
    <div>
      <div>
        <h1>Welcome to The Runner's Coach Dashboard</h1>
        <div>
          This is a proof of concept app for a dashboard to display real time
          running statistics to a coach. To see all features of the POC, use one
          browser window to log in as an athelete and another incognito window
          to log in as a coach. Key technologies used were React, Redux, Socket.IO, MapBox. ß
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
              Login as FakeAthlete and click start to send running statistics to the coach. The app sends fake data from a track workout.
            </li>
          </ul>
          <h3>
            <li>
              RealAthlete (username: realathlete@email.com, password: 123)
            </li>
          </h3>
          <ul>
            <li>
              Login as RealAthlete and click start to send your location to the coach. NOTE: You must use HTTPS, you must respond to the prompt to allow the app to access location, and there is currently no marker to indicate your actual location, although the map will show your vicinity and draw a line if you're moving.
            </li>
          </ul>
          <h3>
            <li>Coach (username: coach@email.com, password:123)</li>
          </h3>
          <ul>
            <li>
              The Coach's view displays the information being broadcast by the athletes.
            </li>
          </ul>
        </ol>
      </div>
      <Login />
      <img src={pathName + '/Coach201.jpg'} />
    </div>
  )
}

export default Welcome

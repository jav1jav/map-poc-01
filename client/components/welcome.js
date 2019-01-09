import React from 'react'

const Welcome = () => {
  return (
    <div>
      <h1>Welcome to The Runner's Coach Dashboard</h1>
      <div>
        This is a proof of concept app for a dashboard to display real time
        running statistics to a coach. To see all features of the POC, use one
        browser window to log in as an athelete and another incognito window to
        log in as a coach.
      </div>
      <div>There are 3 accounts:</div>
      <ol>
        <h3>
          <li>RealAthlete (username: realathlete@email.com, password: 123)</li>
        </h3>
        <ul>
          <li>
            The RealAthlete experience shows a runner's experience using the
            app, as seen on a mobile phone. From the runner's UI a user can see
            their location on a map and click a button to start a workout. After
            starting a workout on a mobile phone, the phone will broadcast the
            phone's location data back to the server. The idea is that the phone
            would send other running data (speed, stride rate, etc...), but for
            the proof of concept only location data is sent.
          </li>
        </ul>
        <h3>
          <li>FakeAthelete (username: fakeathlete@email.com, password: 123)</li>
        </h3>
        <ul>
          <li>
            FakeAthlete experience, like the RealAthelete's, shows the runner's
            UI, but generates and broadcasts fake data. Click the start button
            to automatically send running statistics for a previously executed
            track workout.{' '}
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
  )
}

export default Welcome

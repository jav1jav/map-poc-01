
# running-data-dashboard

##Introduction

This project is intended to be a proof of concept to show broadcasting and displaying GPS data in real time, showcasing use of React, Redux, Socket.IO, Mapbox, Canvas.JS and CSS implementation.

It is pulling boilerplate code from https://github.com/FullstackAcademy/boilermaker.git

The latest version of the app is deployed to https://running-data-dashboard.herokuapp.com/test


##20190215

* Project looks good enough and works reliably enough to post to heroku for people to see.
* Outstanding work:
** Bug - logout as coach while receiving data from runner results in browser showing nothing, i think that b/c app is still receiving data, state is still changing, and components are still trying to render.
** Coach should have the option to pick an athlete - have not built this feature
** There's no safeguards against multiple logins, which knowing my luck means that the only time two recruiters go to the site they will do so at the same time and see bizarre behavior. I will need to implement channels for sockets.

Implementing safeguards/socket channels is probably the next piece of work, though I might put this on hold to fork a different, previously half-written group project from my bootcamp experience and clean that up for public display.


##20190129

I'm working on this project again.

I have redone the home page to direct the viewer through an experience to understand the functionality I built during the FullStack hackathon. The viewer can login as one of 3 users: realathlete, fakeathlete, and coach.

ABOUT THE CODE (explaining the app to myself)

* index.js, (which is the entry point specified in webpack.config.js so that webpack can generate public/bundle.js) calls app.js
* app.js, (which the boilerplate code has doing a lot) calls routes.js
* routes.js, sets up the local routes, mapping urls to React components depending whether user is logged in or not.

* client/components/welcome.js, if not logged in, routes.js forces loading of the welcome component. is the home page with the instructions regarding the poc demo.

* Welcome loads the Login component. There's a route to access login component directly: the route is https://localhost:8080/login. Login component is generated from client/components/auth-form.js. The auth-form uses React to generate the Login form and then Redux connect mapDispatchToProps to link the form to the handleSubmit method - which dispatches 'auth' method - which talks to the back end.

* the auth method is exported from /client/store/user.js. It makes the axios post to '/auth/ and then if 'res' gets back a user then history.push redirects to the route '/user/userId'.

* then we're doing some hacky stuff to point user where id=3 to the coachPage, and the other 2 users to the runnerPage.

* /client/components/runnerPage.js loads for the runners
* /client/components/coachPage.js loads for the coach

* Runner and coach pages have a map component and a statsTable component that display the data that's being broadcast via sockets and then written to local app state using Redux, which results in the re-rendering of the components - ie. updates to the runner's path being drawn on the map and updates to the values for the statistics.


# Boilermaker

_Good things come in pairs_

Looking to mix up a backend with express/sequelize and a frontend with react/redux? That's `boilermaker`!

Follow along with the workshop to make your own! This canonical version can serve as a reference, or a starting point all on its own.

## Setup

To use this boilerplate, you'll need to take the following steps:

* Don't fork or clone this repo! Instead, create a new, empty directory on your machine and `git init` (or create an empty repo on Github and clone it to your local machine)
* Run the following commands:

```
git remote add boilermaker https://github.com/FullstackAcademy/boilermaker.git
git fetch boilermaker
git merge boilermaker/master
```

Why did we do that? Because every once in a while, `boilermaker` may be updated with additional features or bug fixes, and you can easily get those changes from now on by entering:

```
git fetch boilermaker
git merge boilermaker/master
```

## Customize

Now that you've got the code, follow these steps to get acclimated:

* Update project name and description in `package.json` and `.travis.yml` files
* `npm install`, or `yarn install` - whatever you're into
* Create two postgres databases: `boilermaker` and `boilermaker-test` (you can substitute these with the name of your own application - just be sure to go through and change the `package.json` and `.travis.yml` to refer to the new name)
  * By default, running `npm test` will use `boilermaker-test`, while regular development uses `boilermaker`
* Create a file called `secrets.js` in the project root

  * This file is `.gitignore`'d, and will _only_ be required in your _development_ environment
  * Its purpose is to attach the secret env variables that you'll use while developing
  * However, it's **very** important that you **not** push it to Github! Otherwise, _prying eyes_ will find your secret API keys!
  * It might look like this:

  ```
    process.env.GOOGLE_CLIENT_ID = 'hush hush'
    process.env.GOOGLE_CLIENT_SECRET = 'pretty secret'
    process.env.GOOGLE_CALLBACK = '/auth/google/callback'
  ```

* To use OAuth with Google, complete the step above with a real client ID and client secret from Google
  * You can get them here: https://console.developers.google.com/apis/credentials
* Finally, complete the section below to set up your linter

## Linting

Linters are fundamental to any project - they ensure that your code has a consistent style, which is critical to writing readable code.

Boilermaker comes with a working linter (ESLint, with `eslint-config-fullstack`) "out of the box." However, everyone has their own style, so we recommend that you and your team work out yours and stick to it. Any linter rule that you object to can be "turned off" in `.eslintrc.json`. You may also choose an entirely different config if you don't like ours:

* [Standard style guide](https://standardjs.com/)
* [Airbnb style guide](https://github.com/airbnb/javascript)
* [Google style guide](https://google.github.io/styleguide/jsguide.html)

## Start

`npm run start-dev` will make great things happen!

If you want to run the server and/or webpack separately, you can also `npm run start-server` and `npm run build-client`.

From there, just follow your bliss.

## Deployment

Ready to go world wide? Here's a guide to deployment! There are two (compatible) ways to deploy:

* automatically, via continuous integration
* manually, from your local machine

Either way, you'll need to set up your deployment server to start:

### Prep

1.  Set up the [Heroku command line tools](https://devcenter.heroku.com/articles/heroku-cli)
2.  `heroku login`
3.  Add a git remote for heroku:

* **If you're creating a new app...**

  1.  `heroku create` or `heroku create your-app-name` if you have a name in mind.
  2.  `heroku addons:create heroku-postgresql:hobby-dev` to add ("provision") a postgres database to your heroku dyno

* **If you already have a Heroku app...**

  1.  `heroku git:remote your-app-name` You'll need to be a collaborator on the app.

### When you're ready to deploy

#### Option A: Automatic Deployment via Continuous Integration

(_**NOTE**: This step assumes that you already have Travis-CI testing your code._)

CI is not about testing per se – it's about _continuously integrating_ your changes into the live application, instead of periodically _releasing_ new versions. CI tools can not only test your code, but then automatically deploy your app. Boilermaker comes with a `.travis.yml` configuration almost ready for deployment; follow these steps to complete the job.

1.  Run `git checkout master && git pull && git checkout -b f/travis-deploy` (or use some other new branch name).
2.  Un-comment the bottom part of `.travis.yml` (the `before_deploy` and `deploy` sections)
3.  Add your Heroku app name to `deploy.app`, where it says "YOUR HEROKU APP NAME HERE". For example, if your domain is `cool-salty-conifer.herokuapp.com`, your app name is `cool-salty-conifer`.
4.  Install the Travis CLI tools by following [the instructions here](https://github.com/travis-ci/travis.rb#installation).
5.  Run `travis encrypt $(heroku auth:token) --org` to encrypt your Heroku API key. _**Warning:** do not run the `--add` command suggested by Travis, that will rewrite part of our existing config!_
6.  Copy-paste your encrypted API key into the `.travis.yml` file under `deploy.api_key.secure`, where it says "YOUR ENCRYPTED API KEY HERE".
7.  `git add -A && git commit -m 'travis: activate deployment' && git push -u origin f/travis-deploy`
8.  Make a PR for the new branch, get it approved, and merge it into master.

That's it! From now on, whenever `master` is updated on GitHub, Travis will automatically push the app to Heroku for you.

#### Option B: Manual Deployment from your Local Machine

Some developers may prefer to control deployment rather than rely on automation. Your local copy of the application can be pushed up to Heroku at will, using Boilermaker's handy deployment script:

1.  Make sure that all your work is fully committed and pushed to your master branch on Github.
2.  If you currently have an existing branch called "deploy", delete it now (`git branch -d deploy`). We're going to use a dummy branch with the name "deploy" (see below), so if you have one lying around, the script below will error
3.  `npm run deploy` - this will cause the following commands to happen in order:

* `git checkout -b deploy`: checks out a new branch called "deploy". Note that the name "deploy" here isn't magical, but it needs to match the name of the branch we specify when we push to our heroku remote.
* `webpack -p`: webpack will run in "production mode"
* `git add -f public/bundle.js public/bundle.js.map`: "force" add the otherwise gitignored build files
* `git commit --allow-empty -m 'Deploying'`: create a commit, even if nothing changed
* `git push --force heroku deploy:master`: push your local "deploy" branch to the "master" branch on heroku
* `git checkout master`: return to your master branch
* `git branch -D deploy`: remove the deploy branch

Now, you should be deployed!

Why do all of these steps? The big reason is because we don't want our production server to be cluttered up with dev dependencies like webpack, but at the same time we don't want our development git-tracking to be cluttered with production build files like bundle.js! By doing these steps, we make sure our development and production environments both stay nice and clean!


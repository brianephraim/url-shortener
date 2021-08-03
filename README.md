
# Url Shortener

authored by
@defualt
Brian Ephraim
brianpehraim@gmail.com

## Running the app for development

If you never developed a React Native app on your machine before, follow [this getting started guide](https://reactnative.dev/docs/environment-setup).  (Use the tab for React Native CLI Quickstart.)

Then:

Clone this repo.  `cd` to it.

Run:

`yarn install`

`yarn pod`

`yarn ios` or `yarn android`

## Unit tests

Run:

`yarn test`

Tests are written with the Jest framework.

Files related to testing are found in the `__tests__/` directory.

Testing, although not exhaustive, touch on most features, including
- data request and response handling, and related state update
- form handling
- asynchronous ui events

## App modules

Custom application modules are found in the `app/` directory.

`app/AppEntry.js` is the main entry point for the app.

App modules are written in TypeScript (except for the svg modules which were generated outside this project).  This was my first TypeScript project so I first authored the app in ES6+ and then refactored to TypeScript.

All React components are written as functional components rather than Class based components. (My prior work was mostly in Class components).

Some consideration to component re-render efficiency was taken. By leveraging `useCallback` and `useRef`, components avoid unnecessarily passing new functions and objects to child component, and avoid triggering useless re-renders. Further re-render optimization can be achieved with judicious use of `React.memo`.

This app uses `react-redux` hooks.  `app/reduxSetup.js` exports a `registerReducer` function to demonstrate how to co-located reducer logic alongside related feature code without having to import that feature reducer in the redux store creation file.  This provides a basis for a more elegant dependency map than a basic redux setup.  In practice, when I write a new reducer, I can import `registerReducer` to it, rather than having to import the reducer to the redux setup.

## App features

- Goldbelly look and feel
- text input
	- return key submits
- submit button
	- takes on a loading state so it becomes unpressable and it's text/appearance changes
- a new submission appears immediately as a list item in a loading state.  Meanwhile, the app requests the short url from the network, and the UI updates when that request succeeds
- submissions of previously submitted urls skip the network request phase and instead just moves the display of that item to the top of list.  A timeout based loading state is implemented in this case to make the UX consistent
- the list scrolls to the top when a valid url is submitted
- an animated toast message appears when an invalid url is submitted
- retrieve previous submission from the network upon app launch
- the last submitted item in the session appears highlighted at the top of the list
- different items on the list have different background colors
- a copy to clipboard button on each list item
- a delete button on each item
- each item displays a shortened url along with its original url

## What next?

This project was a rush job to demonstrate core React-Native mastery.  Time constraints did not permit innumerable enhancements and optimizations.  If I were to continue developing this app, here are some things I would work on and implement:

- splash screens
- homescreen icons for Android and iOs
- aggregating common styles
- responsive styling to optimize appearance across various form factors
- a test coverage tool
- exhaustive tests
- delving into the Apple and Google developer web platforms to setup the app AppStore and PlayStore, and get the necessary certificates
- setuping a deployment system with Fastlane
- refactoring test files from JS to TypeScript
- organizing `app/` as feature based subdirectories
- a navigation system
- Codepush
- a CI to verify tests, verify linting, and deploy
- react-native-web
- sentry.io for error crash tracking
- analytics
- screen reader accessibility
- network error handling
- orientation change handling
- svg to react component script
- custom fonts
- audit naming of files/variables/etc throughout codebase
- secure keys


## Are you having a problem building ios with `yarn ios` ?

Do you use `nvm`?  Try `nvm unalias default`
[(discussion)](https://github.com/react-native-community/upgrade-support/issues/138#issuecomment-855462806)

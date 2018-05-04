// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  firebase: {
    apiKey: 'AIzaSyDGw7xhTHNRWB2xG99CeXPYBm9lWYEnnbI',
    authDomain: 'stantec-twitter.firebaseapp.com',
    databaseURL: 'https://stantec-twitter.firebaseio.com',
    projectId: 'stantec-twitter',
    storageBucket: 'stantec-twitter.appspot.com',
    messagingSenderId: '295467252657'
  }
};

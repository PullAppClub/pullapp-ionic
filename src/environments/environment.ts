// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  useFirebaseEmulator: false,
  firebase: {
    projectId: 'pullapp-39406',
    appId: '1:577169499609:web:713e50ea3fca6fd9da65c8',
    databaseURL: 'https://pullapp-39406.firebaseio.com',
    storageBucket: 'pullapp-39406.appspot.com',
    locationId: 'europe-west',
    apiKey: 'AIzaSyA8bUU3e2IxS2KsgOubuMbcM4d0WIt3ieo',
    authDomain: 'pullapp-39406.firebaseapp.com',
    messagingSenderId: '577169499609',
    measurementId: 'G-D4BL14DC78',
  },
  production: false,
  mapsKey: 'AIzaSyA8bUU3e2IxS2KsgOubuMbcM4d0WIt3ieo',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

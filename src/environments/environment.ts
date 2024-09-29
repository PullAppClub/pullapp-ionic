// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const devFirebaseConfig = {
  apiKey: 'AIzaSyAJQgQaHSrc2mje3DlazLsJp7cv52S3NUc',
  authDomain: 'development-57933.firebaseapp.com',
  projectId: 'development-57933',
  storageBucket: 'development-57933.appspot.com',
  messagingSenderId: '771311771906',
  appId: '1:771311771906:web:4c5087b558444ad285a21b',
  measurementId: 'G-74PH1BQH5E',
  locationId: 'europe-west',
};

export const environment = {
  host: 'http://localhost:3000',
  useFirebaseEmulator: true,
  firebase: {
    projectId: 'pullapp-39406',
    appId: '1:577169499609:web:713e50ea3fca6fd9da65c8',
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

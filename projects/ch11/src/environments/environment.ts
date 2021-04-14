// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { AuthMode } from '../app/auth/auth.enum'

export const environment = {
  production: false,
  baseUrl: 'http://localhost:3000',
  authMode: AuthMode.CustomServer,
  firebase: {
    apiKey: 'AIzaSyA_39OnkusNS7WeMqTuhRosonMV20WntcA',
    authDomain: 'lemon-mart-007.firebaseapp.com',
    databaseURL: 'https://lemon-mart-007.firebaseio.com',
    projectId: 'lemon-mart-007',
    storageBucket: '',
    messagingSenderId: '416892066612',
    appId: '1:416892066612:web:ec2f404c18fd4bd8',
  },
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

import { AuthMode } from '../app/auth/auth.enum'

export const environment = {
  production: true,
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

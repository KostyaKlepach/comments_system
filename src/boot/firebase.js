// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app'

// Add the Firebase products that you want to use
import 'firebase/auth'
import 'firebase/database'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyBC81Y1HDcZ3WnXTOz4ANe5M4tbol-x5Mo',
  authDomain: 'quacomment.firebaseapp.com',
  databaseURL: 'https://quacomment.firebaseio.com',
  projectId: 'quacomment',
  storageBucket: 'quacomment.appspot.com',
  messagingSenderId: '230133510229',
  appId: '1:230133510229:web:046c4eea4a4f28cdeb64dc'
}

// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig)
let firebaseAuth = firebaseApp.auth()
let firebaseDb = firebaseApp.database()

export { firebaseAuth, firebaseDb }

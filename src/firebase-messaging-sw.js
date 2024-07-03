importScripts(
  'https://www.gstatic.com/firebasejs/9.8.1/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.8.1/firebase-messaging-compat.js'
);

var firebaseConfig = {
  projectId: 'pullapp-39406',
  appId: '1:577169499609:web:713e50ea3fca6fd9da65c8',
  storageBucket: 'pullapp-39406.appspot.com',
  locationId: 'europe-west',
  apiKey: 'AIzaSyA8bUU3e2IxS2KsgOubuMbcM4d0WIt3ieo',
  authDomain: 'pullapp-39406.firebaseapp.com',
  messagingSenderId: '577169499609',
  measurementId: 'G-D4BL14DC78',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.messaging();

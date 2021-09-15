import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDZwUZiGNG8nXGGmfKtLZxKqpsYvrQA6Gs",
    authDomain: "todo-web-app-2c972.firebaseapp.com",
    projectId: "todo-web-app-2c972",
    storageBucket: "todo-web-app-2c972.appspot.com",
    messagingSenderId: "575575692426",
    appId: "1:575575692426:web:269c136b0c045d33b78973",
    measurementId: "G-5X5G8505Y1"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.database();

export { db };
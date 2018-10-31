import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBdUKlJTy8xL5RMF3B0ArJ0SfZg41UUiOw",
    authDomain: "santassecretservice-9c6b2.firebaseapp.com",
    databaseURL: "https://santassecretservice-9c6b2.firebaseio.com",
    projectId: "santassecretservice-9c6b2",
    storageBucket: "santassecretservice-9c6b2.appspot.com",
    messagingSenderId: "926972670659",
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
    auth,
};
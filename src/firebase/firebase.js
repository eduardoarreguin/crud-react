import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB-NnKolmZ302_DFQkcSNxQ-lryD9gOujQ",
    authDomain: "crud-react-dacbc.firebaseapp.com",
    projectId: "crud-react-dacbc",
    storageBucket: "crud-react-dacbc.appspot.com",
    messagingSenderId: "536089338508",
    appId: "1:536089338508:web:c0799781035679e1ae51a9"
};

export const firebaseApp = firebase.initializeApp( firebaseConfig )
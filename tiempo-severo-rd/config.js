import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBGgdsJJHQBhiM7-X36krpiRQwbYI_RzE4",
    authDomain: "tiempo-severo-rd-99be7.firebaseapp.com",
    projectId: "tiempo-severo-rd-99be7",
    storageBucket: "tiempo-severo-rd-99be7.appspot.com",
    messagingSenderId: "14843021295",
    appId: "1:14843021295:web:191d437ed7e0a9f1f4981a",
    measurementId: "G-1G69EQ333R"    
}


if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
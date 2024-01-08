import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
const firebaseConfig = {
    apiKey: "AIzaSyAhqvnOg31evXgVoks0f5TTWpgHuClXvGI",
    authDomain: "movielisting-31f4c.firebaseapp.com",
    projectId: "movielisting-31f4c",
    storageBucket: "movielisting-31f4c.appspot.com",
    messagingSenderId: "679908863070",
    appId: "1:679908863070:web:0a9280b709e30398b898cf",
    databaseURL: "https://movielisting-31f4c-default-rtdb.firebaseio.com/",
};
export const app = initializeApp(firebaseConfig)
export const database = getDatabase(app);
export const auth = getAuth(app);

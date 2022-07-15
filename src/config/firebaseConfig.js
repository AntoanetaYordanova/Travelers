import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: 'travelers-744a0',
    storageBucket: 'travelers-744a0.appspot.com',
    messagingSenderId: '520609192759',
    appId: '1:520609192759:web:056789e7f6111df18258b2',
    measurementId: 'G-EKEZCL41FT',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
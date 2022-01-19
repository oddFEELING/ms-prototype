// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCPMmsvuN4Y0TKFtWJp3LCV8egwZh1QogQ',
  authDomain: 'ms-prototype-3000.firebaseapp.com',
  projectId: 'ms-prototype-3000',
  storageBucket: 'ms-prototype-3000.appspot.com',
  messagingSenderId: '53011808054',
  appId: '1:53011808054:web:139bc559776ef518477d97',
  measurementId: 'G-PXW048MQ5Y',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

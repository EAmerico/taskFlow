import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyBXhhgE5KSdDzkIAgTlxGnLj5SVExV7kOc",
  authDomain: "cursoapp-1234a.firebaseapp.com",
  projectId: "cursoapp-1234a",
  storageBucket: "cursoapp-1234a.firebasestorage.app",
  messagingSenderId: "508231063114",
  appId: "1:508231063114:web:75698bff4a2e786def78b3",
  measurementId: "G-1HKG8CBKPN"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
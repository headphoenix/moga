import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC0H4MAd5PfLeWZ-tQU-3-xvoJfqI2WvbQ",
    authDomain: "moga-ce0f4.firebaseapp.com",
    databaseURL: "https://moga-ce0f4-default-rtdb.firebaseio.com",
    projectId: "moga-ce0f4",
    storageBucket: "moga-ce0f4.appspot.com",
    messagingSenderId: "222081379346",
    appId: "1:222081379346:web:395acd28ac5e0e9c4ffccb"
  };

  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);

  
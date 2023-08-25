import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFvb7Y993YzA29ELowMSLx6x8mg_eMfDc",
  authDomain: "crud-992ed.firebaseapp.com",
  projectId: "crud-992ed",
  storageBucket: "crud-992ed.appspot.com",
  messagingSenderId: "895213859433",
  appId: "1:895213859433:web:60809acb233c2e72eae8f8",
  measurementId: "G-RKC2SEZXFG",
};

  const app = initializeApp(firebaseConfig);


  export const db = getFirestore(app);
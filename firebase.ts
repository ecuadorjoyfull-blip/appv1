import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAyEpQEAbQtc8nVBldtd_m7DYcSXtD1wvA",
  authDomain: "contenthub-85bbe.firebaseapp.com",
  projectId: "contenthub-85bbe",
  storageBucket: "contenthub-85bbe.firebasestorage.app",
  messagingSenderId: "40132079593",
  appId: "1:40132079593:web:c37c8bd6dad6bc7873a578"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);

// Exportamos la Base de Datos para poder usarla en otras partes
export const db = getFirestore(app);
// Imports via CDN (funciona no navegador)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔑 Configuração do Firebase (a SUA, sem mudar nada)
const firebaseConfig = {
  apiKey: "AIzaSyBp_mqQKIps49q48ilqIsvvKle3I2Rjgag",
  authDomain: "seria-lumina.firebaseapp.com",
  projectId: "seria-lumina",
  storageBucket: "seria-lumina.firebasestorage.app",
  messagingSenderId: "388959223244",
  appId: "1:388959223244:web:15f1f9cc98a052fd397169"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Serviços que vamos usar
export const auth = getAuth(app);
export const db = getFirestore(app);

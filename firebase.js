import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBp_mqQKIps49q48ilqIsvvKle3I2Rjgag",
  authDomain: "seria-lumina.firebaseapp.com",
  projectId: "seria-lumina",
  storageBucket: "seria-lumina.appspot.com",
  messagingSenderId: "388959223244",
  appId: "1:388959223244:web:15f1f9cc98a052fd397169"
};

// 🔥 inicializa o app
export const app = initializeApp(firebaseConfig);

// 🔐 exporta auth também
export const auth = getAuth(app);

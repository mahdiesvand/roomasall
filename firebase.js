import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBmV0ikTOiXmtXjG4PhIbJcTxkhP5A",
  authDomain: "roomasal.firebaseapp.com",
  databaseURL: "https://roomasal-default-rtdb.firebaseio.com",
  projectId: "roomasal",
  storageBucket: "roomasal.firebasestorage.app",
  messagingSenderId: "74039115594",
  appId: "1:74039115594:web:18fb78cfe77207f18c4bb3"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

import {
  getAuth,
  signInAnonymously
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

// تنظیمات Firebase
const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "PROJECT.firebaseapp.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

// راه‌اندازی
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// ورود مهمان
await signInAnonymously(auth);

// نام کاربر
const username = localStorage.getItem("username") || "مهمان";

// عناصر صفحه
const messages = document.getElementById("messages");
const text = document.getElementById("text");

// ارسال پیام
window.send = async function () {

  if (text.value.trim() === "") return;

  await addDoc(collection(db, "messages"), {
    name: username,
    text: text.value,
    time: serverTimestamp()
  });

  text.value = "";
};

// دریافت لحظه‌ای پیام‌ها
const q = query(collection(db, "messages"), orderBy("time"));

onSnapshot(q, (snapshot) => {

  messages.innerHTML = "";

  snapshot.forEach((doc) => {

    const data = doc.data();

    const div = document.createElement("div");

    div.className = "msg";

    if (data.name === username)
      div.classList.add("me");

    div.innerHTML =
      `<b>${data.name}</b><br>${data.text}`;

    messages.appendChild(div);

  });

  messages.scrollTop = messages.scrollHeight;

});

import { initializeApp } 
from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

import { 
getFirestore,
collection,
addDoc,
query,
orderBy,
onSnapshot,
serverTimestamp,
doc,
setDoc,
deleteDoc
}
from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";


import {
getAuth,
signInAnonymously
}
from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";



// اطلاعات Firebase خودت
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmV0ikTOiXmtibjuXgJ4PhIbJcTxkhP5A",
  authDomain: "roomasal.firebaseapp.com",
  databaseURL: "https://roomasal-default-rtdb.firebaseio.com",
  projectId: "roomasal",
  storageBucket: "roomasal.firebasestorage.app",
  messagingSenderId: "74039115594",
  appId: "1:74039115594:web:18fb78cfe77207f18c4bb3",
  measurementId: "G-T9W22HHGBF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



// شروع Firebase

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);



// ورود مهمان

await signInAnonymously(auth);



// نام کاربر

const username =
localStorage.getItem("username") || "مهمان";



// عناصر صفحه

const messages =
document.getElementById("messages");

const text =
document.getElementById("text");

const online =
document.getElementById("online");




// کاربر آنلاین

const uid = auth.currentUser.uid;


await setDoc(
doc(db,"onlineUsers",uid),
{
name:username,
online:true
}
);




// خروج کاربر

window.addEventListener(
"beforeunload",
()=>{

deleteDoc(
doc(db,"onlineUsers",uid)
);

});




// تعداد آنلاین‌ها

onSnapshot(
collection(db,"onlineUsers"),
(snapshot)=>{

online.innerHTML =
"🟢 آنلاین: " + snapshot.size;

});




// ارسال پیام

window.send = async function(){

if(text.value.trim()=="")
return;


await addDoc(
collection(db,"messages"),
{

name:username,

text:text.value,

time:serverTimestamp()

});


text.value="";

};





// دریافت پیام‌ها

const q = query(

collection(db,"messages"),

orderBy("time")

);



onSnapshot(q,(snapshot)=>{


messages.innerHTML="";


snapshot.forEach((doc)=>{


let data=doc.data();


let div=document.createElement("div");


div.className="msg";



if(data.name==username){

div.classList.add("me");

}



div.innerHTML =
`
<b>${data.name}</b>
<br>
${data.text}
`;



messages.appendChild(div);



});


messages.scrollTop =
messages.scrollHeight;



});

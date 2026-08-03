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
const firebaseConfig = {

apiKey: "YOUR_API_KEY",

authDomain: "YOUR_PROJECT.firebaseapp.com",

projectId: "YOUR_PROJECT_ID",

storageBucket: "YOUR_PROJECT.appspot.com",

messagingSenderId: "YOUR_SENDER_ID",

appId: "YOUR_APP_ID"

};



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

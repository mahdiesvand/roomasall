import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


// اطلاعات Firebase خودت را اینجا بگذار
const firebaseConfig = {

apiKey: "API_KEY",

authDomain: "PROJECT.firebaseapp.com",

databaseURL: "https://PROJECT-default-rtdb.firebaseio.com",

projectId: "PROJECT",

storageBucket: "PROJECT.appspot.com",

messagingSenderId: "SENDER_ID",

appId: "APP_ID"

};


const app = initializeApp(firebaseConfig);

const db = getDatabase(app);


const messages = document.getElementById("messages");

const online = document.getElementById("online");


online.innerHTML="متصل شد ✅";


const messagesRef = ref(db,"messages");



// دریافت پیام‌ها

onValue(messagesRef,(snapshot)=>{


messages.innerHTML="";


snapshot.forEach((item)=>{


let data=item.val();


let div=document.createElement("div");

div.className="msg";

div.innerHTML=data.text;


messages.appendChild(div);


});


});




// ارسال پیام

document.getElementById("sendBtn").onclick=function(){


let input=document.getElementById("text");


if(input.value.trim()=="") return;



push(messagesRef,{

text:input.value,

user:localStorage.getItem("user") || "کاربر"

});



input.value="";


                        }

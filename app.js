alert("APP JS اجرا شد");
import { db } from "./firebase.js";
alert("app.js جدید اجرا شد");
import {
    ref,
    push,
    onChildAdded
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-database.js";


const messagesRef = ref(db, "messages");
alert("اتصال Firebase آماده است");

let user = localStorage.getItem("username") || "کاربر";


// ارسال پیام

window.sendMessage = function(){

    let input = document.getElementById("text");

    let message = input.value.trim();


    if(message === ""){
        return;
    }

alert("رسید به مرحله ذخیره");
    push(messagesRef, {

        name: user,

        text: message,

        time: Date.now()

    })
    .then(function(){

        alert("پیام در Firebase ذخیره شد");

        input.value="";

    })
    .catch(function(error){

        alert("خطای Firebase: " + error.message);

    });


};



// دریافت پیام‌ها

onChildAdded(messagesRef, (data)=>{


    let msg = data.val();


    let box = document.getElementById("messages");


    box.innerHTML += `

    <div class="message">

    <b>${msg.name}</b><br>

    ${msg.text}

    </div>

    `;


    box.scrollTop = box.scrollHeight;


});

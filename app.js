import { db } from "./firebase.js";

import {
    ref,
    push,
    onChildAdded
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";


const messagesRef = ref(db, "messages");


let user = localStorage.getItem("username") || "کاربر";




// ارسال پیام

window.sendMessage = function(){

    let input = document.getElementById("text");

    let message = input.value.trim();


    if(message === ""){
        return;
    }


    push(messagesRef, {

        name: user,

        text: message,

        time: Date.now()

    })
    .then(()=>{

        input.value = "";

    })
    .catch((error)=>{

        alert("خطای ذخیره: " + error.message);

    });

};






// دریافت پیام‌ها

onChildAdded(messagesRef,(data)=>{


    let msg = data.val();


    let box = document.getElementById("messages");


    let side = msg.name === user ? "mine" : "other";


    let time = new Date(msg.time)
    .toLocaleTimeString("fa-IR",
    {
        hour:"2-digit",
        minute:"2-digit"
    });



    box.innerHTML += `


    <div class="message ${side}">


        <b>${msg.name}</b>

        <br>

        ${msg.text}


        <small>

        ${time}

        </small>


    </div>


    `;



    box.scrollTop = box.scrollHeight;



});

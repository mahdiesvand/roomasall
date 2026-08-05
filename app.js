import { db } from "./firebase.js";

import {
    ref,
    push,
    onChildAdded
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-database.js";


const messagesRef = ref(db, "messages");

let user = localStorage.getItem("username") || "کاربر";



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

        alert("ذخیره موفق شد");
        input.value="";

    })
    .catch((error)=>{

        alert(
          "خطای Firebase:\n" +
          error.code +
          "\n" +
          error.message
        );

    });

};



onChildAdded(messagesRef,(data)=>{

    let msg=data.val();

    let box=document.getElementById("messages");

    box.innerHTML += `

    <div class="message">

    <b>${msg.name}</b><br>
    ${msg.text}

    </div>

    `;

    box.scrollTop=box.scrollHeight;

});

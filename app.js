import { db, storage } from "./firebase.js";

import {
    ref,
    push,
    onChildAdded
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";


import {
    ref as storageRef,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";



const messagesRef = ref(db, "messages");


let user = localStorage.getItem("username") || "کاربر";

let avatar = localStorage.getItem("avatar") || "🙂";




// ارسال پیام

window.sendMessage = function(){


    let input = document.getElementById("text");

    let message = input.value.trim();


    if(message === ""){
        return;
    }



    push(messagesRef,{

        name:user,

        avatar:avatar,

        text:message,

        type:"text",

        time:Date.now()

    });



    input.value="";


};






// ارسال عکس

document.getElementById("imageInput").addEventListener("change", async function(e){


    let file=e.target.files[0];


    if(!file){
        return;
    }



    let imgRef = storageRef(
        storage,
        "images/" + Date.now() + "_" + file.name
    );



    try{


        await uploadBytes(imgRef,file);


        let url = await getDownloadURL(imgRef);



        push(messagesRef,{

            name:user,

            avatar:avatar,

            image:url,

            type:"image",

            time:Date.now()

        });



    }
    catch(error){

        alert("خطای ارسال عکس: "+error.message);

    }


});






// نمایش پیام‌ها


onChildAdded(messagesRef,(data)=>{


    let msg=data.val();


    let box=document.getElementById("messages");


    let side = msg.name === user ? "mine":"other";


    let content="";



    if(msg.type==="image"){


        content = `

        <img src="${msg.image}"
        style="
        max-width:220px;
        border-radius:15px;
        ">

        `;


    }else{


        content = msg.text;


    }



    box.innerHTML += `


    <div class="message ${side}">


    <b>${msg.avatar || "🙂"} ${msg.name}</b>


    <br>


    ${content}



    <small>

    ${new Date(msg.time)
    .toLocaleTimeString("fa-IR",
    {
        hour:"2-digit",
        minute:"2-digit"
    })}

    </small>


    </div>



    `;



    box.scrollTop=box.scrollHeight;



});

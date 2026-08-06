import { db } from "./firebase.js";

import {
    ref,
    set,
    onValue,
    onDisconnect
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";


let user = localStorage.getItem("username") || "کاربر";


let onlineRef = ref(db, "online/" + user);


// ثبت آنلاین بودن
set(onlineRef, {
    name:user,
    time:Date.now()
});


// حذف خودکار هنگام خروج
onDisconnect(onlineRef).remove();



// نمایش لیست کاربران آنلاین

onValue(ref(db,"online"),(snap)=>{


    let box = document.getElementById("onlineUsers");


    let countBox = document.getElementById("online");


    let html = "";

    let count = 0;



    snap.forEach((item)=>{


        count++;


        let data = item.val();



        html += `

        <div class="online-user">

        🟢 ${data.name}

        </div>

        `;


    });



    if(box){

        box.innerHTML = html;

    }



    if(countBox){

        countBox.innerHTML =
        "🟢 آنلاین: " + count;

    }



});

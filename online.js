import { db } from "./firebase.js";

import {
    ref,
    set,
    onValue,
    onDisconnect
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";



// گرفتن نام کاربر
let user = localStorage.getItem("username") || "کاربر";


// مسیر کاربر آنلاین
let onlineRef = ref(
    db,
    "online/" + encodeURIComponent(user)
);



// ثبت آنلاین بودن
set(onlineRef, {

    name: user,

    time: Date.now()

});



// حذف خودکار وقتی خارج شد
onDisconnect(onlineRef).remove();




// خواندن کاربران آنلاین

onValue(ref(db,"online"), (snap)=>{


    let list = document.getElementById("onlineUsers");

    let countBox = document.getElementById("online");


    let html = "";

    let count = 0;



    snap.forEach((item)=>{


        count++;


        let data = item.val();



        if(data && data.name){


            html += `

            <div class="online-user">

            🟢 ${data.name}

            </div>

            `;


        }


    });




    // نمایش لیست سمت راست

    if(list){

        list.innerHTML = html;

    }



    // نمایش تعداد در هدر

    if(countBox){

        countBox.innerHTML =
        "🟢 آنلاین: " + count;

    }



});

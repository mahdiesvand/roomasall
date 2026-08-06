import { db } from "./firebase.js";

import {
    ref,
    set,
    onValue
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";


let user = localStorage.getItem("username") || "کاربر";


let onlineRef = ref(db, "online/" + user);


set(onlineRef, true);


onValue(ref(db,"online"),(snap)=>{

    let count = 0;

    snap.forEach(()=>{

        count++;

    });


    let box = document.getElementById("online");

    if(box){

        box.innerHTML = "🟢 آنلاین: " + count;

    }

});

import { db } from "./firebase.js";

import {
ref,
set,
onDisconnect,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-database.js";



let username =
localStorage.getItem("username") || "کاربر";


let avatar =
localStorage.getItem("avatar") || "🙂";



// شناسه ساده کاربر

let userId =
localStorage.getItem("userId");



if(!userId){

userId =
"u_" + Date.now();

localStorage.setItem("userId",userId);

}





const userRef = ref(db,"users/"+userId);




// ثبت کاربر

set(userRef,{

name:username,

avatar:avatar,

online:true,

lastSeen:serverTimestamp()

});




// هنگام خروج

onDisconnect(userRef).set({

name:username,

avatar:avatar,

online:false,

lastSeen:serverTimestamp()

});

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

import {
getDatabase,
ref,
push,
set,
onValue,
get
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";


import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";



const firebaseConfig = {

apiKey: "AIzaSyBmV0ikTOiXmtibjuXgJ4PhIbJcTxkhP5A",

authDomain: "roomasal.firebaseapp.com",

databaseURL: "https://roomasal-default-rtdb.firebaseio.com",

projectId: "roomasal",

storageBucket: "roomasal.firebasestorage.app",

messagingSenderId: "74039115594",

appId: "1:74039115594:web:18fb78cfe77207f18c4bb3"

};



const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

const auth = getAuth(app);



let currentUser = null;



function showChat(){

document.getElementById("loginBox").style.display="none";

document.getElementById("chatBox").style.display="block";

}



window.register = function(){


let name = document.getElementById("name").value;

let photo = document.getElementById("photo").value;

let email = document.getElementById("email").value;

let password = document.getElementById("password").value;



createUserWithEmailAndPassword(auth,email,password)

.then((userCredential)=>{


let uid = userCredential.user.uid;


set(ref(database,"users/"+uid),{

name:name,

photo:photo,

email:email

});


alert("ثبت نام موفق شد");


})

.catch((error)=>{

alert(error.message);

});


};
id="b2script"
window.login = function(){


let email = document.getElementById("email").value;

let password = document.getElementById("password").value;



signInWithEmailAndPassword(auth,email,password)

.then(()=>{

alert("ورود موفق شد");

})


.catch((error)=>{

alert(error.message);

});


};





onAuthStateChanged(auth,(user)=>{


if(user){


currentUser = user;


get(ref(database,"users/"+user.uid))

.then((snapshot)=>{


let data = snapshot.val();


if(data){


document.getElementById("myName").innerHTML = data.name;


document.getElementById("myPhoto").src = data.photo;


}


showChat();


});


}


});






window.sendMessage = function(){


let text = document.getElementById("message").value;



if(text=="") return;



let msg = push(ref(database,"messages"));



set(msg,{


uid:currentUser.uid,

name:document.getElementById("myName").innerHTML,

photo:document.getElementById("myPhoto").src,

text:text,

time:Date.now()


});



document.getElementById("message").value="";


};






onValue(ref(database,"messages"),(snapshot)=>{


let chat = document.getElementById("chat");


chat.innerHTML="";



snapshot.forEach((item)=>{


let data = item.val();



chat.innerHTML += `


<div class="message">


<img src="${data.photo}" width="40" height="40">


<b>${data.name}</b>


<br>


${data.text}


<br>


<small>

${new Date(data.time).toLocaleTimeString("fa-IR")}

</small>


</div>


`;



});


});

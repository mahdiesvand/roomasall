import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

import { 
getDatabase,
ref,
push,
set,
onValue
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";


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



window.sendMessage = function(){

let name = document.getElementById("name").value;
let text = document.getElementById("message").value;


if(name==="" || text===""){
alert("نام و پیام را وارد کنید");
return;
}


let messageRef = push(ref(database,"messages"));


set(messageRef,{
name:name,
text:text,
time:Date.now()
});


document.getElementById("message").value="";

};



const chat = document.getElementById("chat");


onValue(ref(database,"messages"),(snapshot)=>{


chat.innerHTML="";


snapshot.forEach((item)=>{


let data=item.val();


chat.innerHTML += `

<div class="message">

<b>${data.name}</b><br>

${data.text}

<span class="time">
${new Date(data.time).toLocaleTimeString("fa-IR")}
</span>

</div>

`;

});


});

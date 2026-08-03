import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


const firebaseConfig = {
  apiKey: "اینجا apiKey خودت",
  authDomain: "اینجا authDomain خودت",
  databaseURL: "اینجا databaseURL خودت",
  projectId: "اینجا projectId خودت",
  storageBucket: "اینجا storageBucket خودت",
  messagingSenderId: "اینجا messagingSenderId خودت",
  appId: "اینجا appId خودت"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


const messages = document.getElementById("messages");
const online = document.getElementById("online");


online.innerHTML = "متصل شد ✅";


const messagesRef = ref(db, "messages");


onValue(messagesRef, (snapshot)=>{

messages.innerHTML="";

snapshot.forEach((item)=>{

let data=item.val();

let div=document.createElement("div");
div.className="msg";
div.innerHTML=data.text;

messages.appendChild(div);

});

});



window.send = function(){

let input=document.getElementById("text");

if(input.value.trim()=="") return;


push(messagesRef,{
text:input.value
});


input.value="";

}

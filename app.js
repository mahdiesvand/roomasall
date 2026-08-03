import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


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
const db = getDatabase(app);


window.login = function(){

let name = document.getElementById("username").value;


if(name.trim()==""){
alert("نام کاربری وارد کنید");
return;
}


localStorage.setItem("asalUser",name);


set(ref(db,"users/"+name),{
username:name,
online:true
});


window.location="chat.html";

}

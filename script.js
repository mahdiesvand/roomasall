window.send = function(){

let text = document.getElementById("text").value;

if(text == ""){
alert("پیام خالی است");
return;
}

let box = document.getElementById("messages");

let msg = document.createElement("div");
msg.className = "msg";
msg.innerHTML = text;

box.appendChild(msg);

document.getElementById("text").value = "";

}

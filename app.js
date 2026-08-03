function login(){

let name = document.getElementById("username").value;


if(name.trim()==""){

alert("لطفاً نام کاربری وارد کنید");

return;

}


localStorage.setItem("asalUser",name);


window.location="chat.html";


}

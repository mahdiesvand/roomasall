function login(){

    let name = document.getElementById("username").value;

    if(name.trim() === ""){
        alert("نام کاربری وارد کنید");
        return;
    }

    localStorage.setItem("asalUser", name);

    window.location.href = "chat.html";

}

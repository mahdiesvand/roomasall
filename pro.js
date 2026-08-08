/*
PRO SYSTEM
نسخه اولیه
*/

const PRO_PRICE = 50000;

// وضعیت فعلی کاربر
let userAccount = {
isPro: false,
proExpire: null
};

/* =========================
بررسی وضعیت PRO
========================= */

function checkProStatus(){

const savedAccount =
    localStorage.getItem("gameAccount");

if(savedAccount){

    try{

        userAccount = JSON.parse(savedAccount);

    }catch(error){

        console.log("خطا در اطلاعات حساب");

        userAccount = {
            isPro:false,
            proExpire:null
        };
    }
}


// بررسی تاریخ پایان PRO
if(
    userAccount.isPro &&
    userAccount.proExpire
){

    const now = Date.now();

    if(now >= userAccount.proExpire){

        userAccount.isPro = false;
        userAccount.proExpire = null;

        saveAccount();

        alert("دوره PRO شما به پایان رسیده است.");
    }
}

updateProUI();

}

/* =========================
ذخیره حساب
========================= */

function saveAccount(){

localStorage.setItem(
    "gameAccount",
    JSON.stringify(userAccount)
);

}

/* =========================
فعال کردن PRO آزمایشی
========================= */

function activateDemoPro(){

userAccount.isPro = true;

// PRO آزمایشی: یک روز
userAccount.proExpire =
    Date.now() + (24 * 60 * 60 * 1000);

saveAccount();

updateProUI();

alert(
    "⭐ PRO آزمایشی برای شما فعال شد."
);

}

/* =========================
وضعیت PRO
========================= */

function isUserPro(){

return userAccount.isPro === true;

}

/* =========================
رابط کاربری
========================= */

function updateProUI(){

const proButton =
    document.querySelector(".pro button");

if(!proButton){
    return;
}


if(isUserPro()){

    proButton.textContent =
        "⭐ PRO فعال است";

    proButton.disabled = true;

}else{

    proButton.textContent =
        "فعال‌سازی PRO";

    proButton.disabled = false;
}

}

/* =========================
خرید PRO
========================= */

function buyPro(){

if(isUserPro()){

    alert(
        "حساب شما هم‌اکنون PRO است."
    );

    return;
}


const confirmBuy =
    confirm(
        "فعال‌سازی PRO به مبلغ " +
        PRO_PRICE.toLocaleString("fa-IR") +
        " تومان؟"
    );


if(!confirmBuy){
    return;
}


/*
   فعلاً پرداخت واقعی نداریم.
   بعداً اینجا درگاه پرداخت
   و تأیید تراکنش قرار می‌گیرد.
*/

alert(
    "درگاه پرداخت در مرحله بعد متصل می‌شود."
);

}

/* =========================
اجرا هنگام باز شدن صفحه
========================= */

document.addEventListener(
"DOMContentLoaded",
function(){

    checkProStatus();

}

);

/* =========================
دسترسی از HTML
========================= */

window.buyPro = buyPro;
window.activateDemoPro = activateDemoPro;
window.isUserPro = isUserPro;

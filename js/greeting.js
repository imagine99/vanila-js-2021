const form=document.querySelector(".js-form"),
    input=form.querySelector("input"),
    greeting=document.querySelector(".js-greeting"),
    todoForm=document.querySelector(".js-toDoForm");

const USER_LS="curtUser",
    SHOWING_CN="showing";

function saveName(text){
    localStorage.setItem(USER_LS,text);
}
function handleSubmit(event){
    event.preventDefault();
    const curtValue=input.value;
    paintGreeting(curtValue);
    saveName(curtValue);
}
function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit",handleSubmit);
}
function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    form.classList.remove("js-form");
    greeting.classList.add(SHOWING_CN);
    todoForm.classList.add(SHOWING_CN);
    todoForm.classList.add("toDoForm");
    const date= new Date();
    if (date.getHours>=5&&date.getHours<12){
        greeting.innerText=`Good Morning!, ${text}`
    }
    else if(date.getHours>=12&&date.getHours<20)
    {
        greeting.innerText=`Good Afternoon!, ${text}`
    } 
    else{
        greeting.innerText=`Have a good night!, ${text}`
    }   
}
function loadName(){
    const curtUser=localStorage.getItem(USER_LS);
    if(curtUser===null){
        askForName();

    } else{
        paintGreeting(curtUser);
    }
}
function init(){
    loadName();
}
init();
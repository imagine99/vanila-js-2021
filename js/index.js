const title = document.querySelector("#title");
const CLICK_CLASS="clicked";
//const BASE_COLOR="rgb(52, 73, 94)";
//const OTHER_COLOR="#7f8c8d";
function handleClick(){
    title.classList.toggle(CLICK_CLASS);
    /*const hasClass=title.classList.contains(CLICK_CLASS);
    if(hasClass){
        title.classList.remove(CLICK_CLASS);
    } else{
        title.classList.add(CLICK_CLASS);
    }*/
}
function init(){
    title.addEventListener("click",handleClick);
}
init();
const buttons = document.querySelectorAll("button");


const selectHandeler = (event) => {
    const level = event.target.innerText.toLowerCase();
    localStorage.setItem("level",level);
     window.location.assign("/");
}; 


buttons.forEach((button) => {
    button.addEventListener("click",selectHandeler);
});
window.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login");
    const username = document.getElementById("username");
    const errorbox = document.getElementById("error");

    form.addEventListener("submit", (event) => {
        event.preventDefault();


        window.commjs.login(username.value)
            .then(() => {
                window.location = "formation.html";
            }).catch((e)=>{
                console.log(e);
                errorbox.innerText = e.message;
                errorbox.style.display = "block";
            });
    });
});

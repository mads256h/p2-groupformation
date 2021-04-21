"use strict";

window.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login");
    const username = document.getElementById("username");
    const errorbox = document.getElementById("error");

    form.addEventListener("submit", (event) => {
        event.preventDefault();


        window.commjs.login(username.value)
            .then((response) => {
                if (response.status === "OK") {
                    window.location = "/formation.html"
                }
                else {
                    console.log(response);
                    errorbox.innerText = response.message;
                    errorbox.style.display = "block";
                }
            });
    });


});

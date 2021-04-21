"use strict";

window.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login");
    const username = document.getElementById("username");

    form.addEventListener("submit", (event) => {
        event.preventDefault();


        window.commjs.login(username.value)
            .then((response) => {
                if (response.status === "OK") {
                    window.location = "/formation.html"
                }
                else {
                    console.log(response);
                    alert(response.message)
                }
            });
    });


});

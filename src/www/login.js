"use strict";

window.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login");
    const username = document.getElementById("username");

    form.addEventListener("submit", (event) => {
        event.preventDefault();


        fetch("/login", {
            method: "POST",
            body: "username=" + username.value,
            headers:
            {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
            .then((response) => response.json())
            .then((response) => {if (response.status === "OK") {window.location = "/formation.html"} else {alert(response.message)} });
    });


});

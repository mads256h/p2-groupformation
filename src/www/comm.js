(function () {
    function postRequest(url, postData) {
        return fetch("api/" + url, {
            method: "POST",
            body: new URLSearchParams(postData),
            headers: {"Content-Type": "application/x-www-form-urlencoded"}
        }).then((response) => response.json())
            .then((response) => {if (response.status !== "OK") {throw new Error(response.message)} return response;});
    }

    function getRequest(url, data = {}) {
        return fetch(`api/${url}?${new URLSearchParams(data)}`)
            .then((response) => response.json())
            .then((response) => {if (response.status !== "OK") {throw new Error(response.message)} return response;});
    }

    function login(username) {
        return postRequest("login", {username});
    }

    function me() {
        return getRequest("me");
    }

    function mygroup() {
        return getRequest("mygroup");
    }

    function rankedgroups() {
        return getRequest("rankedgroups");
    }

    function leavegroup() {
        return getRequest("leavegroup");
    }

    function invitegroup(group) {
        return postRequest("invitegroup", {groupid: group.id});
    }


    const callbacks = [];
    function registerUpdateHandler(callback) {
        callbacks.push(callback);
    }

    function executeCallbacks() {
        callbacks.forEach((c) => c());
    }

    window.addEventListener("load", () => {
        // Start websocket
        const socket = new WebSocket("ws://" + window.location.host + window.location.pathname);
        socket.onerror = (e) => {
            console.error("Could not create websocket!", e);
            console.log("Using a timer instead!");
            setInterval(executeCallbacks, 1000);
        }
        socket.onopen = (e) => console.log("Opened websocket", e);
        socket.onclose = (e) => console.log("Closed websocket", e);

        socket.onmessage = executeCallbacks;

        // Start with calling the callbacks
        executeCallbacks();
    });


    if (window.commjs) {console.error("commjs loaded twice"); alert("commjs loaded twice"); return;}
    window.commjs = {login, me, mygroup, rankedgroups, leavegroup, invitegroup, registerUpdateHandler};
}());

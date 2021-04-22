(function() {
    function postRequest(url, postData) {
        return fetch("api/" + url, {
            method: "POST",
            body: new URLSearchParams(postData),
            headers: {"Content-Type": "application/x-www-form-urlencoded"}
        }).then((response) => response.json());
    }

    function getRequest(url, data = {}) {
        return fetch(`api/${url}?${new URLSearchParams(data)}`)
            .then((response) => response.json());
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


    function registerUpdateHandler(callback) {
        const socket = new WebSocket("ws://" + window.location.host);
        socket.onerror = (e) => console.error(e);
        socket.onopen = (e) => console.log("Opened websocket", e);
        socket.onclose = (e) => console.log("Closed websocket", e);

        socket.onmessage = () => callback();
    }


    window.commjs = {login, me, mygroup, rankedgroups, leavegroup, invitegroup, registerUpdateHandler};
}());

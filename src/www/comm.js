
/**
 * @description Formation website server communication module.
 * @module comm
 * @see module:comm
 * @author mads256h
 */

(function() {
    // Requests

    /**
     * @public
     * @memberof module:comm
     * @summary Send a login request
     * @description This request sets a session cookie in the browser.
     * This cookie is required in the all the other requests.
     * @param {string} username The name of the student to log in as
     * @returns {Promise<undefined>} The response
     * @throws {Error} The status of the response is not "OK"
     */
    function login(username) {
        return postRequest("login", {username});
    }

    /**
     * @public
     * @memberof module:comm
     * @summary Get student information about the logged in student
     * @description This request requires that a valid session cookie has been set
     * @returns {Promise<module:group~Student>} A promise with the student
     * @throws {Error} The status of the response is not "OK"
     */
    function me() {
        return getRequest("me");
    }

    /**
     * @public
     * @memberof module:comm
     * @summary Get group information about the logged in student
     * @description This request requires that a valid session cookie has been set
     * @returns {Promise<module:group~Group>} A promise with the students group
     * @throws {Error} The status of the response is not "OK"
     */
    function mygroup() {
        return getRequest("mygroup");
    }

    /**
     * @typedef {object} RankedGroup
     * @property {module:group~Group} group The group
     * @property {number} value The value of the group
     * @throws {Error} The status of the response is not "OK"
     */

    /**
     * @public
     * @memberof module:comm
     * @summary Get a list of groups with a score
     * @description This request requires that a valid session cookie has been set
     * @returns {Promise<RankedGroup[]>} A promise with the ranked groups
     * @throws {Error} The status of the response is not "OK"
     */
    function rankedgroups() {
        return getRequest("rankedgroups");
    }

    /**
     * @public
     * @memberof module:comm
     * @summary Leave the current group
     * @description This request requires that a valid session cookie has been set
     * @returns {Promise<undefined>} A promise
     * @throws {Error} The status of the response is not "OK"
     */
    function leavegroup() {
        return getRequest("leavegroup");
    }

    /**
     * @public
     * @memberof module:comm
     * @summary Invite a group
     * @description This request requires that a valid session cookie has been set
     * @param {module:comm~Group} group The group to invite
     * @returns {Promise<undefined>} A promise
     * @throws {Error} The status of the response is not "OK"
     */
    function invitegroup(group) {
        return postRequest("invitegroup", {groupid: group.id});
    }


    /**
     * @summary Send a post request to url with postData
     * @param {string} url The url to send the request to
     * @param {object} postData The post data to send
     * @returns {Promise<any>} The response
     * @throws {Error} The status of the response is not "OK"
     */
    function postRequest(url, postData) {
        return fetch("api/" + url, {
            method: "POST",
            body: new URLSearchParams(postData),
            headers: {"Content-Type": "application/x-www-form-urlencoded"}
        }).then((response) => response.json())
            .then((response) => extractResponse(response));
    }

    /**
     * @summary Send a get request to url wdata
     * @param {string} url The url to send the request to
     * @param {object} data The get data to send
     * @returns {Promise<any>} The response
     * @throws {Error} The status of the response is not "OK"
     */
    function getRequest(url, data = {}) {
        return fetch(`api/${url}?${new URLSearchParams(data)}`)
            .then((response) => response.json())
            .then((response) => extractResponse(response));
    }

    /**
     * @summary Throws an error if response.status !== "OK"
     * @param {object} response The response to check
     * @returns {any} response.response if no error occured
     * @throws {Error} If response.status !== "OK"
     */
    function extractResponse(response) {
        if (response.status !== "OK") {
            throw new Error(response.message);
        }

        return response.response;
    }

    // Update callbacks
    //
    /**
     * @public
     * @memberof module:comm
     * @callback updateCallback
     */

    /**
     * @summary An array of registered callbacks
     * @type {updateCallback}
     */
    const callbacks = [];

    /**
     * @public
     * @memberof module:comm
     * @summary Register an update handler to be called every time the server has an update
     * @param {updateCallback} callback The function to call on update
     */
    function registerUpdateHandler(callback) {
        callbacks.push(callback);
    }

    // When everything has loaded start the websocket and run the callbacks once
    window.addEventListener("load", () => {
        // Chromium throws and firefox does an socket.onerror ;)
        try {
            // Dont do anything if no callbacks are registered
            if (callbacks.length === 0) {
                return;
            }

            // Start websocket
            const socket = new WebSocket("ws://" + window.location.host + window.location.pathname);
            socket.onerror = websocketError;
            socket.onopen = (e) => console.log("Opened websocket", e);
            socket.onclose = (e) => console.log("Closed websocket", e);

            socket.onmessage = executeCallbacks;
        }
        catch (e) {
            websocketError(e);
        }

        // Start with calling the callbacks
        executeCallbacks();
    });

    /**
     * @summary On websocket error
     * @param {Error} e The error
     */
    function websocketError(e) {
        console.error("Could not create websocket!", e);
        console.log("Using a timer instead!");
        setInterval(executeCallbacks, 1000);
    }

    /**
     * @summary Executes all update-callbacks
     */
    function executeCallbacks() {
        callbacks.forEach((c) => c());
    }


    window.commjs = {login, me, mygroup, rankedgroups, leavegroup, invitegroup, registerUpdateHandler};
}());

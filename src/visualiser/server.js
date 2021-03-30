#!/usr/bin/node

const {WebServer, HttpError} = require("../webserver");
const fs = require("fs");


const webserver = new WebServer("localhost", 3000, ".", "/visualiser/index.html");

webserver.addPostHandler("/ls", lsHandler);
webserver.run();


function lsHandler(postData, request) {
    return fs.readdirSync(".");
}

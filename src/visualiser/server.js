#!/usr/bin/node

const {WebServer, HttpError} = require("../webserver");
const fsp = require("fs").promises;


const webserver = new WebServer("localhost", 3000, __dirname);

webserver.addPostHandler("/ls", lsHandler);
webserver.run();


function lsHandler(postData, request) {
    return fsp.readdir(__dirname);
}

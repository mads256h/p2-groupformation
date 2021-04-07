#!/usr/bin/node

const {WebServer, HttpError} = require("../webserver");
const path = require("path");
const fsp = require("fs").promises;


const webserver = new WebServer("localhost", 3000, __dirname);

webserver.addGetHandler("/ls", lsHandler);
webserver.run();


function lsHandler(getParams, request) {
    return fsp.readdir(path.join(__dirname, "/data"));
}

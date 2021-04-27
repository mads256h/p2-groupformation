const {WebServer, HttpError} = require("./webserver");
const fetch = require("node-fetch");


test("WebServer arguments", () => {
    expect(() => new WebServer("localhost", 3000, ".")).not.toThrow();

    expect(() => new WebServer(0, 3000, "test")).toThrow(TypeError);
    expect(() => new WebServer("localhost", undefined, "test")).toThrow(TypeError);
    expect(() => new WebServer("localhost", 3000, undefined)).toThrow(TypeError);
    expect(() => new WebServer("localhost", 3000, "test", null)).toThrow(TypeError);

    expect(() => new WebServer("", 3000, "test")).toThrow(RangeError);
    expect(() => new WebServer("localhost", 3000, "")).toThrow(RangeError);
});

// TODO: How can we test file requests??
const server = new WebServer("localhost", 25663, ".");

server.addGetHandler("/getok", getHandlerOk);
server.addGetHandler("/geterr", getHandlerErr);
server.addGetHandler("/getecho", getHandlerEcho);

server.addPostHandler("/postok", postHandlerOk);
server.addPostHandler("/posterr", postHandlerErr);
server.addPostHandler("/postecho", postHandlerEcho);

beforeAll(() => {
    return server.run();
});

afterAll(() => {
    return server.stop();
});

it("WebServer get ok status 200", () => {
    expect.assertions(1);

    return get("/getok")
        .then(response => expect(response.status).toEqual(200));
});

it("WebServer get ok", () => {
    expect.assertions(1);

    return get("/getok")
        .then(response => response.json())
        .then(response => expect(response.status).toEqual("OK"));
});


it("WebServer get err status 403", () => {
    expect.assertions(1);

    return get("/geterr")
        .then(response => expect(response.status).toEqual(403));
});

it("WebServer get err", () => {
    expect.assertions(1);

    return get("/geterr")
        .then(response => response.json())
        .then(response => expect(response.status).toEqual("ERR"));
});

it("WebServer get echo status 200", () => {
    expect.assertions(1);

    return get("/getecho")
        .then(response => expect(response.status).toEqual(200));
});


it("WebServer get echo", () => {
    expect.assertions(1);

    return get("/getecho?test=1")
        .then(response => response.json())
        .then(response => expect(response.status).toEqual("OK"));
});

it("WebServer get echo param", () => {
    expect.assertions(1);

    return get("/getecho?test=1")
        .then(response => response.json())
        .then(response => expect(response.response).toEqual({"test": "1"}));
});



it("WebServer post ok status 200", () => {
    expect.assertions(1);

    return post("/postok").then(response => expect(response.status).toEqual(200));
});

it("WebServer post ok", () => {
    expect.assertions(1);

    return post("/postok").then(response => response.json()).then(response => expect(response.status).toEqual("OK"));
});

it("WebServer post err status 403", () => {
    expect.assertions(1);

    return post("/posterr").then(response => expect(response.status).toEqual(403));
});

it("WebServer post err", () => {
    expect.assertions(1);

    return post("/posterr").then(response => response.json()).then(response => expect(response.status).toEqual("ERR"));
});

it("WebServer post echo", () => {
    expect.assertions(1);

    return post("/postecho", {test: 1}).then(response => response.json()).then(response => expect(response.status).toEqual("OK"));
});

it("WebServer post echo param", () => {
    expect.assertions(1);

    return post("/postecho", {test: 1}).then(response => response.json()).then(response => expect(response.response).toEqual({"test": "1"}));
});


function getHandlerOk() {
    return "";
}

function getHandlerErr() {
    throw new HttpError(403, "Access forbidden");
}

function getHandlerEcho(data) {
    return data;
}


function postHandlerOk() {
    return "";
}

function postHandlerErr() {
    throw new HttpError(403, "Access forbidden");
}

function postHandlerEcho(data) {
    return data;
}

function get(url) {
    return fetch(`http://localhost:${server.port}${url}`);
}

function post(url, data = {}) {
    return fetch(`http://localhost:${server.port}${url}`,
        {
            method: "POST",
            body: new URLSearchParams(data).toString(),
            headers: {"Content-Type": "application/x-www-form-urlencoded"}
        });
}

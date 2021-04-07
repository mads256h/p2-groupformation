const http = require("http");
const fs = require("fs");
const path = require("path");
const contentType = require("content-type");
const mimeType = require("mime-type/with-db");
const typeassert = require("./typeassert");

/**
 * @description WebServer module.
 * @module webserver
 * @see module:webserver
 * @author mads256h
 */

/**
 * @callback getCallback
 * @param {URLSearchParams} getParams
 * @param {http.IncomingMessage} request
 * @throws HttpError
 */

/**
 * @callback postCallback
 * @param {URLSearchParams} postBody
 * @param {http.IncomingMessage} request
 * @throws HttpError
 */


/**
 * @summary A simple to use wrapper around the http module
 * @property {string} hostname The hostname the server listens on
 * @property {number} port The port the server listens on
 * @property {http.Server} server http server
 */
class WebServer {
    /**
     * @param {string} hostname The hostname the server listens on
     * @param {number} port The port the server listens on
     * @param {string} wwwPath The path to serve static files from
     * @param {string} indexFile The file used when the client requests "/"
     */
    constructor(hostname, port, wwwPath, indexFile = "/index.html") {
        typeassert.assertStringNotEmpty(hostname);
        typeassert.assertInteger(port);
        typeassert.assertStringNotEmpty(wwwPath);
        typeassert.assertStringNotEmpty(indexFile);

        this.hostname = hostname;
        this.port = port;



        this.server = http.createServer(this.requestListener);
        this.server.wwwPath = wwwPath;
        this.server.getHandlers = new Map();
        this.server.postHandlers = new Map();
        this.server.indexFile = indexFile;

        Object.freeze(this);
    }

    /**
     * @summary Add a get handler
     * @param {string} url The url to handle
     * @param {getCallback} handler The handler
     */
    addGetHandler(url, handler) {
        typeassert.assertStringNotEmpty(url);
        typeassert.assertFunction(handler);

        this.server.getHandlers.set(url, handler);
    }

    /**
     * @summary Add a post handler
     * @param {string} url The url to handle
     * @param {postCallback} handler The handler
     */
    addPostHandler(url, handler) {
        typeassert.assertStringNotEmpty(url);
        typeassert.assertFunction(handler);

        this.server.postHandlers.set(url, handler);
    }


    /**
     * @summary Run the server
     */
    run() {
        return new Promise((resolve) => {
            this.server.listen(this.port, this.hostname, () => resolve());
        });
    }

    stop() {
        return new Promise((resolve) => {
            this.server.close(() => resolve());
        });
    }


    /**
     * @param {http.IncomingMessage} request The http request
     * @param {http.ServerResponse} response The servers respond to the request
     */
    requestListener(request, response) {
        const thiz = this;
        /**
         * @param {number} code The http status code
         */
        function errorResponse(code) {
            typeassert.assertInteger(code);

            response.statusCode = code;

            // Mime type
            response.setHeader("Content-Type", mimeType.contentType("text/txt"));

            response.write(http.STATUS_CODES[`${code}`]);
            response.end("\n");
        }

        /**
         * @returns {Promise} Post body data in form of URLSearchParams
         */
        function extractForm() {
            if (request.headers["content-type"] === undefined) {
                return Promise.resolve(null);
            }

            const ct = contentType.parse(request);

            if (ct.type !== "application/x-www-form-urlencoded") {
                return Promise.reject(new HttpError(415, "Unsupported content type"));
            }
            else {
                return getPostBody().then(body => new URLSearchParams(body));
            }
        }

        /**
         * @returns {Promise} Post body data
         */
        function getPostBody() {
            return new Promise((resolve) => {
                const bodyChunk = [];
                request.on("data", (chunk) => {
                    bodyChunk.push(chunk);
                }).on("end", () => {
                    resolve(Buffer.concat(bodyChunk).toString());
                });
            });
        }


        /**
         * @param {string} filename The file to send as a response
         */
        function fileResponse(filename) {
            typeassert.assertStringNotEmpty(filename);

            const trueFilename = filename === "/" ? thiz.indexFile : filename;
            const p = path.join(thiz.wwwPath, trueFilename);

            fs.readFile(p, (error, data) => {
                if (error) {
                    console.log(error);
                    errorResponse(404);
                }
                else {
                    response.statusCode = 200; // OK
                    response.setHeader("Content-Type", mimeType.contentType(path.extname(trueFilename)));
                    response.write(data);
                    response.end("\n");
                }
            });
        }

        const url = new URL(request.url, `http://${request.headers.host}`);

        if (request.method === "GET") {
            if (thiz.getHandlers.has(url.pathname)) {
                const handler = thiz.getHandlers.get(url.pathname);

                Promise.resolve().then(() => handler(url.searchParams, request)).then(resp => {
                    const obj = {status: "OK", response: resp};
                    response.statusCode = 200;
                    response.setHeader("Content-Type", mimeType.contentType("application/json"));
                    response.write(JSON.stringify(obj));
                    response.end("\n");
                }).catch(reason => {
                    if (!HttpError[Symbol.hasInstance](reason)) {
                        throw reason;
                    }

                    const obj = {status: "ERR", code: reason.code, message: reason.message};
                    response.statusCode = reason.code;
                    response.setHeader("Content-Type", mimeType.contentType("application/json"));
                    response.write(JSON.stringify(obj));
                    response.end("\n");
                });
            }
            else {
                // Serve file
                fileResponse(url.pathname);
            }
        }
        else if (request.method === "POST") {
            // Parse post body
            if (thiz.postHandlers.has(url.pathname)) {
                const handler = thiz.postHandlers.get(url.pathname);

                extractForm().then(postData => handler(postData, request)).then(resp => {
                    const obj = {status: "OK", response: resp};
                    response.statusCode = 200;
                    response.setHeader("Content-Type", mimeType.contentType("application/json"));
                    response.write(JSON.stringify(obj));
                    response.end("\n");
                }).catch(reason => {
                    if (!HttpError[Symbol.hasInstance](reason)) {
                        throw reason;
                    }

                    const obj = {status: "ERR", code: reason.code, message: reason.message};
                    response.statusCode = reason.code;
                    response.setHeader("Content-Type", mimeType.contentType("application/json"));
                    response.write(JSON.stringify(obj));
                    response.end("\n");
                });
            }
            else {
                errorResponse(404);
            }
        }
        // Method is not GET OR POST
        else {
            // Method not allowed
            errorResponse(405);
        }
    }
}

/**
 * @summary Throw this Error in a request handler to respond with failure
 */
class HttpError extends Error {
    /**
     * @param {number} code The http status code of this error
     * @param {string} message The message of the error
     */
    constructor(code, message) {
        typeassert.assertInteger(code);
        typeassert.assertString(message);

        super(message);
        this.code = code;
    }
}


module.exports = {WebServer, HttpError};

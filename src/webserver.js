const http = require("http");
const fs = require("fs");
const path = require("path");
const contentType = require("content-type");
const mimeType = require("mime-type/with-db");

class WebServer {
    constructor(hostname, port, wwwPath, indexFile = "/index.html") {
        this.hostname = hostname;
        this.port = port;



        this.server = http.createServer(this.requestListener);
        this.server.wwwPath = wwwPath;
        this.server.postHandlers = new Map();
        this.server.indexFile = indexFile;

        Object.freeze(this);
    }

    addPostHandler(url, handler) {
        this.server.postHandlers.set(url, handler);
    }

    run() {
        this.server.listen(this.port, this.hostname, () => console.log(`Server listening at http://${this.hostname}:${this.port}/`));
    }


    /**
     * @param {http.IncomingMessage} request
     * @param {http.ServerResponse} response
     */
    requestListener(request, response) {
        const thiz = this;
        /**
         * @param {http.ServerResponse} response
         * @param {number} code
         */
        function errorResponse(code) {
            response.statusCode = code;

            // Mime type
            response.setHeader("Content-Type", mimeType.contentType("text/txt"));

            response.write(http.STATUS_CODES[`${code}`]);
            response.end("\n");
        }

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

        function getPostBody() {
            return new Promise((resolve) => {
                let bodyData = [];
                request.on("data", (chunk) => {
                    bodyData.push(chunk);
                }).on("end", () => {
                    bodyData = Buffer.concat(bodyData).toString();
                    resolve(bodyData);
                });
            });
        }


        function fileResponse(filename) {
            const trueFilename = filename === "/" ? thiz.indexFile : filename;
            const p = path.join(thiz.wwwPath, trueFilename);

            fs.readFile(p, (error, data) => {
                if (error) {
                    console.log(error);
                    errorResponse(404);
                }
                else {
                    response.statusCode = 200; //OK
                    response.setHeader("Content-Type", mimeType.contentType(path.extname(trueFilename)));
                    response.write(data);
                    response.end("\n");
                }
            });
        }


        if (request.method === "GET") {
            // Serve file
            fileResponse(request.url);
        }
        else if (request.method === "POST") {
            // Parse post body
            if (thiz.postHandlers.has(request.url)) {
                const handler = thiz.postHandlers.get(request.url);

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
        }
        else {
            // Method not allowed
            errorResponse(405);
        }
    }

}

class HttpError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
    }
}


module.exports = {WebServer, HttpError};

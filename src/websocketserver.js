const WSServer = require("websocket").server;
const typeassert = require("./typeassert");
const {WebServer} = require("./webserver");
const {removeItemFromArray} = require("./math.js");


/**
 * @description WebSocketServer module
 * @module websocketserver
 * @see module:websocketserver
 * @author mads256h
 */

/**
 * @public
 * @summary A websocket server wrapper
 * @property {WSServer} websocket
 * @property {connection[]} clients
 */
class WebSocketServer {
    /**
     * @param {WebServer} server The server to add websocket functionality to
     */
    constructor(server) {
        typeassert.assertInstanceOf(server, WebServer);


        this.websocket = new WSServer({httpServer: server.server});
        this.clients = [];

        this.websocket.on("request", (request) => {
            const conn = request.accept(null, request.origin);

            this.clients.push(conn);

            conn.on("message", (data) => {
                console.log(`Received message ${data}`);
                console.log("Closing connection");
                conn.drop(0, "Receiving messages not supported");
            });

            conn.on("close", (code, desc) => {
                //console.log(`Closing connection: code: ${code} desc: ${desc}`);
                removeItemFromArray(conn, this.clients);
            });

            conn.on("error", (err) => console.log("Error", err));
        });
    }

    /**
     * @summary Send a message to all connected clients
     * @param {string} message The message to broadcast
     */
    broadcastMessage(message) {
        typeassert.assertString(message);

        this.clients.forEach((c) => c.sendUTF(message));
    }

    /**
     * @summary Stop the websocket server
     */
    stop() {
        this.websocket.shutDown();
        this.clients.forEach((c) => c.close());
    }
}

module.exports = {WebSocketServer};

const WebSocketClient = require("websocket").client;
const {WebServer} = require("./webserver");
const {WebSocketServer} = require("./websocketserver");

const server = new WebServer("localhost", 25664, ".");

const webSocketServer = new WebSocketServer(server);

beforeAll(() => server.run());
afterAll(() => Promise.all([webSocketServer.stop(), server.stop()]));

it("recieve message", () => {
    expect.assertions(2);

    const client = new WebSocketClient();
    return new Promise((resolve, reject) => {
        client.on("connectFailed", (e) => reject(e));
        client.on("connect", (c) => {
            webSocketServer.broadcastMessage("test");
            c.on("error", () => reject(c));
            c.on("close", () => reject(c));
            c.on("message", (m) => {
                expect(m.type).toEqual("utf8");
                expect(m.utf8Data).toEqual("test");

                resolve(c);
            });
        });


        client.connect(`ws://${server.hostname}:${server.port}/`);
    }).then((c) => c.close()).catch((c) => c.close());
});

const uws = require("uWebSockets.js"); // Dependency
const util = require("util"); // Utility that helps decode binary to text

const decoder = new util.TextDecoder();

const ROOM1 = "ROOM1";

const PORT = 5555; // Port number that will be "listened to"

// App object where the magic happens
const app = uws.App().ws("/*", {
  // Function that runs on open, takes in ws parameter, subscribes to ROOM1
  open: (ws) => {
    ws.subscribe(ROOM1);
    console.log("User connected");
  },

  message: (ws, message) => {
    const decodedMessage = decoder.decode(message);
    ws.publish(ROOM1, message); // Sends decoded message to ROOM1
  },
});

app.listen(PORT, (listenSocket) => {
  // Listens to our PORT, has listenSocket callback

  if (listenSocket) {
    console.log("Listening to port " + PORT);
  }
});

// In CMD type node server.js to begin listening to the port, user connection will be shown here
// In another CMD type npm run dev to compile and start the site, open on localhost:3000, websocket connection will be shown here

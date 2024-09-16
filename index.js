const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello from server");
});

const server = http.createServer(app);

const io = new Server(server, {
  pingInterval: 30000,
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("New client connected: ", socket.id);
  socket.on("message", (message) => {
    io.emit("messageReceived", message);
    console.log("Received message: ", message);
  });
});

server.listen(4000, () => {
  console.log("Server is running on port 4000");
});

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 9000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "index.html");
});

io.on("connection", async (socket) => {
  let userId = socket.id;
  console.log("user " + userId + " connect");

  socket.join("home");

  socket.on("changeRoom", (room) => {
    console.log(room);
  });

  socket.on("move", (move) => {
    io.emit("move", move);
  });
});
server.listen(port, () => {
  console.log("listening on *:" + port);
});

function createRoom(name) {}

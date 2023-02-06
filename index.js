const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 9000;

let waitRoom = [];
let roomId = 0;
let gameRooms = [];

/* ----| ROUTING |---- */

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "index.html");
});

/* ----| SOCKET |---- */

io.on("connection", (socket) => {
  const userId = socket.id;

  socket.on("goGame", (pseudo) => {
    const userName = pseudo;

    //Liste d'attente et création de la game room
    waitRoom.push({ name: pseudo, id: userId });

    let roomKey = "game" + roomId;
    socket.join(roomKey);

    //Lancement de la game
    if (waitRoom.length === 2) {
      roomId++;

      let players = {
        room: roomKey,
        p1: waitRoom[0],
        p2: waitRoom[1],
      };

      gameRooms.push(players);
      waitRoom = [];

      io.to(roomKey).emit("gameStart");
      getRoom(socket);
    }
  });
});

/* ----| SERVER |---- */

server.listen(port, () => {
  console.log("listening on *:" + port);
});

function getRoom(socket) {
  socket.rooms.forEach((element) => {
    if (element != socket.id) {
      console.log(element);
    }
  });
}

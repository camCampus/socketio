const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 9000;
let res = [];
let gameRoomNumber = 0;
let waitList = [];
let gameRooms = [];
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "index.html");
});

io.on("connection", async (socket) => {
  let userId = socket.id;
  console.log("user-------| " + userId + "|-------connect");

  //Event quand le joueur rejoint les rooms games
  socket.on("changeRoom", (user) => {
    waitList.push(user.id);
    let key = "room" + gameRoomNumber;
    socket.join(key);

    if (waitList.length === 2) {
      gameRoomNumber++;
      let players = {
        room: key,
        p1: waitList[0],
        p2: waitList[1],
      };
      gameRooms.push(players);
      waitList = [];
      io.to(players.room).emit("try", key);
    }

    socket.on("disconnecting", () => {
      let room;
      socket.rooms.forEach((value) => {
        if (value != socket.id) {
          room = value;
        }
      });
      gameRooms.forEach((gameRoom) => {
        if (gameRoom.room === room) {
          io.to(gameRoom.room).emit("leave", "player leave");
        }
      });
    });
  });

  //Function pour envoyer le coup joué aux joeur adverse de la room
  socket.on("move", (move) => {
    let room;

    //Recupérer la room du player
    socket.rooms.forEach((value) => {
      if (value != socket.id) {
        room = value;
      }
    });

    checkPlay(res, room, move, socket);
    //Chercher la bonne room et emit le coup joué à l'adversaire
    gameRooms.forEach((gameRoom) => {
      if (gameRoom.room === room) {
        socket.to(gameRoom.room).emit("move", move);
      }
    });
    console.log(res);
  });
});

server.listen(port, () => {
  console.log("listening on *:" + port);
});

function checkPlay(array, room, { play: play }, socket) {
  let obj = {
    [room]: {
      id: socket.id,
      play: play,
    },
  };
  array.push(obj);
}

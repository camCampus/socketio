let socket = io();

let sections = document.querySelectorAll("section");

function displaySection(id) {
  sections.forEach((section) => {
    if (section.id != id) {
      section.remove();
    }
  });
}

/*------------| ~ ************ ~ |------------*/
/*------------|                  |------------*/
/*------------| ~ HOME SECTION ~ |------------*/
/*------------|                  |------------*/
/*------------| ~ ************ ~ |------------*/

let menuItems = document.querySelectorAll(".menuItem");
console.log(menuItems);
// let pseudoSub = document.querySelector("#pseudoSub");
// let pseudoInput = document.querySelector("#pseudoInput").value;

menuItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    let name = event.target.attributes["data-name"].value;

    switch (name) {
      case "game":
        displaySection(name);
        socket.emit("changeRoom", { roomName: name, id: socket.id });
        break;
      case "chat":
        displaySection(name);
        socket.emit("changeRoom", name);
        break;
    }
  });
});

/*------------| ~ ************ ~ |------------*/
/*------------|                  |------------*/
/*------------| ~ GAME SECTION ~ |------------*/
/*------------|                  |------------*/
/*------------| ~ ************ ~ |------------*/
let gameContainer = document.querySelector(".container");
let choices = Array.from(gameContainer.children);

// Player choice
choices.forEach((child) => {
  child.addEventListener("click", () => {
    let move = {
      play: child.id,
    };
    socket.emit("move", move);
  });
});

socket.on("try", (e) => {
  console.log(e);
});
socket.on("leave", (e) => {
  console.log(e);
});
socket.on("move", (e) => {
  console.log(e);
});

socket.on("servmess", (e) => {
  JSON.stringify(e);
  console.log(e);
});
//span loading animation

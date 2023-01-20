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

menuItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    let name = event.target.attributes["data-name"].value;
    console.log(name);
    switch (name) {
      case "game":
        displaySection(name);
        socket.emit("changeRoom", name);
        break;
      case "chat":
        displaySection(name);
        socket.emit("changeRoom", name, socket.id);
        break;
    }
  });
});

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

socket.on("move", (e) => {
  console.log(e);
});

socket.on("servmess", (e) => {
  JSON.stringify(e);
  console.log(e);
});
//span loading animation

let socket = io();

let sections = document.querySelectorAll("section");
let wmes = document.getElementById("wmes");

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
        wmes.innerHTML = "Waiting for player...";
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
let canPlay = false;

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
  displaySection("game");
  wmes.innerHTML = "";
  console.log(e);
});
socket.on("leave", (e) => {
  console.log(e);
});
socket.on("move", (e) => {
  console.log(e);
});
socket.on('advplay', (msg) => {
  console.log(msg);
  contDownPlay()
})
socket.on("servmess", (e) => {
  JSON.stringify(e);
  console.log(e);
});
//span loading animation




// setInterval(() => {
//   contDownPlay()
// }, 1000)

let cInter;

function contDownPlay() {
  let c = 5;
  //Check si un interval est déja declanché
  if(!cInter) {
    cInter =  setInterval(() => {
      console.log("Timeout: ", c);
      c--
      if(c === 0) {
        console.log("Out of time");
        clearInterval(cInter)
        cInter = null
        return console.log("end");
      } 
    }, 1000)
  }
}
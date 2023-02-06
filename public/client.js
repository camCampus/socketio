let socket = io();
let pseudoSub = document.getElementById("pseudoSubmit");
let pseudo = document.getElementById("pseudo");
let msgPseudoError = document.getElementById("pError");
let msg = document.createElement("p");
// let container = document.querySelector(".container");
// container.style.display = "none";
let userName;
let s = 5;
let container;

/** Enregistre le pseudo du joueur et lance la file d'attente*/
pseudoSub.addEventListener("click", () => {
  msgPseudoError.innerHTML = "";

  if (pseudo.value.length >= 3) {
    document.getElementById("register").remove();
    userName = pseudo.value;

    socket.emit("goGame", userName);

    msg.innerHTML = "Recherche adversaire";
    document.body.appendChild(msg);
  } else {
    msgPseudoError.innerText = "Au moins 3 lettres svp";
  }
});

socket.on("gameStart", () => {
  msg.remove();
  // container.style.display = "block";
  displayGameContainer();
  startGame();
});

let choices;

function onPlay() {
  choices.forEach((child) => {
    child.addEventListener("click", () => {
      console.log(child.id);
      let play = {
        play: child.id,
      };
      socket.on("move", play);
    });
  });
}

function startGame() {
  let txt = document.createElement("p");
  container.appendChild(txt);
  const myInter = setInterval(() => {
    if (s >= 0) {
      // let t = s - Math.floor((s % (1000 / 60)) / 1000);
      // console.log(t);
      txt.innerHTML = s;
      s--;
      console.log(s);
    }
    if (s === -1) {
      onPlay();
      txt.remove();
      clearInterval(myInter);
    }
  }, 1000);
}

function displayGameContainer() {
  let div = document.createElement("div");
  div.classList.add("container");
  div.innerHTML = `<i id="rock" class="fa-regular fa-hand-back-fist"></i>
  <i id="paper" class="fa-regular fa-hand"></i>
  <i id="scissors" class="fa-regular fa-hand-scissors"></i>`;
  document.body.appendChild(div);
  container = document.querySelector(".container");
  choices = Array.from(container.children);
}

let socket = io();
let pseudoSub = document.getElementById("pseudoSubmit");
let pseudo = document.getElementById("pseudo");
let msgPeudoError = document.getElementById("pError");
let msg = document.createElement("p");
let userName;

/** Enregistre le pseudo du joueur et lance la file d'attente*/
pseudoSub.addEventListener("click", () => {
  msgPeudoError.innerHTML = "";

  if (pseudo.value.length >= 3) {
    document.getElementById("register").remove();
    userName = pseudo.value;

    socket.emit("goGame", userName);

    msg.innerHTML = "Recherche adversaire";
    document.body.appendChild(msg);
  } else {
    msgPeudoError.innerText = "Au moins 3 lettres svp";
  }
});

socket.on("gameStart", () => {
  msg.remove();

  let div = document.createElement("div");
  div.classList.add("container");
  div.innerHTML = `<i id="rock" class="fa-regular fa-hand-back-fist"></i>
  <i id="paper" class="fa-regular fa-hand"></i>
  <i id="scissors" class="fa-regular fa-hand-scissors"></i>`;
  document.body.appendChild(div);
});

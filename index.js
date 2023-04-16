const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function drawGame() {
  let speed = 7;

  setTimeout(drawGame, 1000 / speed);
  clearScreen();
}

function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

drawGame();

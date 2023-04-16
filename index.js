const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
let tileCount = 20;
let tileSize = 18;
let headX = 10;
let headY = 10;

function drawGame() {
  let speed = 7;

  setTimeout(drawGame, 1000 / speed);
  clearScreen();
  drawSnake();
}

function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

function drawSnake() {
  ctx.fillStyle = "orange";
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

drawGame();

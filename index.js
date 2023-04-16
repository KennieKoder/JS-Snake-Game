const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

//increase snake size
class snakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let speed = 7;
let tileCount = 20;

let tileSize = 18;
let headX = 10;
let headY = 10;

// array for snake parts
const snakeParts = [];
let tailLength = 2;

//initialize the speed of snake
let xvelocity = 0;
let yvelocity = 0;

//draw apple
let appleX = 5;
let appleY = 5;

function drawGame() {
  changeSnakePosition();

  clearScreen();
  drawSnake();
  drawApple();

  checkCollision();
  setTimeout(drawGame, 1000 / speed);
}

function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

function drawSnake() {
  ctx.fillStyle = "orange";
  //loop through snakeparts array
  for (let i = 0; i < snakeParts.length; i++) {
    //draw snake parts
    let part = snakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }
  //add parts to snake --through push
  snakeParts.push(new snakePart(headX, headY));
  if (snakeParts.length > tailLength) {
    snakeParts.shift();
  }

  ctx.fillStyle = "orange";
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function keyDown(event) {
  // up
  if (event.keyCode == 38) {
    if (yvelocity == 1) return;
    yvelocity = -1;
    xvelocity = 0;
  }
  // down
  if (event.keyCode == 40) {
    if (yvelocity == -1) return;
    yvelocity = 1;
    xvelocity = 0;
  }
  // left
  if (event.keyCode == 37) {
    if (xvelocity == 1) return;
    yvelocity = 0;
    xvelocity = -1;
  }
  // right
  if (event.keyCode == 39) {
    if (xvelocity == -1) return;
    yvelocity = 0;
    xvelocity = 1;
  }
}

function changeSnakePosition() {
  headX = headX + xvelocity;
  headY = headY + yvelocity;
}

function checkCollision() {
  if (appleX == headX && appleY == headY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
  }
}

// add event listener
document.body.addEventListener("keydown", keyDown);

function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}
drawGame();

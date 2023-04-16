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

let score = 0;

function drawGame() {
  changeSnakePosition();

  //game over logic
  let result = isGameOver();
  if (result) {
    return;
  }

  clearScreen();
  drawSnake();
  drawApple();
  drawScore();

  checkCollision();
  setTimeout(drawGame, 1000 / speed);
}

function isGameOver() {
  let gameOver = false;
  //check if game started
  if (yvelocity === 0 && xvelocity === 0) {
    return false;
  }
  if (headX < 0) {
    //if left wall is hit
    gameOver = true;
  } else if (headX === tileCount) {
    //if right wall is hit
    gameOver = true;
  } else if (headY < 0) {
    //if top wall is hit
    gameOver = true;
  } else if (headY === tileCount) {
    //if bottom wall is hit
    gameOver = true;
  }

  //stop game when snake runs into itself -- idk why this isn't working but circle back to it

  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    if (part.x === headX && part.y === headY) {
      gameOver = true;
      break; // to break out of for loop
    }

    if (gameOver) {
      ctx.fillStyle = "white";
      ctx.font = "50px verdana";
      ctx.fillText(
        "Game Over! ",
        canvas.clientWidth / 6.5,
        canvas.clientHeight / 2
      );
    }
    return gameOver;
  }
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "10px verdona";
  ctx.fillText("Score: " + score, canvas.clientWidth - 50, 10);
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
    score++;
  }
}

// add event listener
document.body.addEventListener("keydown", keyDown);

function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}
drawGame();

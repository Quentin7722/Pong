import Ball from "./ball.js";
import Player from "./player.js";
import Computer from "./computer.js";

let canvas = document.getElementById("myCanvas");
let playButton = document.getElementById("playButton");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let context = canvas.getContext("2d");
let isGameRunning = false;
let ball = new Ball(canvas);
let player = new Player(canvas);
let computer = new Computer(canvas);

function drawScore() {
  context.fillStyle = "white";
  context.font = "100px Impact";
  context.textAlign = "left";
  context.textBaseline = "top";
  let playerScoreText = ball.playerScore;
  let computerScoreText = ball.computerScore;
  let dashedLineX = canvas.width / 2;
  let margin = 50;
  let playerScoreX =
    dashedLineX - margin - context.measureText(playerScoreText).width;
  let playerScoreY = 50;
  let computerScoreX = dashedLineX + margin;
  let computerScoreY = 50;
  context.fillText(playerScoreText, playerScoreX, playerScoreY);
  context.fillText(computerScoreText, computerScoreX, computerScoreY);
}

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.setLineDash([12, 10]);
  context.beginPath();
  context.moveTo(canvas.width / 2, 0);
  context.lineTo(canvas.width / 2, canvas.height);
  context.lineWidth = 2;
  context.strokeStyle = "white";
  context.stroke();
  player.draw(context);
  computer.draw();
  ball.draw();
  drawScore();
}

function animate() {
  if (!isGameRunning) {
    return;
  }
  update();
  render();
  requestAnimationFrame(animate);
}

function play() {
  if (isGameRunning) {
    playButton.classList.add("pause");
    isGameRunning = false;
  } else {
    playButton.classList.remove("pause");
    isGameRunning = true;
    if (ball.playerScore === "You Won" || ball.computerScore === "You Won") {
      ball.playerScore = 0;
      ball.computerScore = 0;
    }
    animate();
  }
}

function endGame() {
  if (ball.playerScore === 11) {
    ball.playerScore = "You Won";
    ball.computerScore = "You Lose";
  } else {
    ball.computerScore = "You Won";
    ball.playerScore = "You Lose";
  }
  player.reset();
  computer.reset();
  ball.reset();
  ball.y = canvas.height / 2;
  isGameRunning = false;
  playButton.classList.add("pause");
}

function update() {
  computer.move(ball);
  ball.move(player, computer);
  if (ball.playerScore === 11 || ball.computerScore === 11) {
    endGame();
  }
}
canvas.addEventListener("mousemove", function (event) {
  let mouseY = event.clientY;
  let distance = mouseY - (player.y + player.height / 2);
  let inertia = 0.2;
  player.y += distance * inertia;
  player.y = Math.max(0, Math.min(player.y, canvas.height - player.height));
});

playButton.addEventListener("click", play);
render();

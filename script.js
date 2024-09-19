const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height - 30;
let ballDX = 2;
let ballDY = -2;

// Paddle properties
const paddleHeight = 10;
const paddleWidth = 100;
let paddleX = (canvas.width - paddleWidth) / 2;

// Score
let score = 0;

// Game over flag
let gameOver = false;

// Reset Button
const resetBtn = document.getElementById("resetBtn");

// Function to draw the ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.closePath();
}

// Function to draw the paddle
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

// Function to draw the walls (green walls)
function drawWalls() {
  // Top wall
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, 5);
  ctx.fillStyle = "#00ff00"; // Green color
  ctx.fill();
  ctx.closePath();

  // Left wall
  ctx.beginPath();
  ctx.rect(0, 0, 5, canvas.height);
  ctx.fillStyle = "#00ff00"; // Green color
  ctx.fill();
  ctx.closePath();

  // Right wall
  ctx.beginPath();
  ctx.rect(canvas.width - 5, 0, 5, canvas.height);
  ctx.fillStyle = "#00ff00"; // Green color
  ctx.fill();
  ctx.closePath();
}

// Function to update the score
function updateScore() {
  score++;
  document.getElementById("score").textContent = score;
}

// Function to detect collisions with paddle and walls
function collisionDetection() {
  // Paddle collision
  if (ballY + ballDY > canvas.height - ballRadius - paddleHeight) {
    if (ballX > paddleX && ballX < paddleX + paddleWidth) {
      ballDY = -ballDY;
      updateScore(); // Increment score when the ball hits the paddle
    } else {
      gameOver = true;
      resetBtn.disabled = false;
    }
  }

  // Wall collisions
  if (ballX + ballDX > canvas.width - ballRadius - 5 || ballX + ballDX < ballRadius + 5) {
    ballDX = -ballDX;
  }

  if (ballY + ballDY < ballRadius + 5) {
    ballDY = -ballDY;
  }
}

// Function to move paddle based on mouse movement
function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

// Function to draw everything and update the game
function draw() {
  if (gameOver) return; // Stop the game if game is over

  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
  drawWalls(); // Draw the three walls
  drawBall();
  drawPaddle();
  collisionDetection();

  // Update ball position
  ballX += ballDX;
  ballY += ballDY;

  requestAnimationFrame(draw); // Update game loop
}

// Reset button click event
resetBtn.addEventListener("click", () => {
  // Reset game state
  ballX = canvas.width / 2;
  ballY = canvas.height - 30;
  ballDX = 2;
  ballDY = -2;
  paddleX = (canvas.width - paddleWidth) / 2;
  score = 0;
  document.getElementById("score").textContent = score;
  gameOver = false;
  resetBtn.disabled = true;

  draw(); // Restart the game loop
});

// Add event listener for mouse movement
document.addEventListener("mousemove", mouseMoveHandler);

// Start the game
draw();
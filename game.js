// Get the canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Player object
const player = {
  x: 50,
  y: canvas.height - 30,
  width: 20,
  height: 20,
  color: '#3498db',
  speed: 5,
  jumping: false,
  jumpHeight: 70,
  jumpCount: 0,
};

// Platform object
const platform = {
  x: 0,
  y: canvas.height - 10,
  width: canvas.width,
  height: 10,
  color: '#2ecc71',
};

// Event listeners for key presses
window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

// Movement flags
let leftPressed = false;
let rightPressed = false;

function handleKeyDown(event) {
  if (event.code === 'Space' && !player.jumping) {
    player.jumping = true;
  } else if (event.code === 'ArrowLeft') {
    leftPressed = true;
  } else if (event.code === 'ArrowRight') {
    rightPressed = true;
  }
}

function handleKeyUp(event) {
  if (event.code === 'ArrowLeft') {
    leftPressed = false;
  } else if (event.code === 'ArrowRight') {
    rightPressed = false;
  }
}

// Update function
function update() {
  // Move player horizontally
  if (leftPressed && player.x > 0) {
    player.x -= player.speed;
  }
  if (rightPressed && player.x < canvas.width - player.width) {
    player.x += player.speed;
  }

  // Jumping logic
  if (player.jumping) {
    if (player.jumpCount < player.jumpHeight) {
      player.y -= player.speed;
      player.jumpCount += player.speed;
    } else {
      player.jumping = false;
      player.jumpCount = 0;
    }
  } else if (player.y < canvas.height - player.height) {
    player.y += player.speed;
  }

  // Check for collision with platform
  if (player.y > canvas.height - player.height) {
    player.y = canvas.height - player.height;
    player.jumping = false;
  }

  // Draw everything
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRect(platform);
  drawRect(player);

  // Repeat the update function
  requestAnimationFrame(update);
}

// Draw a rectangle
function drawRect(obj) {
  ctx.fillStyle = obj.color;
  ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
}

// Start the game loop
update();
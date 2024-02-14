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

// Enemy object
const enemy = {
  x: Math.random() * (canvas.width - 20),
  y: -20,
  width: 20,
  height: 20,
  color: '#e74c3c',
  speed: 2,
  alive: true,
};

// Enemy movement direction
let enemyDirection = 1; // 1 for right, -1 for left

// Player lives
let lives = 3;

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

  // Move enemy
  if (enemy.alive) {
    enemy.y += enemy.speed;

    // Check if enemy lands on the floor
    if (enemy.y > canvas.height - enemy.height) {
      enemy.y = canvas.height - enemy.height;

      // Move enemy horizontally
      enemy.x += enemyDirection * enemy.speed;

      // Change direction if enemy reaches canvas boundaries
      if (enemy.x < 0 || enemy.x + enemy.width > canvas.width) {
        enemyDirection *= -1;
      }
    }

    // Check for collision with player
    if (
      player.x < enemy.x + enemy.width &&
      player.x + player.width > enemy.x &&
      player.y < enemy.y + enemy.height &&
      player.y + player.height > enemy.y
    ) {
      // Collision with player
      if (player.y < enemy.y && !player.jumping) {
        // Player landed on top of the enemy, bounce the player
        player.jumping = true; // Trigger player jump
        player.jumpCount = 0; // Reset jump count to initiate the bounce
        enemy.alive = false; // Kill the enemy
        setTimeout(() => {
          // Respawn a new enemy after a delay
          enemy.alive = true;
          enemy.y = -20;
          enemy.x = Math.random() * (canvas.width - 20);
          enemyDirection = 1; // Reset enemy direction
        }, 1000); // You can adjust the respawn delay
      } else {
        // Collision with player
        lives--;

        if (lives <= 0) {
          alert('Game Over!'); // You can replace this with your game over logic
          location.reload(); // Reload the game
        } else {
          // Respawn the player and reset enemy position
          player.x = 50;
          player.y = canvas.height - 30;
          // enemy.y = -20; // Comment this line to keep the enemy alive after colliding with the player
          enemy.x = Math.random() * (canvas.width - 20);
          enemyDirection = 1; // Reset enemy direction
        }
      }
    }
  }

  // Draw everything
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRect(platform);
  drawRect(player);
  if (enemy.alive) {
    drawRect(enemy);
  }

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
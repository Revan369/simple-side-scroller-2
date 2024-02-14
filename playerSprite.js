// playerSprite.js

// Define player sprite object
const playerSprite = {
    image: new Image(),
    frames: {}, // Object to store frame data for each animation
    currentAnimation: null,
    currentFrameIndex: 0,
    frameWidth: 32, // Width of each frame
    frameHeight: 32, // Height of each frame
    x: /* Initial x position of the player */,
    y: /* Initial y position of the player */,
  };
  
  // Load sprite sheet image
  playerSprite.image.onload = function() {
    // Start the animation loop
    setInterval(updatePlayerAnimation, 100); // Adjust interval for desired animation speed
  };
  playerSprite.image.src = 'path/to/spriteSheet.png'; // Load the sprite sheet image
  
  // Load JSON data
  fetch('playerAnimations.json')
    .then(response => response.json())
    .then(data => {
      playerSprite.frames = data;
      // Set initial animation (e.g., playerSprite.currentAnimation = 'idle';)
    });
  
  // Function to update player animation
  function updatePlayerAnimation() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Check if current animation is set
    if (!playerSprite.currentAnimation || !playerSprite.frames[playerSprite.currentAnimation]) return;
  
    // Get current frame
    const frames = playerSprite.frames[playerSprite.currentAnimation];
    const frame = frames[playerSprite.currentFrameIndex];
  
    // Draw current frame
    ctx.drawImage(
      playerSprite.image,
      frame.x,
      frame.y,
      playerSprite.frameWidth,
      playerSprite.frameHeight,
      playerSprite.x,
      playerSprite.y,
      playerSprite.frameWidth,
      playerSprite.frameHeight
    );
  
    // Advance to next frame
    playerSprite.currentFrameIndex++;
    if (playerSprite.currentFrameIndex >= frames.length) {
      playerSprite.currentFrameIndex = 0;
    }
  }
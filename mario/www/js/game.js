var requestAnimFrame = (function(){
  return window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(callback){
      window.setTimeout(callback, 1000 / 60);
    };
})();

//create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext('2d');
var updateables = [];
var fireballs = [];
var player = new Mario.Player([0,0]);

//we might have to get the size and calculate the scaling
//but this method should let us make it however big.
//Cool!
//TODO: Automatically scale the game to work and look good on widescreen.
//TODO: fiddling with scaled sprites looks BETTER, but not perfect. Hmm.
canvas.width = 762;
canvas.height = 720;
ctx.scale(3,3);
document.body.appendChild(canvas);

//viewport
var vX = 0,
    vY = 0,
    vWidth = 256,
    vHeight = 240;

//load our images
resources.load([
  'sprites/player.png',
  'sprites/enemy.png',
  'sprites/tiles.png',
  'sprites/playerl.png',
  'sprites/items.png',
  'sprites/enemyr.png',
]);

resources.onReady(init);
var level;
var sounds;
var music;

// Game state variables
var levels = [
  { loader: Mario.oneone, name: "1-1", music: 'overworld' },
  { loader: Mario.onetwo, name: "1-2", music: 'underground' },
  { loader: Mario.onethree, name: "1-3", music: 'overworld' },
  { loader: Mario.onefour, name: "1-4", music: 'underground' }
];
var currentLevelIndex = 0;
var lives = 3;
var score = 0;
var coinCount = 0;
var levelTime = 400;
var gameState = 'TITLE'; // TITLE, PLAYING, LEVEL_END, GAME_OVER, GAME_COMPLETE
var timeInterval = null;

// Global callbacks for level progression
window.levelComplete = function() {
  if (gameState !== 'PLAYING') return;
  gameState = 'LEVEL_END';
  
  // Stop all music and play clear sound
  Object.keys(music).forEach(function(key) {
    if (music[key] && music[key].pause) {
      music[key].pause();
      music[key].currentTime = 0;
    }
  });
  music.clear.play();
  
  // Update HUD
  updateHUD();
  
  // Show level complete screen
  showLevelComplete();
  
  // Advance to next level after delay
  window.setTimeout(function() {
    currentLevelIndex++;
    if (currentLevelIndex >= levels.length) {
      showGameComplete();
      gameState = 'GAME_COMPLETE';
    } else {
      loadLevel(currentLevelIndex);
    }
  }, 5000);
};

window.levelRestart = function() {
  lives--;
  if (lives <= 0) {
    showGameOver();
    gameState = 'GAME_OVER';
    return;
  }
  loadLevel(currentLevelIndex);
};

function loadLevel(index) {
  if (index >= levels.length) {
    showGameComplete();
    return;
  }
  
  currentLevelIndex = index;
  var levelData = levels[index];
  
  // Reset time for new level
  levelTime = 400;
  
  // Stop all music
  Object.keys(music).forEach(function(key) {
    if (music[key] && music[key].pause) {
      music[key].pause();
      music[key].currentTime = 0;
    }
  });
  
  // Load the level
  levelData.loader();
  
  // Set music for this level
  if (music[levelData.music]) {
    music[levelData.music].play();
  }
  
  gameState = 'PLAYING';
  updateHUD();
  
  // Start timer
  if (timeInterval) clearInterval(timeInterval);
  timeInterval = setInterval(function() {
    if (gameState === 'PLAYING' && levelTime > 0) {
      levelTime--;
      updateHUD();
      if (levelTime <= 0) {
        player.die();
      }
    }
  }, 1000);
}

function updateHUD() {
  var hud = document.getElementById('hud');
  if (!hud) return;
  
  var worldEl = document.getElementById('hud-world');
  var scoreEl = document.getElementById('hud-score');
  var coinsEl = document.getElementById('hud-coins');
  var livesEl = document.getElementById('hud-lives');
  var timeEl = document.getElementById('hud-time');
  
  if (worldEl) worldEl.textContent = 'WORLD\n' + levels[currentLevelIndex].name;
  if (scoreEl) scoreEl.textContent = 'MARIO\n' + score.toString().padStart(6, '0');
  if (coinsEl) coinsEl.textContent = 'x ' + coinCount.toString().padStart(2, '0');
  if (livesEl) livesEl.textContent = 'x ' + lives;
  if (timeEl) timeEl.textContent = 'TIME\n' + levelTime.toString().padStart(3, '0');
}

function showLevelComplete() {
  var overlay = document.getElementById('level-complete');
  if (overlay) overlay.style.display = 'flex';
  
  window.setTimeout(function() {
    if (overlay) overlay.style.display = 'none';
  }, 5000);
}

function showGameComplete() {
  var overlay = document.getElementById('game-complete');
  if (overlay) overlay.style.display = 'flex';
  
  if (timeInterval) clearInterval(timeInterval);
}

function showGameOver() {
  var overlay = document.getElementById('game-over');
  if (overlay) overlay.style.display = 'flex';
  
  if (timeInterval) clearInterval(timeInterval);
}

function startGame() {
  // Hide title screen
  var titleScreen = document.getElementById('title-screen');
  if (titleScreen) titleScreen.style.display = 'none';
  
  // Show HUD
  var hud = document.getElementById('hud');
  if (hud) hud.style.display = 'flex';
  
  // Reset game state
  lives = 3;
  score = 0;
  coinCount = 0;
  currentLevelIndex = 0;
  
  // Load first level
  loadLevel(0);
}

function restartGame() {
  // Hide overlays
  var gameOver = document.getElementById('game-over');
  var gameComplete = document.getElementById('game-complete');
  if (gameOver) gameOver.style.display = 'none';
  if (gameComplete) gameComplete.style.display = 'none';
  
  startGame();
}

//initialize
var lastTime;
function init() {
  music = {
    overworld: new Audio('sounds/aboveground_bgm.ogg'),
    underground: new Audio('sounds/underground_bgm.ogg'),
    clear: new Audio('sounds/stage_clear.wav'),
    death: new Audio('sounds/mariodie.wav')
  };
  
  // Setup music looping
  Object.keys(music).forEach(function(key) {
    if (music[key]) {
      music[key].loop = true;
      music[key].volume = 0.7;
    }
  });
  music.clear.loop = false;
  music.death.loop = false;
  music.clear.volume = 1.0;
  music.death.volume = 1.0;
  
  sounds = {
    smallJump: new Audio('sounds/jump-small.wav'),
    bigJump: new Audio('sounds/jump-super.wav'),
    breakBlock: new Audio('sounds/breakblock.wav'),
    bump: new Audio('sounds/bump.wav'),
    coin: new Audio('sounds/coin.wav'),
    fireball: new Audio('sounds/fireball.wav'),
    flagpole: new Audio('sounds/flagpole.wav'),
    kick: new Audio('sounds/kick.wav'),
    pipe: new Audio('sounds/pipe.wav'),
    itemAppear: new Audio('sounds/itemAppear.wav'),
    powerup: new Audio('sounds/powerup.wav'),
    stomp: new Audio('sounds/stomp.wav')
  };
  
  // Setup sound effects
  Object.keys(sounds).forEach(function(key) {
    if (sounds[key]) {
      sounds[key].volume = 0.6;
    }
  });
  
  // Show title screen
  gameState = 'TITLE';
  
  // Set up title screen controls
  var startBtn = document.getElementById('start-btn');
  if (startBtn) {
    startBtn.addEventListener('click', startGame);
  }
  
  var restartBtn = document.getElementById('restart-btn');
  if (restartBtn) {
    restartBtn.addEventListener('click', restartGame);
  }
  
  var restartBtn2 = document.getElementById('restart-btn2');
  if (restartBtn2) {
    restartBtn2.addEventListener('click', restartGame);
  }
  
  // Keyboard start
  document.addEventListener('keydown', function(e) {
    if (gameState === 'TITLE' && (e.code === 'Enter' || e.code === 'Space')) {
      startGame();
    } else if ((gameState === 'GAME_OVER' || gameState === 'GAME_COMPLETE') && (e.code === 'Enter' || e.code === 'Space')) {
      restartGame();
    }
  });
  
  lastTime = Date.now();
  main();
}

var gameTime = 0;

//set up the game loop
function main() {
  var now = Date.now();
  var dt = (now - lastTime) / 1000.0;

  update(dt);
  render();

  lastTime = now;
  requestAnimFrame(main);
}

function update(dt) {
  gameTime += dt;

  if (gameState === 'PLAYING') {
    handleInput(dt);
    updateEntities(dt, gameTime);
    checkCollisions();
  }
}

function handleInput(dt) {
  if (player.piping || player.dying || player.noInput) return; //don't accept input

  if (input.isDown('RUN')){
    player.run();
  } else {
    player.noRun();
  }
  if (input.isDown('JUMP')) {
    player.jump();
  } else {
    //we need this to handle the timing for how long you hold it
    player.noJump();
  }

  if (input.isDown('DOWN')) {
    player.crouch();
  } else {
    player.noCrouch();
  }

  if (input.isDown('LEFT')) { // 'd' or left arrow
    player.moveLeft();
  }
  else if (input.isDown('RIGHT')) { // 'k' or right arrow
    player.moveRight();
  } else {
    player.noWalk();
  }
}

//update all the moving stuff
function updateEntities(dt, gameTime) {
  player.update(dt, vX);
  updateables.forEach (function(ent) {
    ent.update(dt, gameTime);
  });

  //This should stop the jump when he switches sides on the flag.
  if (player.exiting) {
    if (player.pos[0] > vX + 96)
      vX = player.pos[0] - 96
  }else if (level.scrolling && player.pos[0] > vX + 80) {
    vX = player.pos[0] - 80;
  }

  if (player.powering.length !== 0 || player.dying) { return; }
  level.items.forEach (function(ent) {
    ent.update(dt);
  });

  level.enemies.forEach (function(ent) {
    ent.update(dt, vX);
  });

  fireballs.forEach(function(fireball) {
    fireball.update(dt);
  });
  level.pipes.forEach (function(pipe) {
    pipe.update(dt);
  });
}

//scan for collisions
function checkCollisions() {
  if (player.powering.length !== 0 || player.dying) { return; }
  player.checkCollisions();

  //Apparently for each will just skip indices where things were deleted.
  level.items.forEach(function(item) {
    item.checkCollisions();
  });
  level.enemies.forEach (function(ent) {
    ent.checkCollisions();
  });
  fireballs.forEach(function(fireball){
    fireball.checkCollisions();
  });
  level.pipes.forEach (function(pipe) {
    pipe.checkCollisions();
  });
}

//draw the game!
function render() {
  if (gameState === 'TITLE') return; // Don't render game during title
  
  updateables = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = level.background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //scenery gets drawn first to get layering right.
  for(var i = 0; i < 15; i++) {
    for (var j = Math.floor(vX / 16) - 1; j < Math.floor(vX / 16) + 20; j++){
      if (level.scenery[i][j]) {
        renderEntity(level.scenery[i][j]);
      }
    }
  }

  //then items
  level.items.forEach (function (item) {
    renderEntity(item);
  });

  level.enemies.forEach (function(enemy) {
    renderEntity(enemy);
  });



  fireballs.forEach(function(fireball) {
    renderEntity(fireball);
  })

  //then we draw every static object.
  for(var i = 0; i < 15; i++) {
    for (var j = Math.floor(vX / 16) - 1; j < Math.floor(vX / 16) + 20; j++){
      if (level.statics[i][j]) {
        renderEntity(level.statics[i][j]);
      }
      if (level.blocks[i][j]) {
        renderEntity(level.blocks[i][j]);
        updateables.push(level.blocks[i][j]);
      }
    }
  }

  //then the player
  if (player.invincibility % 2 === 0) {
    renderEntity(player);
  }

  //Mario goes INTO pipes, so naturally they go after.
  level.pipes.forEach (function(pipe) {
    renderEntity(pipe);
  });
}

function renderEntity(entity) {
  entity.render(ctx, vX, vY);
}

// Score tracking hooks
window.addScore = function(points) {
  score += points;
  updateHUD();
};

window.addCoin = function() {
  coinCount++;
  if (coinCount >= 100) {
    coinCount = 0;
    lives++;
  }
  updateHUD();
};

var onetwo = Mario.onetwo = function() {
  level = new Mario.Level({
    playerPos: [56, 192],
    loader: Mario.onetwo,
    background: "#000000",
    scrolling: true,
    invincibility: [144, 192, 240],
    exit: 195,
    floorSprite: new Mario.Sprite('sprites/tiles.png', [0, 32], [16, 16], 0),
    wallSprite: new Mario.Sprite('sprites/tiles.png', [32, 32], [16, 16], 0),
    brickSprite: new Mario.Sprite('sprites/tiles.png', [16, 0], [16, 16], 0),
    brickBounceSprite: new Mario.Sprite('sprites/tiles.png', [32, 0], [16, 16], 0),
    ublockSprite: new Mario.Sprite('sprites/tiles.png', [48, 0], [16, 16], 0),
    qblockSprite: new Mario.Sprite('sprites/tiles.png', [384, 0], [16, 16], 8, [0, 0, 0, 0, 1, 2, 1]),
    goombaSprite: function() { return new Mario.Sprite('sprites/enemy.png', [0, 16], [16, 16], 3, [0, 1]); },
    koopaSprite: function() { return new Mario.Sprite('sprites/enemy.png', [96, 0], [16, 32], 2, [0, 1]); },
    cloudSprites: [], hillSprites: [],
    flagPoleSprites: [new Mario.Sprite('sprites/tiles.png', [256, 128], [16, 16], 0), new Mario.Sprite('sprites/tiles.png', [256, 144], [16, 16], 0)]
  });
  player.pos[0] = level.playerPos[0];
  player.pos[1] = level.playerPos[1];
  vX = 0;
  ground = [[0, 69]];
  ground.forEach(function(loc) { level.putFloor(loc[0], loc[1]); });
  level.putQBlock(16, 9, new Mario.Mushroom([256, 144]));
  level.putFlagpole(195);
  music.overworld.pause();
  music.underground.currentTime = 0;
  music.underground.play();
};
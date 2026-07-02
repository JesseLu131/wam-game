var onefour = Mario.onefour = function() {
  level = new Mario.Level({
    playerPos: [56,192],
    loader: Mario.onefour,
    background: "#000000",
    scrolling: true,
    invincibility: [144, 192, 240],
    exit: 175,
    floorSprite:  new Mario.Sprite('sprites/tiles.png', [0,32],[16,16],0),
    cloudSprite:  new Mario.Sprite('sprites/tiles.png', [0,320],[48,32],0),
    wallSprite: new Mario.Sprite('sprites/tiles.png', [32, 32],[16,16],0),
    brickSprite: new Mario.Sprite('sprites/tiles.png', [16, 0], [16,16], 0),
    brickBounceSprite: new Mario.Sprite('sprites/tiles.png',[32,0],[16,16],0),
    rubbleSprite: function () {
      return new Mario.Sprite('sprites/items.png', [64,0], [8,8], 3, [0,1])
    },
    ublockSprite: new Mario.Sprite('sprites/tiles.png', [48, 0], [16,16],0),
    superShroomSprite: new Mario.Sprite('sprites/items.png', [0,0], [16,16], 0),
    fireFlowerSprite: new Mario.Sprite('sprites/items.png', [0,32], [16,16], 20, [0,1,2,3]),
    starSprite: new Mario.Sprite('sprites/items.png', [0,48], [16,16], 20, [0,1,2,3]),
    pipeLEndSprite: new Mario.Sprite('sprites/tiles.png', [0, 128], [16,16], 0),
    pipeREndSprite: new Mario.Sprite('sprites/tiles.png', [16, 128], [16,16], 0),
    pipeLMidSprite: new Mario.Sprite('sprites/tiles.png', [0, 144], [16,16], 0),
    pipeRMidSprite: new Mario.Sprite('sprites/tiles.png', [16, 144], [16,16], 0),
    pipeUpMid: new Mario.Sprite('sprites/tiles.png', [0, 144], [32,16], 0),
    pipeSideMid: new Mario.Sprite('sprites/tiles.png', [48, 128], [16,32], 0),
    pipeLeft: new Mario.Sprite('sprites/tiles.png', [32, 128], [16,32], 0),
    pipeTop: new Mario.Sprite('sprites/tiles.png', [0, 128], [32,16], 0),
    qblockSprite: new Mario.Sprite('sprites/tiles.png', [384, 0], [16,16], 8, [0,0,0,0,1,2,1]),
    bcoinSprite: function() {
      return new Mario.Sprite('sprites/items.png', [0,112],[16,16], 20,[0,1,2,3]);
    },
    coinSprite: function() {
      return new Mario.Sprite('sprites/items.png', [0,96],[16,16], 6,[0,0,0,0,1,2,1]);
    },
    cloudSprites:[
      new Mario.Sprite('sprites/tiles.png', [0,320],[16,32],0),
      new Mario.Sprite('sprites/tiles.png', [16,320],[16,32],0),
      new Mario.Sprite('sprites/tiles.png', [32,320],[16,32],0)
    ],
    hillSprites: [
      new Mario.Sprite('sprites/tiles.png', [128,128],[16,16],0),
      new Mario.Sprite('sprites/tiles.png', [144,128],[16,16],0),
      new Mario.Sprite('sprites/tiles.png', [160,128],[16,16],0),
      new Mario.Sprite('sprites/tiles.png', [128,144],[16,16],0),
      new Mario.Sprite('sprites/tiles.png', [144,144],[16,16],0),
      new Mario.Sprite('sprites/tiles.png', [160,144],[16,16],0)
    ],
    bushSprite: new Mario.Sprite('sprites/tiles.png', [176, 144], [48, 16], 0),
    bushSprites: [
     new Mario.Sprite('sprites/tiles.png', [176,144], [16,16],0),
     new Mario.Sprite('sprites/tiles.png', [192,144], [16,16],0),
     new Mario.Sprite('sprites/tiles.png', [208,144], [16,16],0)],
    LPipeSprites:[
      new Mario.Sprite('sprites/tiles.png', [32,128],[16,16],0),
      new Mario.Sprite('sprites/tiles.png', [32,144],[16,16],0),
      new Mario.Sprite('sprites/tiles.png', [48,128],[16,16],0),
      new Mario.Sprite('sprites/tiles.png', [48,144],[16,16],0),
      new Mario.Sprite('sprites/tiles.png', [64,128],[16,16],0),
      new Mario.Sprite('sprites/tiles.png', [64,144],[16,16],0),
    ],
   goombaSprite: function() {
     return new Mario.Sprite('sprites/enemy.png', [0, 16], [16,16], 3, [0,1]);
   },
   koopaSprite: function() {
     return new Mario.Sprite('sprites/enemy.png', [96,0], [16,32], 2, [0,1]);
   },
   flagPoleSprites: [
     new Mario.Sprite('sprites/tiles.png', [256, 128], [16,16], 0),
     new Mario.Sprite('sprites/tiles.png', [256, 144], [16,16], 0),
     new Mario.Sprite('sprites/items.png', [128, 32], [16,16], 0)
   ]
 });
  player.pos[0] = level.playerPos[0];
  player.pos[1] = level.playerPos[1];
  vX = 0;

  // Ground sections with gaps
  ground = [[0,15],[18,30],[33,48],[51,66],[69,84],[87,102],[105,120],[123,138],[141,156],[159,175]];
  ground.forEach(function(loc) {
    level.putFloor(loc[0],loc[1]);
  });

  // Walls (castle pillars)
  walls = [[5,13,3],[12,13,5],[25,13,4],[40,13,6],[55,13,3],[70,13,5],[85,13,4],[100,13,6],[115,13,3],[130,13,5],[145,13,4]];
  walls.forEach(function(w){
    level.putWall(w[0], w[1], w[2]);
  });

  // Pipes
  level.putPipe(16, 13, 2);
  level.putPipe(35, 13, 3);
  level.putPipe(60, 13, 2);
  level.putPipe(90, 13, 4);
  level.putPipe(120, 13, 3);
  level.putPipe(150, 13, 2);

  // Question blocks
  level.putQBlock(10, 9, new Mario.Bcoin([160, 144]));
  level.putQBlock(20, 5, new Mario.Mushroom([320, 80]));
  level.putQBlock(30, 9, new Mario.Bcoin([480, 144]));
  level.putQBlock(45, 5, new Mario.Star([720, 80]));
  level.putQBlock(58, 9, new Mario.Bcoin([928, 144]));
  level.putQBlock(75, 5, new Mario.Mushroom([1200, 80]));
  level.putQBlock(88, 9, new Mario.Bcoin([1408, 144]));
  level.putQBlock(105, 5, new Mario.Bcoin([1680, 80]));
  level.putQBlock(118, 9, new Mario.Mushroom([1888, 144]));
  level.putQBlock(135, 5, new Mario.Bcoin([2160, 80]));
  level.putQBlock(148, 9, new Mario.Bcoin([2368, 144]));
  level.putQBlock(162, 5, new Mario.Mushroom([2592, 80]));

  // Bricks
  level.putBrick(11, 9, null);
  level.putBrick(12, 9, null);
  level.putBrick(21, 5, null);
  level.putBrick(22, 5, null);
  level.putBrick(31, 9, null);
  level.putBrick(32, 9, null);
  level.putBrick(46, 5, null);
  level.putBrick(47, 5, null);
  level.putBrick(59, 9, null);
  level.putBrick(60, 9, null);
  level.putBrick(76, 5, null);
  level.putBrick(77, 5, null);
  level.putBrick(89, 9, null);
  level.putBrick(90, 9, null);
  level.putBrick(106, 5, null);
  level.putBrick(107, 5, null);
  level.putBrick(119, 9, null);
  level.putBrick(120, 9, null);
  level.putBrick(136, 5, null);
  level.putBrick(137, 5, null);
  level.putBrick(149, 9, null);
  level.putBrick(150, 9, null);
  level.putBrick(163, 5, null);
  level.putBrick(164, 5, null);

  // Staircase at end
  level.putWall(165, 13, 1);
  level.putWall(166, 13, 2);
  level.putWall(167, 13, 3);
  level.putWall(168, 13, 4);
  level.putWall(169, 13, 5);
  level.putWall(170, 13, 6);
  level.putWall(171, 13, 7);
  level.putWall(172, 13, 8);

  level.putFlagpole(175);

  // Enemies - lots of them for a challenging castle level
  level.putGoomba(8, 12);
  level.putGoomba(14, 12);
  level.putGoomba(22, 12);
  level.putGoomba(28, 12);
  level.putGoomba(36, 12);
  level.putGoomba(42, 12);
  level.putGoomba(50, 12);
  level.putGoomba(56, 12);
  level.putGoomba(64, 12);
  level.putGoomba(72, 12);
  level.putGoomba(78, 12);
  level.putGoomba(86, 12);
  level.putGoomba(94, 12);
  level.putGoomba(100, 12);
  level.putGoomba(108, 12);
  level.putGoomba(114, 12);
  level.putGoomba(122, 12);
  level.putGoomba(128, 12);
  level.putGoomba(136, 12);
  level.putGoomba(142, 12);
  level.putGoomba(152, 12);
  level.putGoomba(158, 12);
  level.putKoopa(10, 11);
  level.putKoopa(24, 11);
  level.putKoopa(38, 11);
  level.putKoopa(52, 11);
  level.putKoopa(68, 11);
  level.putKoopa(82, 11);
  level.putKoopa(96, 11);
  level.putKoopa(112, 11);
  level.putKoopa(126, 11);
  level.putKoopa(140, 11);
  level.putKoopa(154, 11);

  // Coins scattered
  coins = [[7,8],[8,8],[15,6],[16,6],[23,8],[24,8],[29,6],[30,6],[37,8],[38,8],[43,6],[44,6],[53,8],[54,8],[61,6],[62,6],[73,8],[74,8],[79,6],[80,6],[91,8],[92,8],[97,6],[98,6],[107,8],[108,8],[113,6],[114,6],[125,8],[126,8],[131,6],[132,6],[143,8],[144,8],[151,6],[152,6],[161,8],[162,8]];
  coins.forEach(function(pos){
    level.putCoin(pos[0],pos[1]);
  });

  music.overworld.pause();
  music.underground.currentTime = 0;
  music.underground.play();
};

var onethree = Mario.onethree = function() {
  level = new Mario.Level({
    playerPos: [56,192],
    loader: Mario.onethree,
    background: "#5C94FC",
    scrolling: true,
    invincibility: [144, 192, 240],
    exit: 185,
    floorSprite:  new Mario.Sprite('sprites/tiles.png', [0,0],[16,16],0),
    cloudSprite:  new Mario.Sprite('sprites/tiles.png', [0,320],[48,32],0),
    wallSprite: new Mario.Sprite('sprites/tiles.png', [0, 16],[16,16],0),
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

  // Ground sections with MANY gaps for platform jumping
  ground = [[0,12],[18,28],[32,42],[46,56],[60,72],[76,88],[92,104],[108,120],[124,136],[140,152],[156,170]];
  ground.forEach(function(loc) {
    level.putFloor(loc[0],loc[1]);
  });

  // Elevated platforms (using walls as platforms)
  platforms = [[15,10,1],[22,8,1],[28,10,1],[38,8,2],[44,10,1],[52,8,1],[58,10,1],[68,8,2],[74,10,1],[82,8,1],[88,10,1],[96,8,2],[102,10,1],[112,8,1],[118,10,1],[128,8,2],[134,10,1],[142,8,1],[148,10,1],[158,8,2],[164,10,1]];
  platforms.forEach(function(p){
    for (var i = 0; i < p[2]; i++) {
      level.putWall(p[0]+i, p[1], 1);
    }
  });

  // Pipes
  level.putPipe(8, 13, 2);
  level.putPipe(35, 13, 3);
  level.putPipe(65, 13, 2);
  level.putPipe(95, 13, 3);
  level.putPipe(125, 13, 2);
  level.putPipe(155, 13, 2);

  // Question blocks on platforms
  level.putQBlock(15, 9, new Mario.Bcoin([240, 144]));
  level.putQBlock(22, 7, new Mario.Mushroom([352, 112]));
  level.putQBlock(38, 7, new Mario.Bcoin([608, 112]));
  level.putQBlock(52, 7, new Mario.Star([832, 112]));
  level.putQBlock(68, 7, new Mario.Bcoin([1088, 112]));
  level.putQBlock(82, 7, new Mario.Mushroom([1312, 112]));
  level.putQBlock(96, 7, new Mario.Bcoin([1536, 112]));
  level.putQBlock(112, 7, new Mario.Bcoin([1792, 112]));
  level.putQBlock(128, 7, new Mario.Mushroom([2048, 112]));
  level.putQBlock(142, 7, new Mario.Bcoin([2272, 112]));
  level.putQBlock(158, 7, new Mario.Bcoin([2528, 112]));

  // Bricks
  level.putBrick(16, 9, null);
  level.putBrick(17, 9, null);
  level.putBrick(23, 7, null);
  level.putBrick(24, 7, null);
  level.putBrick(39, 7, null);
  level.putBrick(40, 7, null);
  level.putBrick(53, 7, null);
  level.putBrick(54, 7, null);
  level.putBrick(69, 7, null);
  level.putBrick(70, 7, null);
  level.putBrick(83, 7, null);
  level.putBrick(84, 7, null);
  level.putBrick(97, 7, null);
  level.putBrick(98, 7, null);
  level.putBrick(113, 7, null);
  level.putBrick(114, 7, null);
  level.putBrick(129, 7, null);
  level.putBrick(130, 7, null);
  level.putBrick(143, 7, null);
  level.putBrick(144, 7, null);
  level.putBrick(159, 7, null);
  level.putBrick(160, 7, null);

  // Staircase at end
  level.putWall(172, 13, 1);
  level.putWall(173, 13, 2);
  level.putWall(174, 13, 3);
  level.putWall(175, 13, 4);
  level.putWall(176, 13, 5);
  level.putWall(177, 13, 6);
  level.putWall(178, 13, 7);
  level.putWall(179, 13, 8);

  level.putFlagpole(185);

  // Scenery - lots of clouds since it's a sky level
  clouds = [[5,2],[15,3],[25,2],[35,3],[45,2],[55,3],[65,2],[75,3],[85,2],[95,3],[105,2],[115,3],[125,2],[135,3],[145,2],[155,3],[165,2]];
  clouds.forEach(function(cloud){
    level.putCloud(cloud[0],cloud[1]);
  });

  // Enemies
  level.putGoomba(10, 12);
  level.putGoomba(20, 12);
  level.putGoomba(30, 12);
  level.putGoomba(40, 12);
  level.putGoomba(50, 12);
  level.putGoomba(62, 12);
  level.putGoomba(72, 12);
  level.putGoomba(80, 12);
  level.putGoomba(90, 12);
  level.putGoomba(100, 12);
  level.putGoomba(110, 12);
  level.putGoomba(122, 12);
  level.putGoomba(132, 12);
  level.putGoomba(142, 12);
  level.putGoomba(150, 12);
  level.putKoopa(14, 11);
  level.putKoopa(34, 11);
  level.putKoopa(54, 11);
  level.putKoopa(78, 11);
  level.putKoopa(106, 11);
  level.putKoopa(130, 11);
  level.putKoopa(154, 11);

  // Coins scattered along platforms
  coins = [[5,11],[6,11],[19,6],[20,6],[27,6],[28,6],[33,11],[34,11],[43,6],[44,6],[49,11],[50,11],[57,6],[58,6],[63,11],[64,11],[71,6],[72,6],[79,11],[80,11],[87,6],[88,6],[93,11],[94,11],[101,6],[102,6],[107,11],[108,11],[115,6],[116,6],[121,11],[122,11],[129,6],[130,6],[137,11],[138,11],[145,6],[146,6],[151,11],[152,11]];
  coins.forEach(function(pos){
    level.putCoin(pos[0],pos[1]);
  });

  music.underground.pause();
  music.overworld.currentTime = 0;
  music.overworld.play();
};

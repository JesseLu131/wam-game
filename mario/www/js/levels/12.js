var onetwo = Mario.onetwo = function() {
      level = new Mario.Level({
        playerPos: [56,192],
        loader: Mario.onetwo,
        background: "#000000",
        scrolling: true,
        invincibility: [144, 192, 240],
        exit: 195,
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
      ground = [[0,20],[23,45],[48,70],[73,95],[98,120],[123,145],[148,170],[173,195]];
      ground.forEach(function(loc) {
        level.putFloor(loc[0],loc[1]);
      });
    
      // Ceiling
      for (var x = 0; x < 200; x++) {
        level.putWall(x, 3, 1);
      }
    
      // Pipes
      level.putPipe(25, 13, 2);
      level.putPipe(40, 13, 3);
      level.putPipe(55, 13, 2);
      level.putPipe(80, 13, 4);
      level.putPipe(100, 13, 3);
      level.putPipe(125, 13, 2);
      level.putPipe(155, 13, 3);
    
      // Question blocks
      level.putQBlock(16, 9, new Mario.Bcoin([256, 144]));
      level.putQBlock(20, 9, new Mario.Mushroom([320, 144]));
      level.putQBlock(35, 5, new Mario.Bcoin([560, 80]));
      level.putQBlock(50, 9, new Mario.Bcoin([800, 144]));
      level.putQBlock(60, 5, new Mario.Star([960, 80]));
      level.putQBlock(70, 9, new Mario.Bcoin([1120, 144]));
      level.putQBlock(85, 5, new Mario.Mushroom([1360, 80]));
      level.putQBlock(105, 9, new Mario.Bcoin([1680, 144]));
      level.putQBlock(115, 5, new Mario.Bcoin([1840, 80]));
      level.putQBlock(130, 9, new Mario.Mushroom([2080, 144]));
      level.putQBlock(140, 5, new Mario.Bcoin([2240, 80]));
      level.putQBlock(160, 9, new Mario.Bcoin([2560, 144]));
      level.putQBlock(175, 9, new Mario.Mushroom([2800, 144]));
    
      // Bricks
      level.putBrick(22, 9, null);
      level.putBrick(23, 9, null);
      level.putBrick(24, 9, null);
      level.putBrick(45, 5, null);
      level.putBrick(46, 5, null);
      level.putBrick(47, 5, null);
      level.putBrick(65, 5, null);
      level.putBrick(66, 5, null);
      level.putBrick(67, 5, null);
      level.putBrick(90, 5, null);
      level.putBrick(91, 5, null);
      level.putBrick(92, 5, null);
      level.putBrick(110, 9, null);
      level.putBrick(111, 9, null);
      level.putBrick(112, 9, null);
      level.putBrick(135, 5, null);
      level.putBrick(136, 5, null);
      level.putBrick(137, 5, null);
      level.putBrick(150, 9, null);
      level.putBrick(151, 9, null);
      level.putBrick(165, 5, null);
      level.putBrick(166, 5, null);
    
      // Staircase at end
      level.putWall(180, 13, 1);
      level.putWall(181, 13, 2);
      level.putWall(182, 13, 3);
      level.putWall(183, 13, 4);
      level.putWall(184, 13, 5);
      level.putWall(185, 13, 6);
      level.putWall(186, 13, 7);
      level.putWall(187, 13, 8);
    
      level.putFlagpole(195);
    
      // Enemies
      level.putGoomba(20, 12);
      level.putGoomba(35, 12);
      level.putGoomba(42, 12);
      level.putGoomba(52, 12);
      level.putGoomba(62, 12);
      level.putGoomba(72, 12);
      level.putGoomba(88, 12);
      level.putGoomba(95, 12);
      level.putGoomba(108, 12);
      level.putGoomba(118, 12);
      level.putGoomba(128, 12);
      level.putGoomba(138, 12);
      level.putGoomba(148, 12);
      level.putGoomba(158, 12);
      level.putGoomba(168, 12);
      level.putKoopa(28, 11);
      level.putKoopa(45, 11);
      level.putKoopa(75, 11);
      level.putKoopa(102, 11);
      level.putKoopa(132, 11);
      level.putKoopa(162, 11);
    
      // Coins scattered
      coins = [[10,8],[11,8],[12,8],[26,7],[27,7],[28,7],[38,8],[39,8],[53,7],[54,7],[63,8],[64,8],[73,7],[74,7],[83,8],[84,8],[93,7],[94,7],[103,8],[104,8],[113,7],[114,7],[122,8],[123,8],[133,7],[134,7],[143,8],[144,8],[153,7],[154,7],[163,8],[164,8]];
      coins.forEach(function(pos){
        level.putCoin(pos[0],pos[1]);
      });
    
      music.overworld.pause();
      music.underground.currentTime = 0;
      music.underground.play();
    };
    

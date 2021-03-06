Batcat.Game = function (game) {
  this.ballI = 0;
  this.bodySize = 10;
};
Batcat.Game.prototype = {
  create: function () {
    var _this = this;
    this.physics.startSystem(Phaser.Physics.P2JS);
    this.physics.p2.setImpactEvents(true);
    this.physics.p2.restitution = 0.8;
    this.physics.p2.gravity.y = 200;
    this.playerCollisionGroup = this.physics.p2.createCollisionGroup();
    this.ballCollisionGroup = this.physics.p2.createCollisionGroup();

    this.physics.p2.updateBoundsCollisionGroup();
    setTimeout(function() {
      _this.buildWorld();
      _this.leapLoop();
      _this.objectEnable();


    }, 0);
  },
  leapLoop: function() {
    _this = this;
    Leap.loop(function(frame) {
      frame.hands.forEach(function(hand, index) {
        this.tab = hand.screenPosition();
        _this.mouseBody.body.x = tab[0] - 200;
        _this.mouseBody.body.y = tab[1] - 200;
        _this.move();
        _this.look();

      });
    }).use('screenPosition');
  },
  createBall: function () {
    var ball = ['ballJs', 'ballPhp', 'ballMysql', 'ballPhaser', 'ballWp', 'ballLaravel', 'ballPs'];
    var ball = this.balls.create(500, this.world.randomX, ball[this.ballI]);
    ball.body.setRectangle(40, 40);
    ball.body.setCollisionGroup(this.ballCollisionGroup);
    ball.body.collides([this.ballCollisionGroup, this.playerCollisionGroup]);
    ball.live = 2;
    ball.body.velocity.x = -100;

    this.ballI++;
    if (this.ballI === 7) {
      this.ballGenerator.timer.stop();
    }
  },
  objectEnable: function () {
    this.balls = this.add.group();
    this.balls.enableBody = true;
    this.balls.physicsBodyType = Phaser.Physics.P2JS;
    this.createBall();

    this.ballGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 2.5, this.createBall, this);
    this.ballGenerator.timer.start();
    this.emitter = this.add.emitter(0, 0, 100);
    this.emitter.makeParticles('corona');
    this.emitter.setRotation(0, 360);
    this.emitter.setAlpha(0.3, 0.8);
    this.emitter.setScale(0.2, 1);
  },
  buildWorld: function () {
    this.playerEnable();
  },
  playerEnable: function () {
    //le playeur
    this.player = this.add.sprite(250, 50, 'batcat');
    this.player.anchor.setTo(0.5);
    this.player.animations.add('nomnom', [0, 1, 2, 3, 3, 2, 1], 10, true);
    this.player.scale.x = 0.1;
    this.player.scale.y = 0.1;
    this.physics.p2.enable(this.player, false);
    this.player.body.setCircle(this.bodySize);
    this.player.animations.play('nomnom');
    this.player.lookAt = 'right';
    this.player.fixedRotation = true;
    //le playeur physic
    this.player.body.setCollisionGroup(this.playerCollisionGroup);
    this.player.body.collides(this.ballCollisionGroup, this.hitBall, this);

    //le playeur control
    this.mouseBody = this.add.sprite(100, 100, 'burger');
    this.physics.p2.enable(this.mouseBody, false);
    this.mouseBody.body.static = true;
    this.mouseBody.body.setCircle(10);
    this.mouseBody.body.data.shapes[0].sensor = true;
    //this.input.onDown.add(this.move, this);
    this.input.addMoveCallback(this.look, this);

  },
  move: function () {
    var dx = this.mouseBody.body.x - this.player.x;
    var dy = this.mouseBody.body.y - this.player.y;
    if (dy > 30) {
        this.player.body.moveDown(150);
    }
    if (dy < -30) {
        this.player.body.moveUp(150);
    }
    if (dx > 0) {
        //this.player.body.moveRight(200);
    }
    if (dx < 0) {
        //this.player.body.moveLeft(200);
    }
  },
  look: function () {
    var dx = this.mouseBody.body.x - this.player.x;
    var dy = this.mouseBody.body.y - this.player.y;
    var bulletRotation = Math.atan2(dy, dx);
    this.player.body.rotation = bulletRotation + this.math.degToRad(this.player.rotate);

    if ((dx < 0) && (this.player.lookAt === 'right')) {
        this.player.lookAt = 'left';
        this.player.scale.x *= -1;
        this.player.rotate = 180;
    }
    if ((dx > 0) && (this.player.lookAt === 'left')) {
      this.player.lookAt = 'right';
      this.player.scale.x *= -1;
      this.player.rotate = 0;
    }
  },
  update: function () {

  }
};

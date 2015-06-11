Batcat.StartMenu = function (game) {};

Batcat.StartMenu.prototype = {
  create: function () {
    this.title = this.add.sprite(this.world.centerX - 209, 0, 'title');
    this.add.tween(this.title).to({y: 50}, 750, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
    this.start = this.add.image(this.world.centerX - 32, this.world.centerY,'play');
    this.start.inputEnabled = true;
    this.start.events.onInputDown.addOnce(this.startGame, this);

  },
  startGame: function () {
    this.state.start('Game');
  }
};

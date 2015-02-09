Batcat.Preloader = function (game) {
    this.preloadBar = null;
    this.title = null;
    this.ready = false;
}

Batcat.Preloader.prototype = {
    preload: function () {
        this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloadbar');
        this.preloadBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.preloadBar);
        this.load.image('title', 'assets/images/title.png');
        this.load.image('play', 'assets/images/play.png');
        this.load.image('ballJs', 'assets/images/skill_js.png');
        this.load.image('ballLaravel', 'assets/images/skill_laravel.png');
        this.load.image('ballMysql', 'assets/images/skill_mysql.png');
        this.load.image('ballPhaser', 'assets/images/skill_phaser.png');
        this.load.image('ballPhp', 'assets/images/skill_php.png');
        this.load.image('ballPs', 'assets/images/skill_ps.png');
        this.load.image('ballWp', 'assets/images/skill_wp.png');
        this.load.image('burger', 'assets/images/burger.png');
        this.load.image('corona','assets/images/blue.png')
        this.load.bitmapFont('monospace', 'assets/fonts/monospace.png', 'assets/fonts/monospace.fnt');
        this.load.spritesheet('batcat','assets/images/spritesheets/sprite.png',625,491)

    },
    create: function () {
        this.preloadBar.cropEnabled = false;
    },
    update: function () {
        this.ready = true;
        this.state.start('StartMenu');
    }
}
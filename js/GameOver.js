Batcat.GameOver = function (game) {
    }
Batcat.GameOver.prototype = {
    create: function () {
        this.add.bitmapText(70, this.world.centerY - 50, 'monospace', 'Oh no you eat all my skills,\n   hire Baptiste Chaleil \n    and feed the batcat ', 24);
    }
}
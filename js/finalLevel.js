var player, platforms, elements, cursors, bordersWin, waveCollition;
//var selectedSprite;
RutaEspectral.finalLevel = function (game) {};
RutaEspectral.finalLevel.prototype = {
    preload: function () {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.load.image('background', 'assets/finalLevel.png');
    },
    create: function () {
        game.add.tileSprite(0, 0, 800, 600, 'background');
    },
    update: function () {
        game.time.events.add(2000, this.credits, this, "");
    },
    credits: function () {
        levelState = 6;
        game.state.start('Videos');
    }
}
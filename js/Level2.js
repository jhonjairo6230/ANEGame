var player, platforms, test;
RutaEspectral.Level2 = function (game) {};
RutaEspectral.Level2.prototype = {
    preload: function () {
        game.load.image('background', 'assets/backgrounds/BGLevel2.png');
    },
    create: function () {
        game.add.tileSprite(0, 0, 1498, 600, 'background');
        game.world.setBounds(0, 0, 1498, 600);
    }
}
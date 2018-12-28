var player, platforms, elements, cursors, bordersWin;
RutaEspectral.Level2 = function (game) {};
RutaEspectral.Level2.prototype = {
    preload: function () {
        game.load.image('background', 'assets/level1/BGLevel1_1.png');
        game.load.spritesheet('spriteA', 'assets/sprites/spriteA.png', spriteSizes[spriteSizes.length - 1].width, spriteSizes[spriteSizes.length - 1].height);

    },
    create: function () {}
}
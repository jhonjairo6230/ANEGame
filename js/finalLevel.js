var player, platforms, elements, cursors, bordersWin, waveCollition;
//var selectedSprite;
RutaEspectral.finalLevel = function (game) {};
RutaEspectral.finalLevel.prototype = {
    preload: function () {
        game.load.image('background', 'assets/finalLevel.png');
        // game.load.image('starPrize', 'assets/starPrize.png');
        // game.load.spritesheet('continueBtn', 'assets/buttons/continueBtn.png', 136, 79);
    },
    create: function () {
        game.add.tileSprite(0, 0, 800, 600, 'background');
        // var title = game.add.text(330, 460, this.determineLevel(), {
        //     fontSize: '50px',
        //     fill: '#ffabed',
        //     font: 'Myriad pro'
        // });
        // continueBtn = game.add.button(350, 530, 'continueBtn', this.nextLevel, this, 1, 1, 0);

    },
    update: function () {}
}
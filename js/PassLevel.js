var player, platforms, elements, cursors, bordersWin, waveCollition;
//var selectedSprite;
RutaEspectral.PassLevel = function (game) {};
RutaEspectral.PassLevel.prototype = {
    preload: function () {
        game.load.image('background', 'assets/bgPassLevel.png');
        game.load.spritesheet('continueBtn', 'assets/buttons/continueBtn.png', 136, 79);
    },
    create: function () {
        game.add.tileSprite(0, 0, 800, 600, 'background');
        var text;
        if (isFinishLevel2) {
            text = 'Nivel 3';
        } else {
            text = 'Nivel 2';
        }
        var title = game.add.text(330, 250, text, {
            fontSize: '50px',
            fill: '#ffabed',
            font: 'Myriad pro'
        });
        continueBtn = game.add.button(340, 300, 'continueBtn', this.nextLevel, this, 1, 1, 0);

    },
    update: function () {},
    nextLevel: function () {
        if (isFinishLevel2) {

        } else {
            game.state.start('Level2');
        }
    }
}
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
        var title = game.add.text(330, 250, this.determineLevel(), {
            fontSize: '50px',
            fill: '#ffabed',
            font: 'Myriad pro'
        });
        continueBtn = game.add.button(340, 300, 'continueBtn', this.nextLevel, this, 1, 1, 0);

    },
    update: function () {},
    nextLevel: function () {
        switch (levelState) {
            case 2:
                game.state.start('Level2');
                break;
            case 3:
                game.state.start('Level3');
                break;
            case 4:
                game.state.start('Level4');
                break;
            default:
                break;
        }
    },
    determineLevel: function () {
        var text;
        switch (levelState) {
            case 1:
                text = 'Nivel2';
                levelState = 2;
                break;
            case 2:
                text = 'Nivel3';
                levelState = 3;
                break;
            case 3:
                text = 'Nivel4';
                levelState = 4;
                break;
            case 4:
                text = 'Nivel5';
                levelState = 5;
                break;
            default:
                break;
        }
        return text;
    }
}
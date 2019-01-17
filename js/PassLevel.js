var player, platforms, elements, cursors, bordersWin, waveCollition;
//var selectedSprite;
RutaEspectral.PassLevel = function (game) {};
RutaEspectral.PassLevel.prototype = {
    preload: function () {
        game.load.image('background', 'assets/bgPassLevel.png');
        game.load.image('starPrize', 'assets/starPrize.png');
        game.load.spritesheet('continueBtn', 'assets/buttons/continueBtn.png', 136, 79);
    },
    create: function () {
        game.add.tileSprite(0, 0, 800, 600, 'background');
        var title = game.add.text(330, 460, this.determineLevel(), {
            fontSize: '50px',
            fill: '#ffabed',
            font: 'Myriad pro'
        });
        continueBtn = game.add.button(350, 530, 'continueBtn', this.nextLevel, this, 1, 1, 0);

    },
    update: function () {},
    nextLevel: function () {
        switch (levelState) {
            case 2:
                game.state.start('Videos');
                break;
            case 3:
                game.state.start('Level3');
                break;
            case 4:
                game.state.start('Level4');
                break;
            case 5:
                game.state.start('Level5');
                break;
            default:
                break;
        }
    },
    determineLevel: function () {
        var text;
        switch (levelState) {
            case 1:
                text = 'Nivel 2';
                game.add.image(40, 140, 'starPrize');
                levelState = 2;
                break;
            case 2:
                text = 'Nivel 3';
                game.add.image(40, 140, 'starPrize');
                game.add.image(180, 80, 'starPrize');
                levelState = 3;
                break;
            case 3:
                text = 'Nivel 4';
                game.add.image(40, 140, 'starPrize');
                game.add.image(180, 80, 'starPrize');
                game.add.image(350, 22, 'starPrize');
                levelState = 4;
                break;
            case 4:
                text = 'Nivel 5';
                game.add.image(40, 140, 'starPrize');
                game.add.image(180, 80, 'starPrize');
                game.add.image(350, 22, 'starPrize');
                game.add.image(520, 80, 'starPrize');
                levelState = 5;
                break;
            default:
                break;
        }
        return text;
    }
}
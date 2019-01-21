var selectedSprite, player, barG, elements, rockS;
var isInitG = false;
var video;
var sprite;
var pics = [],
    k = 0;
RutaEspectral.Videos = function (game) {

};
RutaEspectral.Videos.prototype = {
    preload: function () {
        switch (levelState) {
            case 1:
                for (var i = 0; i < 130; i++) {
                    if (i < 10) {
                        game.load.image('nave_00' + i, 'assets/naveAnim/nave_00' + i + '.jpg');
                    } else if (i < 100) {
                        game.load.image('nave_0' + i, 'assets/naveAnim/nave_0' + i + '.jpg');
                    } else {
                        game.load.image('nave_' + i, 'assets/naveAnim/nave_' + i + '.jpg');
                    }
                }
                break;
            case 2:
                for (var i = 0; i < 130; i++) {
                    if (i < 10) {
                        game.load.image('astronauta_00' + i, 'assets/astronauta/astronauta_00' + i + '.jpg');
                    } else if (i < 100) {
                        game.load.image('astronauta_0' + i, 'assets/astronauta/astronauta_0' + i + '.jpg');
                    } else {
                        game.load.image('astronauta_' + i, 'assets/astronauta/astronauta_' + i + '.jpg');
                    }
                }
                break;
            case 6:
                for (var i = 0; i < 299; i++) {
                    if (i < 10) {
                        game.load.image('creditos_00' + i, 'assets/creditos/creditos_00' + i + '.jpg');
                    } else if (i < 100) {
                        game.load.image('creditos_0' + i, 'assets/creditos/creditos_0' + i + '.jpg');
                    } else {
                        game.load.image('creditos_' + i, 'assets/creditos/creditos_' + i + '.jpg');
                    }
                }
                break;
            default:
                break;
        }
    },
    create: function () {
        switch (levelState) {
            case 1:
                this.showShip();
                break;
            case 2:
                this.showAstro();
                break;
            case 6:
                this.showCredits();
                break;
            default:
                break;
        }
    },
    showShip: function () {
        if (k < 10) {
            game.add.image(0, 50, 'nave_00' + k);
        } else if (k < 100) {
            game.add.image(0, 50, 'nave_0' + k);
        } else {
            game.add.image(0, 50, 'nave_' + k);
        }
        if (k == 130) {
            k = 0;
            game.state.start('Level1');
        }
        game.time.events.add(50, this.increment, this, 0);
    },
    showAstro: function () {
        if (k < 10) {
            game.add.image(0, 50, 'astronauta_00' + k);
        } else if (k < 100) {
            game.add.image(0, 50, 'astronauta_0' + k);
        } else {
            game.add.image(0, 50, 'astronauta_' + k);
        }
        if (k == 130) {
            k = 0;
            game.state.start('Level2');
        }
        game.time.events.add(50, this.increment, this, 0);
    },
    showCredits: function () {
        if (k < 10) {
            game.add.image(0, 50, 'creditos_00' + k);
        } else if (k < 100) {
            game.add.image(0, 50, 'creditos_0' + k);
        } else {
            game.add.image(0, 50, 'creditos_' + k);
        }
        // if (k == 130) {
        //     k = 0;
        //     game.state.start('Level2');
        // }
        game.time.events.add(50, this.increment, this, 0);
    },
    increment: function () {
        k++;
        switch (levelState) {
            case 1:
                this.showShip();
                break;
            case 2:
                this.showAstro();
                break;
            case 6:
                if (k < 299) {
                    this.showCredits();
                }
                break;
            default:
                break;
        }
    },
    render: function () {


    }
};
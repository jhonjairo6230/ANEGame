RutaEspectral.Splash = function (game) {};
RutaEspectral.Splash.prototype = {
    preload: function () {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.load.image('backgroundS', 'assets/backgrounds/backgroundSpl.png');
        game.load.spritesheet('playBtn', 'assets/buttons/playBtn.png', 164, 79);

    },
    create: function () {
        game.add.sprite(0, 0, 'backgroundS');
        game.add.button(630, 500, 'playBtn', this.playGame, this, 1, 1, 0);
    },
    playGame: function (e) {
        document.getElementById("click").play();
        this.state.start('AvatarConfig');
    }
};
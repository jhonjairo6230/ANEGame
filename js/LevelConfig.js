(function () {

    game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game');
    game.state.add('Splash', RutaEspectral.Splash);
    game.state.add('AvatarConfig', RutaEspectral.AvatarConfig);
    game.state.add('AvatarSelected', RutaEspectral.AvatarSelected);
    // game.state.add('Level1', Ball.MainMenu);
    // game.state.add('Level2', Ball.Game);
    game.state.start('Splash');


})();
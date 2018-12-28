(function () {

    game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game');
    game.state.add('Splash', RutaEspectral.Splash);
    game.state.add('AvatarConfig', RutaEspectral.AvatarConfig);
    game.state.add('AvatarSelected', RutaEspectral.AvatarSelected);
    game.state.add('GoToShip', RutaEspectral.GoToShip);
    game.state.add('Level1', RutaEspectral.Level1);
    game.state.add('Level1_1', RutaEspectral.Level1_1);
    game.state.add('Level2', RutaEspectral.Level2);
    game.state.start('Level1');


})();
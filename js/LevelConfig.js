(function () {
    game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game');
    game.state.add('Splash', RutaEspectral.Splash);
    game.state.add('AvatarConfig', RutaEspectral.AvatarConfig);
    game.state.add('AvatarSelected', RutaEspectral.AvatarSelected);
    game.state.add('GoToShip', RutaEspectral.GoToShip);
    game.state.add('Level1', RutaEspectral.Level1);
    game.state.add('PassLevel', RutaEspectral.PassLevel);
    game.state.add('Level2', RutaEspectral.Level2);
    game.state.add('Level3', RutaEspectral.Level3);
    game.state.add('Level4', RutaEspectral.Level4);
    game.state.add('Level4_2', RutaEspectral.Level4_2);
    game.state.start('Level3');
})();
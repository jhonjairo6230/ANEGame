(function () {
    var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game');
    game.state.add('Splash', AvatarConfig);
    // game.state.add('AvatarConfig', Ball.Preloader);
    // game.state.add('Level1', Ball.MainMenu);
    // game.state.add('Level2', Ball.Game);
    game.state.start('Splash');
})();
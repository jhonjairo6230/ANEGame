var selectedSprite;
RutaEspectral.AvatarSelected = function (game) {

};
RutaEspectral.AvatarSelected.prototype = {
    preload: function () {
        game.load.image('background', 'assets/backgrounds/Background1.png');
        game.load.spritesheet('playBtn', 'assets/buttons/playBtn.png', 164, 79);

        game.load.image(headSelected.key, 'assets/avatarOptions/' + headSelected.key + '.png');
        game.load.image(footSelected.key, 'assets/avatarOptions/' + footSelected.key + '.png');
        game.load.image(hairSelected.key, 'assets/avatarOptions/' + hairSelected.key + '.png');
        game.load.image(armSelected.key, 'assets/avatarOptions/' + armSelected.key + '.png');
        selectedSprite = RutaEspectral.selectSprite(hairSelected.key, headSelected.key, armSelected.key, footSelected.key);
        if (selectedSprite != -1) {
            game.load.spritesheet('sprite' + selectedSprite, 'assets/sprites/sprite' + selectedSprite + '.png', spriteSizes[selectedSprite].width, spriteSizes[selectedSprite].height);
        } else {
            game.load.spritesheet('sprite12', 'assets/sprites/sprite12.png', spriteSizes[12].width, spriteSizes[12].height);
        }
    },
    create: function () {
        game.add.sprite(0, 0, 'background');
        game.add.button((game.world.width / 2) - 140, 500, 'playBtn', this.playGame, this, 1, 1, 0);
        // game.add.sprite(headSelected.position.x, headSelected.position.y, headSelected.key);
        // game.add.sprite(footSelected.position.x, footSelected.position.y, footSelected.key);
        // game.add.sprite(armSelected.position.x, armSelected.position.y, armSelected.key);
        // game.add.sprite(hairSelected.position.x, hairSelected.position.y, hairSelected.key);
        if (selectedSprite != -1) {
            var player = game.add.sprite(100, 100, 'sprite' + selectedSprite);
            player.animations.add('sayHello', [4, 5, 6], 5, true);
            player.scale.set(3);
            player.animations.play('sayHello');

        } else {
            var player = game.add.sprite(100, 100, 'sprite' + 12);
            player.animations.add('sayHello', [4, 5, 6], 5, true);
            player.scale.set(3);
            player.animations.play('sayHello');
        }
        title = game.add.text(400, game.world.height / 2, 'Felicidades, Personaje armado!', {
            fontSize: '25px',
            fill: '#ffabed',
            font: 'Myriad pro'
        });
    },
    playGame: function (e) {
        this.state.start('Level1');
    }
};
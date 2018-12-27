var selectedSprite;
RutaEspectral.AvatarSelected = function (game) {

};
RutaEspectral.AvatarSelected.prototype = {
    preload: function () {
        game.load.image('background', 'assets/backgrounds/Background1.png');
        game.load.spritesheet('playBtn', 'assets/buttons/nextBtn.png', 145.5, 79);
        game.load.spritesheet('backBtn', 'assets/buttons/backBtn.png', 145.5, 79);
        game.load.image(headSelected.key, 'assets/avatarOptions/' + headSelected.key + '.png');
        game.load.image(footSelected.key, 'assets/avatarOptions/' + footSelected.key + '.png');
        game.load.image(hairSelected.key, 'assets/avatarOptions/' + hairSelected.key + '.png');
        game.load.image(armSelected.key, 'assets/avatarOptions/' + armSelected.key + '.png');
        selectedSprite = RutaEspectral.selectSprite(hairSelected.key, headSelected.key, armSelected.key, footSelected.key);
        if (selectedSprite != -1) {
            game.load.spritesheet('sprite' + selectedSprite, 'assets/sprites/sayHello/sprite' + selectedSprite + '.png', sayHelloSpriteSizes[selectedSprite].width, sayHelloSpriteSizes[selectedSprite].height);
        } else {
            game.load.spritesheet('sprite12', 'assets/sprites/sayHello/sprite12.png', sayHelloSpriteSizes[12].width, sayHelloSpriteSizes[12].height);
            //game.load.spritesheet('sprite12', 'assets/sprites/sayHello/sprite0.png', 241, 300);
        }
    },
    create: function () {
        game.add.sprite(0, 0, 'background');
        game.add.button((game.world.width / 2) - 140, 500, 'playBtn', this.playGame, this, 1, 1, 0);
        game.add.button(80, 500, 'backBtn', this.backPress, this, 1, 1, 0);
        if (selectedSprite != -1) {
            var player = game.add.sprite(80, 130, 'sprite' + selectedSprite);
            player.animations.add('sayHello', [0, 1, 2], 5, true);
            //player.scale.set(1);
            player.animations.play('sayHello');

        } else {
            var player = game.add.sprite(80, 130, 'sprite' + 12);
            player.animations.add('sayHello', [0, 1, 2], 5, true);
            //player.scale.set(1);
            player.animations.play('sayHello');
        }
        title = game.add.text(400, 200, 'Felicidades,\n Personaje armado!', {
            fontSize: '50px',
            fill: '#ffabed',
            font: 'Myriad pro'
        });
    },
    playGame: function (e) {
        this.state.start('Level1');
    },
    backPress: function (e) {
        this.state.start('AvatarConfig');
    }
};
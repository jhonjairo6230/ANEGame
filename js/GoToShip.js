var selectedSprite, player, barG, elements, rockS;
var isInitG = false;
RutaEspectral.GoToShip = function (game) {

};
RutaEspectral.GoToShip.prototype = {
    preload: function () {
        game.load.image('background', 'assets/backgrounds/GoToShipBG.png');
        game.load.image('platform', 'assets/level1/platform.png');
        game.load.image('rockS', 'assets/rockS.png');
        game.load.spritesheet('closeBtn', 'assets/buttons/closeBtn.png', 40, 40);
        selectedSprite = RutaEspectral.selectSprite(hairSelected.key, headSelected.key, armSelected.key, footSelected.key);
        if (selectedSprite != -1) {
            var width = spriteSizes[selectedSprite].width / 11;
            game.load.spritesheet('sprite' + selectedSprite, 'assets/sprites/sprite' + selectedSprite + '.png', width, spriteSizes[selectedSprite].height, 11);
        } else {
            game.load.spritesheet('spriteA', 'assets/sprites/spriteA.png', this.round(spriteSizes[spriteSizes.length - 1].width / 11, 1), spriteSizes[spriteSizes.length - 1].height, 11);
        }
    },
    create: function () {
        game.add.tileSprite(0, 0, 1300, 600, 'background');
        game.world.setBounds(0, 0, 1300, 500);
        game.renderer.roundPixels = true;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //Add planets
        elements = game.add.group();
        elements.enableBody = true;
        var platform = elements.create(500, 410, 'platform');
        platform.body.immovable = true;
        platform = elements.create(600, 360, 'platform');
        platform.body.immovable = true;
        platform = elements.create(700, 310, 'platform');
        platform.body.immovable = true;
        platform = elements.create(800, 260, 'platform');
        platform.body.immovable = true;
        platform = elements.create(900, 210, 'platform');
        platform.body.immovable = true;
        rockS = game.add.group();
        rockS.enableBody = true;
        rocket = rockS.create(1100, 160, 'rockS');
        rocket.body.immovable = true;
        if (selectedSprite != -1) {
            player = game.add.sprite(200, 450, 'sprite' + selectedSprite);
        } else {
            player = game.add.sprite(80, 130, 'spriteA');
        }
        player.animations.add('right', [7, 8], 8, true);
        player.animations.add('left', [0, 1], 8, true);
        game.physics.arcade.enable(player);
        player.body.bounce.y = 0.4;
        player.body.gravity.y = 400;
        player.body.collideWorldBounds = true;
        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        this.infoText(message1, 200, 200, 300, 90);
    },
    update: function () {
        var hitPlatform = game.physics.arcade.collide(player, elements);
        var catchRocket = game.physics.arcade.collide(player, rockS);
        if (isInitG) {
            cursors = game.input.keyboard.createCursorKeys();
            if (catchRocket) {
                this.state.start('Level1');
            }
            //  Reset the players velocity (movement)
            player.body.velocity.x = 0;
            if (cursors.left.isDown) {
                player.body.velocity.x = -150;
                player.animations.play('left');
            } else if (cursors.right.isDown) {
                player.body.velocity.x = 150;
                player.animations.play('right');
            } else {
                player.animations.stop();
                player.frame = 5;
            }
            if (cursors.up.isDown) {
                player.body.velocity.y = -150;
            }
        }
    },
    infoText(txt, x, y, width, height) {
        barG = game.add.graphics();
        barG.beginFill(0x003300, 0.4);
        barG.drawRect(x, y, width, height);
        var style = {
            font: "20px Myriad pro",
            fill: "#fff",
            wordWrap: true,
            wordWrapWidth: width,
            wordWrapHeight: height,
            align: "center",
        };
        textG = game.add.text(0, 20, txt, style);
        textG.setTextBounds(x + 10, y, width, height);
        initBtnG = game.add.button((x - 20) + width, y - 20, 'closeBtn', this.initLevel, this, 1, 1, 0);
    },
    initLevel: function () {
        isInitG = true;
        barG.kill();
        textG.kill();
        initBtnG.kill();
    },
    round: function (num, decimal) {
        var sign = (num >= 0 ? 1 : -1);
        num = num * sign;
        if (decimal === 0)
            return sign * Math.round(num);
        // round(x * 10 ^ decimal)
        num = num.toString().split('e');
        num = Math.round(+(num[0] + 'e' + (num[1] ? (+num[1] + decimal) : decimal)));
        // x * 10 ^ (-decimal)
        num = num.toString().split('e');
        return sign * (num[0] + 'e' + (num[1] ? (+num[1] - decimal) : -decimal));
    }
};
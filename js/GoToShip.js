var selectedSprite, player, barG, elements, rockS;
var isInitG = false;
RutaEspectral.GoToShip = function (game) {

};
RutaEspectral.GoToShip.prototype = {
    preload: function () {
        game.load.image('background', 'assets/backgrounds/GoToShipBG.png');
        game.load.image('platform', 'assets/level1/platform.png');
        game.load.image('rockS', 'assets/rockS.png');
        game.load.spritesheet('playBtn', 'assets/buttons/play2Btn.png', 134, 78);
        selectedSprite = RutaEspectral.selectSprite(hairSelected.key, headSelected.key, armSelected.key, footSelected.key);
        if (selectedSprite != -1) {
            game.load.spritesheet('sprite' + selectedSprite, 'assets/sprites/sprite' + selectedSprite + '.png', spriteSizes[selectedSprite].width, spriteSizes[selectedSprite].height);
        } else {
            game.load.spritesheet('spriteA', 'assets/sprites/spriteA.png', spriteSizes[spriteSizes.length - 1].width, spriteSizes[spriteSizes.length - 1].height);
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
        var platform = elements.create(400, 430, 'platform');
        platform.body.immovable = true;
        platform = elements.create(500, 380, 'platform');
        platform.body.immovable = true;
        platform = elements.create(600, 330, 'platform');
        platform.body.immovable = true;
        platform = elements.create(710, 300, 'platform');
        platform.body.immovable = true;
        platform = elements.create(830, 270, 'platform');
        platform.body.immovable = true;
        rockS = game.add.group();
        rockS.enableBody = true;
        rocket = rockS.create(1000, 230, 'rockS');
        rocket.body.immovable = true;
        if (selectedSprite != -1) {
            player = game.add.sprite(200, 450, 'sprite' + selectedSprite);
        } else {
            player = game.add.sprite(80, 130, 'spriteA');
        }
        player.animations.add('right', [7, 8, 9, 10], 8, true);
        player.animations.add('left', [0, 1, 2, 3], 8, true);
        game.physics.arcade.enable(player);
        player.body.bounce.y = 0.4;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        this.infoText("¡Viajemos juntos!, en este nivel debes embarcarte en una nave espacial para recorrer el espacio en busqueda de tu traje espacial", 200, 500);
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
                //  Move to the left
                player.body.velocity.x = -150;

                player.animations.play('left');

            } else if (cursors.right.isDown) {
                //  Move to the right
                player.body.velocity.x = 150;

                player.animations.play('right');
                //clicked = false;
            } else {
                //  Stand still
                player.animations.stop();

                player.frame = 5;
            }

            //  Allow the player to jump if they are touching the ground.
            if (cursors.up.isDown && hitPlatform) {
                player.body.velocity.y = -150;
            }
        }
    },
    infoText(txt, width, height) {
        barG = game.add.graphics();
        barG.beginFill(0x003300, 0.4);
        barG.drawRect(width - 20, 100, height + 20, 100);
        var style = {
            font: "20px Myriad pro",
            fill: "#fff",
            wordWrap: true,
            wordWrapWidth: 480,
            wordWrapHeight: 200,
            align: "center",
        };
        textG = game.add.text(0, 0, txt, style);
        textG.setTextBounds(width, 150, height, 150);
        // if (!isPaused) {
        initBtnG = game.add.button(380, 255, 'playBtn', this.initLevel, this, 1, 1, 0);
        // } else {
        //     continueBtn = game.add.button(width + 90, 355, 'continueBtn', this.initLevel, this, 1, 1, 0);
        // }
    },
    initLevel: function () {
        isInitG = true;
        barG.kill();
        textG.kill();
        initBtnG.kill();
    }
};
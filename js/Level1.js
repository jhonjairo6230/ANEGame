var player, cursors;
RutaEspectral.Level1 = function (game) {};
RutaEspectral.Level1.prototype = {
    preload: function () {
        game.load.image('background', 'assets/backgrounds/BGLevel1.png');
        selectedSprite = RutaEspectral.selectSprite(hairSelected.key, headSelected.key, armSelected.key, footSelected.key);
        if (selectedSprite != -1) {
            game.load.spritesheet('sprite' + selectedSprite, 'assets/sprites/sprite' + selectedSprite + '.png', spriteSizes[selectedSprite].width, spriteSizes[selectedSprite].height);
        } else {
            game.load.spritesheet('sprite12', 'assets/sprites/sprite12.png', spriteSizes[12].width, spriteSizes[12].height);
        }
        game.load.spritesheet('gamepad',
            'assets/dpad.png', 100, 100);
        // game.load.spritesheet('playBtn', 'assets/buttons/playBtn.png', 164, 79);

    },
    create: function () {
        game.add.tileSprite(0, 0, 1340, 600, 'background');
        game.world.setBounds(0, 0, 1340, 600);
        game.physics.startSystem(Phaser.Physics.P2JS);
        if (selectedSprite != -1) {
            player = game.add.sprite(100, 100, 'sprite' + selectedSprite);
        } else {
            player = game.add.sprite(100, 100, 'sprite12');
        }
        game.physics.p2.enable(player);

        player.body.fixedRotation = true;
        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1, 2, 3], 5, true);
        player.animations.add('right', [8, 9, 10, 11], 5, true);
        cursors = game.input.keyboard.createCursorKeys();
        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        // Add the VirtualGamepad plugin to the game
        this.gamepad = this.game.plugins.add(Phaser.Plugin.VirtualGamepad);

        // Add a joystick to the game (only one is allowed right now)
        this.joystick = this.gamepad.addJoystick(100, game.world.height - 100, 1.2, 'gamepad');

        // Add a button to the game (only one is allowed right now)
        this.button = this.gamepad.addButton(400, 1400, 1.0, 'gamepad');
    },
    update: function () {
        player.body.setZeroVelocity();

        if (cursors.up.isDown) {
            player.body.moveUp(300)
        } else if (cursors.down.isDown) {
            player.body.moveDown(300);
        }

        if (cursors.left.isDown) {
            player.body.velocity.x = -300;
        } else if (cursors.right.isDown) {
            player.body.moveRight(300);
        }
        player.body.velocity.x = 0;

        if (cursors.left.isDown || this.joystick.properties.left) {
            //  Move to the left
            player.body.velocity.x = -150;

            player.animations.play('left');

        } else if (cursors.right.isDown || this.joystick.properties.right) {
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
        if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
            player.body.velocity.y = -350;
        }
    }

};
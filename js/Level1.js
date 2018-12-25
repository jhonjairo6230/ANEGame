var player;
RutaEspectral.Level1 = function (game) {};
RutaEspectral.Level1.prototype = {
    preload: function () {
        game.load.image('background', 'assets/backgrounds/BGLevel1_1.png');
        //selectedSprite = RutaEspectral.selectSprite(hairSelected.key, headSelected.key, armSelected.key, footSelected.key);
        selectedSprite = -1;
        if (selectedSprite != -1) {
            game.load.spritesheet('sprite' + selectedSprite, 'assets/sprites/sprite' + selectedSprite + '.png', spriteSizes[selectedSprite].width, spriteSizes[selectedSprite].height);
        } else {
            game.load.image('rocket', 'assets/rocket.png');
        }
        game.load.image('platform', 'assets/platform.png');
        game.load.spritesheet('gamepad',
            'assets/dpad.png', 100, 100);

    },
    create: function () {
        game.add.tileSprite(0, 0, 1340, 600, 'background');
        game.world.setBounds(0, 0, 1340, 600);
        game.physics.startSystem(Phaser.Physics.P2JS);
        if (selectedSprite != -1) {
            player = game.add.sprite(100, 100, 'sprite' + selectedSprite);
        } else {
            player = game.add.sprite(100, 100, 'rocket');
        }
        game.physics.p2.enable(player);
        player.lastAngle = 0;
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
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        if (this.joystick.properties.left) {
            player.body.velocity.x = -120;
        } else if (this.joystick.properties.right) {
            player.body.velocity.x = 120;
        } else if (this.joystick.properties.up) {
            player.body.velocity.y = -120;
        } else if (this.joystick.properties.down) {
            player.body.velocity.y = 120;
        }
        //Use for move in diagonal
        if (this.joystick.properties.angle > 0 && this.joystick.properties.angle < 90) {
            player.body.velocity.y = 120;
            player.body.velocity.x = 120;
        } else if (this.joystick.properties.angle < 0 && this.joystick.properties.angle > -90) {
            player.body.velocity.y = -120;
            player.body.velocity.x = 120;
        } else if (this.joystick.properties.angle > 90 && this.joystick.properties.angle < 180) {
            player.body.velocity.y = 120;
            player.body.velocity.x = -120;
        } else if (this.joystick.properties.angle < -90 && this.joystick.properties.angle > -180) {
            player.body.velocity.y = -120;
            player.body.velocity.x = -120;
        }
    }

};
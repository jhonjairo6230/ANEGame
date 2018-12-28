var player, platforms, elements, cursors, bordersWin, waveCollition, bordersWin;

RutaEspectral.Level2 = function (game) {};
RutaEspectral.Level2.prototype = {
    preload: function () {
        game.load.image('background', 'assets/level2/bgLevel2.png');
        game.load.spritesheet('spriteA', 'assets/sprites/spriteA.png', spriteSizes[spriteSizes.length - 1].width, spriteSizes[spriteSizes.length - 1].height);
        game.load.image('wave', 'assets/level1/wave.png');
    },
    create: function () {
        game.add.tileSprite(0, 0, 2700, 600, 'background');
        game.world.setBounds(0, 0, 2700, 600);
        game.renderer.roundPixels = true;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        waveCollition = game.add.group();
        waveCollition.enableBody = true;
        elements = game.add.group();
        elements.enableBody = true;
        var platform = elements.create(200, 550, 'platform');
        platform.body.immovable = true;
        var wave = waveCollition.create(220, 300, 'wave');
        wave.body.immovable = true;
        platform = elements.create(400, 400, 'platform');
        platform.body.immovable = true;
        platform = elements.create(600, 550, 'platform');
        platform.body.immovable = true;
        platform = elements.create(800, 350, 'platform');
        platform.body.immovable = true;
        var wave = waveCollition.create(820, 300, 'wave');
        wave.body.immovable = true;
        platform = elements.create(1000, 100, 'platform');
        platform.body.immovable = true;
        platform = elements.create(1200, 350, 'platform');
        platform.body.immovable = true;
        platform = elements.create(1300, 250, 'platform');
        platform.body.immovable = true;
        platform = elements.create(1350, 350, 'platform');
        platform.body.immovable = true;
        var wave = waveCollition.create(1500, 300, 'wave');
        wave.body.immovable = true;
        platform = elements.create(1500, 200, 'platform');
        platform.body.immovable = true;
        platform = elements.create(1700, 400, 'platform');
        platform.body.immovable = true;
        platform = elements.create(1930, 450, 'platform');
        platform.body.immovable = true;
        platform = elements.create(2050, 300, 'platform');
        platform.body.immovable = true;
        platform = elements.create(2200, 200, 'platform');
        platform.body.immovable = true;
        platform = elements.create(2450, 340, 'platform');
        platform.body.immovable = true;
        platform = elements.create(2800, 400, 'platform');
        platform.body.immovable = true;
        player = game.add.sprite(80, 130, 'spriteA');
        player.animations.add('right', [7, 8, 9, 10], 8, true);
        player.animations.add('left', [0, 1, 2, 3], 8, true);
        game.physics.arcade.enable(player);
        player.body.bounce.y = 0.4;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
        bordersWin = game.add.group();
        bordersWin.enableBody = true;
        var winFlag = bordersWin.create(game.world.width - 36, 220, 'winFlag');
        winFlag.body.immovable = true;
        // bordersLost = game.add.group();
        // bordersLost.enableBody = true;
        // for (var i = 0; i < 500; i++) {
        //     var borderV = bordersWin.create(1496, i, 'px');
        //     borderV.body.immovable = true;
        // };
        var stbackround = game.add.image(640, 0, 'bgLives');
        stbackround.fixedToCamera = true;
        stbackround.scale.set(2, 1);
        this.showLives();
        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    },
    update: function () {
        var hitPlatform = game.physics.arcade.collide(player, elements);
        var finish = game.physics.arcade.collide(player, bordersWin);
        if (finish) {
            isFinishLevel2 = true;
            game.state.start('PassLevel');
        }
        cursors = game.input.keyboard.createCursorKeys();
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
        if (cursors.up.isDown) {
            player.body.velocity.y = -150;
        }
        game.physics.arcade.overlap(player, waveCollition, this.collectWave, null, this);
    },
    collectWave: function (player, wave) {
        // Removes the star from the screen
        wave.kill();
    },
    showLives() {
        if (stars) {
            stars.kill();
            stars = game.add.group();
            stars.enableBody = true;
            stars.fixedToCamera = true;
            var w = 0;
            for (var i = 0; i < countLives; i++) {
                //  Create a star inside of the 'stars' group
                var star = stars.create(766 - w, 5, 'star');
                w += 22;
            }
        }
    }
}
var player, platforms, elements, cursors, bordersWin, waveCollition;
//var selectedSprite;
RutaEspectral.Level1_1 = function (game) {};
RutaEspectral.Level1_1.prototype = {
    preload: function () {
        game.load.image('background', 'assets/level1/BGLevel1_1.png');
        game.load.spritesheet('spriteA', 'assets/sprites/spriteA.png', spriteSizes[spriteSizes.length - 1].width, spriteSizes[spriteSizes.length - 1].height);
        game.load.image('wave', 'assets/level1/wave.png');
    },
    create: function () {
        game.add.tileSprite(0, 0, 1497, 600, 'background');
        game.world.setBounds(0, 0, 1497, 500);
        game.renderer.roundPixels = true;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        var timeR = timeRest.split(":");
        timerL1_1 = game.time.create(false);
        // Create a delayed event 1m and 30s from now
        timerEvent = timerL1_1.add(Phaser.Timer.MINUTE * timeR[0] + Phaser.Timer.SECOND * timeR[1], this.endTimer, this);
        // Start the timer
        // Start the timer
        timerL1_1.start();
        waveCollition = game.add.group();
        waveCollition.enableBody = true;
        elements = game.add.group();
        elements.enableBody = true;
        var platform = elements.create(200, 350, 'platform');
        platform.body.immovable = true;
        var wave = waveCollition.create(220, 300, 'wave');
        wave.body.immovable = true;
        platform = elements.create(400, 200, 'platform');
        platform.body.immovable = true;
        platform = elements.create(600, 350, 'platform');
        platform.body.immovable = true;
        platform = elements.create(800, 350, 'platform');
        platform.body.immovable = true;
        var wave = waveCollition.create(820, 300, 'wave');
        wave.body.immovable = true;
        platform = elements.create(1000, 100, 'platform');
        platform.body.immovable = true;
        platform = elements.create(1200, 350, 'platform');
        platform.body.immovable = true;
        var wave = waveCollition.create(1220, 300, 'wave');
        wave.body.immovable = true;
        platform = elements.create(1300, 250, 'platform');
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
        // bordersLost = game.add.group();
        // bordersLost.enableBody = true;
        for (var i = 0; i < 500; i++) {
            var borderV = bordersWin.create(1496, i, 'px');
            borderV.body.immovable = true;
        };
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
            game.state.start('Level2');
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
    },
    render: function () {
        // If our timer is running, show the time in a nicely formatted way, else show 'Done!'
        if (timerL1_1.running) {
            game.debug.text(this.formatTime(Math.round((timerEvent.delay - timerL1_1.ms) / 1000)), 2, 14, "#0f0");
        } else {
            //game.debug.text("Done!", 2, 14, "#0f0");
            isInit = false;
            game.state.start('Level1');
        }
    },
    endTimer: function () {
        // Stop the timer when the delayed event triggers
        timerL1_1.stop();
    },
    formatTime: function (s) {
        // Convert seconds (s) to a nicely formatted and padded time string
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);
    }
}
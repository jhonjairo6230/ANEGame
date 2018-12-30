var realPlayer, player, playerFire, light, cursors, bordersWin, bordersLost, bar, text, elements, spaceS, spaceSuit;
var initBtn, continueBtn, closeBtn;
var isInit = false,
    isSuitCollected = false,
    isPaused = false,
    spaceA, spaceSuitPhysics = false,
    isFinishLevel2 = false;
var starts, stbackround;
var randomObstructions = (Math.floor(Math.random() * (8 - 3) + 3));
RutaEspectral.Level1 = function (game) {};
RutaEspectral.Level1.prototype = {
    preload: function () {
        game.load.image('background', 'assets/level1/backround.png');
        game.load.image('rocket', 'assets/level1/rocket.png');
        game.load.image('rocketFire', 'assets/level1/rocketFire.png');
        game.load.image('platform', 'assets/level1/platform.png');
        game.load.image('moon', 'assets/level1/moon.png');
        game.load.image('planet1', 'assets/level1/planet1.png');
        game.load.image('planet2', 'assets/level1/planet2.png');
        game.load.image('planet3', 'assets/level1/planet3.png');
        game.load.image('planet4', 'assets/level1/planet4.png');
        game.load.image('satellite', 'assets/level1/satelite.png');
        game.load.image('obstructionGroup', 'assets/level1/obstructionGroup.png');
        game.load.image('obstruction1', 'assets/level1/obstruction1.png');
        game.load.image('obstruction2', 'assets/level1/obstruction2.png');
        game.load.image('winFlag', 'assets/level1/winFlag.png');
        game.load.image('spaceSuit', 'assets/level1/spaceSuit.png');
        game.load.image('px', 'assets/pix.png');
        game.load.image('bgLives', 'assets/level1/bgLives.png');
        game.load.image('star', 'assets/star.png');
        game.load.spritesheet('playBtn', 'assets/buttons/play2Btn.png', 134, 78);
        game.load.spritesheet('continueBtn', 'assets/buttons/continueBtn.png', 136, 79);
        game.load.spritesheet('closeBtn', 'assets/buttons/closeBtn.png', 40, 40);
        game.load.spritesheet('spriteA', 'assets/sprites/spriteA.png', spriteSizes[spriteSizes.length - 1].width, spriteSizes[spriteSizes.length - 1].height);

    },
    create: function () {
        game.add.tileSprite(0, 0, 1340, 600, 'background');
        game.world.setBounds(0, 0, 1340, 600);
        game.renderer.roundPixels = true;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //Timer
        //  Create our Timer
        timerL1 = game.time.create(false);
        // Create a delayed event 1m and 30s from now
        timerEvent = timerL1.add(Phaser.Timer.MINUTE * timeLevel1 + Phaser.Timer.SECOND * 0, this.endTimer, this);
        // Start the timer
        timerL1.start();
        //Add planets
        elements = game.add.group();
        elements.enableBody = true;
        var monE = game.add.group();
        monE.enableBody = true;
        var moon = monE.create(game.world.width - 170, 1, 'moon');
        moon.body.immovable = true;
        var planet1 = monE.create(1040, 60, 'planet1');
        planet1.body.immovable = true;
        var planet2 = monE.create(450, 20, 'planet2');
        planet2.body.immovable = true;
        var planet3 = monE.create(700, 120, 'planet3');
        planet3.body.immovable = true;
        var planet4 = monE.create(1100, 550, 'planet4');
        planet4.body.immovable = true;
        var planet5 = monE.create(750, 0, 'satellite');
        planet5.body.immovable = true;
        for (var i = 0; i <= randomObstructions; i++) {
            var obstruction = elements.create(this.randomPosition().w, this.randomPosition().h, 'obstruction1');
            obstruction.body.immovable = true;
            obstruction = elements.create(this.randomPosition().w, this.randomPosition().h, 'obstruction2');
            obstruction.body.immovable = true;
        }
        light = game.add.group();
        light.enableBody = true;
        var l = light.create(219, 500, 'px');
        for (var i = 220; i < 1050; i++) {
            l = light.create(i, 531, 'px');
            l.body.immovable = true;
            l = light.create(i, 100, 'px');
            l.body.immovable = true;
        }
        bordersWin = game.add.group();
        bordersWin.enableBody = true;
        // bordersLost = game.add.group();
        // bordersLost.enableBody = true;
        for (var i = 0; i < 600; i++) {
            var borderV = bordersWin.create(1338, i, 'px');
            borderV.body.immovable = true;
        }
        var winFlag = bordersWin.create(game.world.width - 36, 320, 'winFlag');
        winFlag.body.immovable = true;
        borderV.body.immovable = true;
        stbackround = game.add.image(640, 0, 'bgLives');
        stbackround.scale.set(2, 1);
        stbackround.fixedToCamera = true;
        stars = game.add.group();
        stars.enableBody = true;
        stars.fixedToCamera = true;
        spaceS = game.add.group();
        spaceS.enableBody = true;
        var spacePos = this.determinePlanetPosition();
        spaceSuit = spaceS.create(spacePos.w, spacePos.h, 'spaceSuit');
        spaceSuit.body.immovable = true;
        this.showLives();
        this.infoText(message2, '20px', false, 150, 150, 520, 180);
    },
    update: function () {
        var suitCollition = game.physics.arcade.collide(realPlayer, spaceS);
        var lostLive = game.physics.arcade.collide(realPlayer, elements);
        var finishWin = game.physics.arcade.collide(realPlayer, bordersWin);
        if (finishWin && isSuitCollected) {} else if (finishWin) {
            game.paused = true;
            isPaused = true;
            this.resetPlayer();
            this.infoText(message3, '20px', true, 700, 200, 300, 70);
        }
        if (isInit) {
            if (suitCollition) {
                spaceSuit.kill();
                isSuitCollected = true;
                game.paused = true;
                isPaused = true;
                player.body.velocity.x = 0;
                player.body.velocity.y = 0;
                realPlayer.body.velocity.x = 0;
                realPlayer.body.velocity.y = 0;
                this.infoText(message4, '20px', false, player.position.x - 150, 200, 380, 150);
            }
            if (lostLive) {
                countLives -= 1;
                if (countLives == 0) {
                    game.state.start('Level1');
                    isInit = false;
                    countLives = 3;
                }
                playerFire = game.add.sprite(player.position.x, player.position.y, 'rocketFire');
                game.paused = true;
                player.kill();
                realPlayer.kill();
                this.infoText(message5, '20px', true, player.position.x - 150, 200, 300, 80);
                this.showLives();
            }
            // cursors = game.input.keyboard.createCursorKeys();
            if (spaceSuitPhysics) {
                var lostLive = game.physics.arcade.collide(spaceA, elements);
                var winLevel = game.physics.arcade.collide(spaceA, bordersWin);
                if (winLevel) {
                    game.state.start('PassLevel');
                }
                spaceA.body.velocity.x = 0;
                if (cursors.left.isDown) {
                    //  Move to the left
                    spaceA.body.velocity.x = -150;
                    spaceA.animations.play('left');
                } else if (cursors.right.isDown) {
                    //  Move to the right
                    spaceA.body.velocity.x = 150;
                    spaceA.animations.play('right');
                    //clicked = false;
                } else {
                    //  Stand still
                    spaceA.animations.stop();
                    spaceA.frame = 5;
                }
                //  Allow the player to jump if they are touching the ground.
                if (cursors.up.isDown) {
                    spaceA.body.velocity.y = -150;
                }
            } else {
                realPlayer.body.velocity.x = 0;
                player.body.velocity.x = 0;
                if (cursors.left.isDown) {
                    player.body.velocity.x = -velocityLevel1;
                    realPlayer.body.velocity.x = -velocityLevel1;
                }
                if (cursors.right.isDown) {
                    player.body.velocity.x = velocityLevel1;
                    realPlayer.body.velocity.x = velocityLevel1;
                }
                if (cursors.up.isDown) {
                    player.body.velocity.y = -velocityLevel1;
                    realPlayer.body.velocity.y = -velocityLevel1;
                }
                if (cursors.down.isDown) {
                    player.body.velocity.y = velocityLevel1;
                    realPlayer.body.velocity.y = velocityLevel1;
                }
            }

            if (cursors.left.isDown) {
                if (spaceSuitPhysics) {
                    spaceA.body.velocity.x = -velocityLevel1;
                    spaceA.animations.play('left');
                } else {
                    player.body.velocity.x = -velocityLevel1;
                    realPlayer.body.velocity.x = -velocityLevel1;
                }
            }
        }
    },
    infoText(txt, letterSize, isAdvertence, x, y, width, height) {
        bar = game.add.graphics();
        bar.beginFill(0x003300, 0.4);
        // bar.drawRect(width - 20, 180, height + 20, 180);
        bar.drawRect(x, y, width, height);
        var style = {
            font: letterSize + " Myriad pro",
            fill: "#fff",
            wordWrap: true,
            wordWrapWidth: width - 20,
            wordWrapHeight: height,
            align: "center",
        };
        text = game.add.text(10, 20, txt, style);
        // text.setTextBounds(width, 200, height, 200);
        text.setTextBounds(x, y, width, height);
        if (isAdvertence) {
            closeBtn = game.add.button((x - 20) + width, y - 20, 'closeBtn', this.closeAdv, this, 1, 1, 0);
        } else {
            if (!isPaused) {
                initBtn = game.add.button(x + (width / 2) - 67, y + height, 'playBtn', this.initLevel, this, 1, 1, 0);
            } else {
                continueBtn = game.add.button(x + (width / 2) - 67, y + height, 'continueBtn', this.initLevel, this, 1, 1, 0);
            }
        }
    },
    closeAdv: function () {
        if (playerFire) {
            playerFire.kill();
        }
        bar.kill();
        text.kill();
        closeBtn.kill();
        game.paused = false;
        this.resetPlayer();
    },
    initLevel() {
        bar.kill();
        text.kill();
        if (!isPaused) {
            initBtn.kill();
            isInit = true;
            this.resetPlayer();
        } else {
            game.paused = false;
            isPaused = false;
            continueBtn.kill();
            countLives += 1;
            this.showLives();
            this.setSpaceSuit(player.position.x, player.position.y);
            player.kill();
            realPlayer.kill();
            spaceSuitPhysics = true;
            // game.state.start('Level1_1');
        }
    },
    resetPlayer() {
        if (player) {
            realPlayer.kill();
            player.kill();
        }
        player = game.add.sprite(219, 200, 'rocket');
        realPlayer = game.add.sprite(239, 215, 'px');
        game.physics.arcade.enable(player);
        game.physics.arcade.enable(realPlayer);
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 200;
        realPlayer.body.bounce.y = 0.2;
        realPlayer.body.gravity.y = 200;
        player.body.collideWorldBounds = true;
        realPlayer.body.collideWorldBounds = true;
        game.camera.follow(realPlayer, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        cursors = game.input.keyboard.createCursorKeys();
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
    randomPosition: function () {
        return {
            w: (400 + (Math.floor(Math.random() * (900 - 1) + 1))),
            h: (Math.floor(Math.random() * (550 - 1) + 1))
        };
    },
    determinePlanetPosition: function () {
        var randomPlanet = Math.floor(Math.random() * 3);
        var element;
        switch (randomPlanet) {
            case 0:
                element = {
                    w: 1040,
                    h: 60
                }
                break;
            case 1:
                element = {
                    w: 450,
                    h: 20
                }
                break;
            case 2:
                element = {
                    w: 700,
                    h: 120
                }
                break;
            case 3:
                element = {
                    w: 1100,
                    h: 550
                }
                break;
            default:
                element = {
                    w: 1100,
                    h: 550
                }
                break;
        }
        return element;
    },
    render: function () {
        // If our timer is running, show the time in a nicely formatted way, else show 'Done!'
        if (timerL1.running) {
            timeRest = this.formatTime(Math.round((timerEvent.delay - timerL1.ms) / 1000));
            game.debug.text(this.formatTime(Math.round((timerEvent.delay - timerL1.ms) / 1000)), 2, 14, "#0f0");
        } else {
            //game.debug.text("Done!", 2, 14, "#0f0");
            isInit = false;
            game.state.start('Level1');
        }
    },
    endTimer: function () {
        // Stop the timer when the delayed event triggers
        timerL1.stop();
    },
    formatTime: function (s) {
        // Convert seconds (s) to a nicely formatted and padded time string
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);
    },
    setSpaceSuit(x, y) {
        spaceA = game.add.sprite(x, y, 'spriteA');
        spaceA.animations.add('right', [7, 8, 9, 10], 8, true);
        spaceA.animations.add('left', [0, 1, 2, 3], 8, true);
        game.physics.arcade.enable(spaceA);
        spaceA.body.bounce.y = 0.4;
        spaceA.body.gravity.y = 300;
        spaceA.body.collideWorldBounds = true;
        game.camera.follow(spaceA, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    }
};
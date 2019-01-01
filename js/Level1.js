var realPlayer, player, playerFire, light, cursors, bordersWin, bordersLost, bar, text, elements, spaceS, spaceSuit;
var initBtn, continueBtn, closeBtn;
var isInit = false,
    isSuitCollected = false,
    isPaused = false,
    spaceA, spaceSuitPhysics = false;
var starts, stbackround;
var randomObstructions = (Math.floor(Math.random() * (60 - 50) + 50));
RutaEspectral.Level1 = function (game) {};
RutaEspectral.Level1.prototype = {
    preload: function () {
        game.load.image('background', 'assets/level1/background.png');
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
        game.load.spritesheet('spriteA', 'assets/sprites/spriteA.png', this.round((spriteSizes[spriteSizes.length - 1].width) / 11, 3), spriteSizes[spriteSizes.length - 1].height);

    },
    create: function () {
        game.add.tileSprite(0, 0, 10000, 600, 'background');
        game.world.setBounds(0, 0, 10000, 600);
        game.renderer.roundPixels = true;
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // timerL1 = game.time.create(false);
        // timerEvent = timerL1.add(Phaser.Timer.MINUTE * timeLevel1 + Phaser.Timer.SECOND * 0, this.endTimer, this);
        // // Start the timer
        // timerL1.start();
        //Add planets
        var planet = game.add.group();
        planet.enableBody = true;
        var moon = planet.create(game.world.width - 170, 1, 'moon');
        moon.body.immovable = true;
        this.addPlanets(planet);

        spaceS = game.add.group();
        spaceS.enableBody = true;
        var spacePos = this.determinePlanetPosition();
        spaceSuit = spaceS.create(spacePos.w, spacePos.h, 'spaceSuit');
        spaceSuit.body.immovable = true;
        elements = game.add.group();
        elements.enableBody = true;
        for (var i = 0; i <= randomObstructions; i++) {
            var pos1 = this.randomPosition();
            var obstruction = elements.create(pos1.w, pos1.h, 'obstruction1');
            obstruction.body.immovable = true;
            var pos2 = this.randomPosition();
            obstruction = elements.create(pos2.w, pos2.h, 'obstruction2');
            obstruction.body.immovable = true;
        }
        // light = game.add.group();
        // light.enableBody = true;
        // var l = light.create(219, 500, 'px');
        // for (var i = 220; i < 1050; i++) {
        //     l = light.create(i, 531, 'px');
        //     l.body.immovable = true;
        //     l = light.create(i, 100, 'px');
        //     l.body.immovable = true;
        // }
        bordersWin = game.add.group();
        bordersWin.enableBody = true;
        for (var i = 320; i < 400; i++) {
            var borderV = bordersWin.create(9999, i, 'px');
            borderV.body.immovable = true;
        }
        var winFlag = bordersWin.create(game.world.width - 36, 320, 'winFlag');
        winFlag.body.immovable = true;
        borderV.body.immovable = true;
        stbackround = game.add.group();
        var st1 = game.add.image(640, 0, 'bgLives');
        var st2 = game.add.image(0, 0, 'bgLives');
        st1.scale.set(2, 1);
        st1.fixedToCamera = true;
        st2.fixedToCamera = true;
        stars = game.add.group();
        stars.enableBody = true;
        stars.fixedToCamera = true;
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
                    isInit = false;
                    countLives = 3;
                    isSuitCollected = false;
                    isPaused = false;
                    spaceSuitPhysics = false;
                    game.state.start('Level1');
                }
                playerFire = game.add.sprite(player.position.x, player.position.y, 'rocketFire');
                game.paused = true;
                player.kill();
                realPlayer.kill();
                this.infoText(message5, '20px', true, player.position.x - 150, 200, 300, 80);
                this.showLives();
            }
            if (spaceSuitPhysics) {
                var lostLive = game.physics.arcade.collide(spaceA, elements);
                var winLevel = game.physics.arcade.collide(spaceA, bordersWin);
                if (winLevel) {
                    game.state.start('PassLevel');
                }
                if (lostLive) {
                    countLives -= 1;
                    if (countLives == 0) {
                        isInit = false;
                        countLives = 3;
                        isSuitCollected = false;
                        isPaused = false;
                        spaceSuitPhysics = false;
                        game.state.start('Level1');
                    }
                    game.paused = true;
                    spaceA.kill();
                    this.infoText(message5, '20px', true, spaceA.position.x - 150, 200, 300, 80);
                    this.showLives();
                }
                spaceA.body.velocity.x = 0;
                if (cursors.left.isDown) {
                    spaceA.body.velocity.x = -velocityLevel1.suit;
                    spaceA.animations.play('left');
                } else if (cursors.right.isDown) {
                    spaceA.body.velocity.x = velocityLevel1.suit;
                    spaceA.animations.play('right');
                } else {
                    spaceA.animations.stop();
                    spaceA.frame = 5;
                }
                if (cursors.up.isDown) {
                    spaceA.body.velocity.y = -velocityLevel1.suit;
                }
            } else {
                realPlayer.body.velocity.x = 0;
                player.body.velocity.x = 0;
                if (cursors.left.isDown) {
                    player.body.velocity.x = -velocityLevel1.ship;
                    realPlayer.body.velocity.x = -velocityLevel1.ship;
                }
                if (cursors.right.isDown) {
                    player.body.velocity.x = velocityLevel1.ship;
                    realPlayer.body.velocity.x = velocityLevel1.ship;
                }
                if (cursors.up.isDown) {
                    player.body.velocity.y = -velocityLevel1.ship;
                    realPlayer.body.velocity.y = -velocityLevel1.ship;
                }
                if (cursors.down.isDown) {
                    player.body.velocity.y = velocityLevel1.ship;
                    realPlayer.body.velocity.y = velocityLevel1.ship;
                }
            }

            if (cursors.left.isDown) {
                if (spaceSuitPhysics) {
                    spaceA.body.velocity.x = -velocityLevel1.suit;
                    spaceA.animations.play('left');
                } else {
                    player.body.velocity.x = -velocityLevel1.ship;
                    realPlayer.body.velocity.x = -velocityLevel1.ship;
                }
            }
        }
    },
    infoText(txt, letterSize, isAdvertence, x, y, width, height) {
        bar = game.add.graphics();
        bar.beginFill(0x003300, 0.4);
        bar.drawRect(x, y, width, height);
        var style = {
            font: letterSize + " Myriad",
            fill: "#fff",
            wordWrap: true,
            wordWrapWidth: width - 20,
            wordWrapHeight: height,
            align: "center",
        };
        text = game.add.text(10, 20, txt, style);
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
        if (!isSuitCollected) {
            if (playerFire) {
                playerFire.kill();
            }
            bar.kill();
            text.kill();
            closeBtn.kill();
            game.paused = false;
            this.resetPlayer();
        } else {
            bar.kill();
            text.kill();
            closeBtn.kill();
            game.paused = false;
            this.setSpaceSuit(219, 200);
        }
    },
    initLevel() {
        bar.kill();
        text.kill();
        if (!isPaused) {
            initBtn.kill();
            isInit = true;
            this.resetPlayer();
            timerL1 = game.time.create(false);
            timerEvent = timerL1.add(Phaser.Timer.MINUTE * timeLevel1 + Phaser.Timer.SECOND * 0, this.endTimer, this);
            // Start the timer
            timerL1.start();
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
        }
    },
    resetPlayer() {
        if (player) {
            player.kill();
        }
        if (realPlayer) {
            realPlayer.kill();
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
                var star = stars.create(766 - w, 5, 'star');
                w += 22;
            }
        }
    },
    randomPosition: function () {
        return {
            w: (400 + (Math.floor(Math.random() * (9999 - 1) + 1))),
            h: (Math.floor(Math.random() * (555 - 1) + 1))
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
        if (isInit) {
            // If our timer is running, show the time in a nicely formatted way, else show 'Done!'
            if (timerL1.running) {
                timeRest = this.formatTime(Math.round((timerEvent.delay - timerL1.ms) / 1000));
                game.debug.text(this.formatTime(Math.round((timerEvent.delay - timerL1.ms) / 1000)), 15, 18, "#2565e5");
            } else {
                //game.debug.text("Done!", 2, 14, "#0f0");
                isInit = false;
                spaceSuitPhysics = false;
                game.state.start('Level1');
            }
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
    setSpaceSuit: function (x, y) {
        spaceA = game.add.sprite(x, y, 'spriteA');
        spaceA.animations.add('right', [7, 8, 9, 10], 8, true);
        spaceA.animations.add('left', [0, 1, 2, 3], 8, true);
        game.physics.arcade.enable(spaceA);
        spaceA.body.bounce.y = 0.4;
        spaceA.body.gravity.y = 300;
        spaceA.body.collideWorldBounds = true;
        game.camera.follow(spaceA, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
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
    },
    addPlanets: function (planet) {
        for (var i = 0; i < planet1.length; i++) {
            // for (var j = 0; j < 4; j++) {
            // var j = (Math.floor(Math.random() * (4 - 1) + 1));
            // var pos = this.randomPosition();
            //1040,60
            var p1 = planet.create(planet1[i].x, planet1[i].y, 'planet1');
            p1.body.immovable = true;
            var p2 = planet.create(planet2[i].x, planet2[i].y, 'planet2');
            p2.body.immovable = true;
            // //450,20
            // var planet2 = planet.create(pos.w, pos.h, 'planet' + j);
            // planet2.body.immovable = true;
            // //700,120
            // var planet3 = planet.create(pos.w, pos.h, 'planet' + j);
            // planet3.body.immovable = true;
            // //110,550
            // var planet4 = planet.create(pos.w, pos.h, 'planet' + j);
            // planet4.body.immovable = true;
            // //750,0
            // var planet5 = planet.create(pos.w, pos.h, 'satellite');
            // planet5.body.immovable = true;
            // }
        }

    }
};
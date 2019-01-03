var realPlayer, player, playerFire, planet, cursors, bordersWin, bordersLost, bar, text, elements, spaceS, spaceSuit;
var initBtn, continueBtn, closeBtn;
var isInit = false,
    isSuitCollected = false,
    isPaused = false,
    spaceA, spaceSuitPhysics = false,
    collected = false;
var starts, stbackround;
var helmet, body, arm1, arm2, pant, foot1, foot2;
var elementsCollected = 0;
var randomObstructions = (Math.floor(Math.random() * (60 - 50) + 50));
RutaEspectral.Level1 = function (game) {};
RutaEspectral.Level1.prototype = {
    preload: function () {
        game.load.image('background', 'assets/level1/background.png');
        game.load.image('rocket', 'assets/level1/rocket.png');
        game.load.image('rocketFire', 'assets/level1/rocketFire.png');
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
        game.load.image('starM', 'assets/level1/starMoving.png');
        // game.load.image('spaceSuit', 'assets/level1/spaceSuit.png');
        game.load.image('px', 'assets/pix.png');
        game.load.image('bgLives', 'assets/level1/bgLives.png');
        game.load.image('star', 'assets/star.png');
        //SpaceSuit
        game.load.image('part0', 'assets/level1/helmet.png');
        game.load.image('part1', 'assets/level1/arm1.png');
        game.load.image('part2', 'assets/level1/arm2.png');
        game.load.image('part3', 'assets/level1/body.png');
        game.load.image('part4', 'assets/level1/pant.png');
        game.load.image('part5', 'assets/level1/foot1.png');
        game.load.image('part6', 'assets/level1/foot2.png');

        game.load.image('helmet', 'assets/level1/elementsSuit/helmet.png');
        game.load.image('arm1', 'assets/level1/elementsSuit/arm1.png');
        game.load.image('arm2', 'assets/level1/elementsSuit/arm2.png');
        game.load.image('body', 'assets/level1/elementsSuit/body.png');
        game.load.image('pant', 'assets/level1/elementsSuit/pant.png');
        game.load.image('foot1', 'assets/level1/elementsSuit/foot1.png');
        game.load.image('foot2', 'assets/level1/elementsSuit/foot2.png');
        game.load.image('bgSpaceSuit', 'assets/level1/elementsSuit/bgSpaceSuit.png');

        game.load.spritesheet('playBtn', 'assets/buttons/play2Btn.png', 134, 78);
        game.load.spritesheet('continueBtn', 'assets/buttons/continueBtn.png', 136, 79);
        game.load.spritesheet('closeBtn', 'assets/buttons/closeBtn.png', 40, 40);
        game.load.spritesheet('spriteA', 'assets/sprites/spriteA.png', spriteSizes[spriteSizes.length - 1].width / 11, spriteSizes[spriteSizes.length - 1].height);

    },
    create: function () {
        game.add.tileSprite(0, 0, 10000, 600, 'background');
        game.world.setBounds(0, 0, 10000, 600);
        game.renderer.roundPixels = true;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        planet = game.add.group();
        planet.enableBody = true;
        var moon = planet.create(game.world.width - 170, 1, 'moon');
        moon.body.immovable = true;
        this.addPlanets(planet);
        spaceS = game.add.group();
        spaceS.enableBody = true;
        this.addSpaceSuit(spaceS);
        elements = game.add.group();
        elements.enableBody = true;
        this.addObstructions();
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
        var st3 = game.add.image(0, 30, 'bgSpaceSuit');
        st1.scale.set(2, 1);
        st1.fixedToCamera = true;
        st2.fixedToCamera = true;
        st3.fixedToCamera = true;
        //st3.scale.set(1, 3);
        stars = game.add.group();
        stars.enableBody = true;
        stars.fixedToCamera = true;
        this.showLives();
        this.infoText(message2, '20px', false, 150, 150, 520, 180);
        this.addSuitElements();
    },
    update: function () {
        this.buildSpaceSuit();
        var planetCollition = game.physics.arcade.collide(realPlayer, planet);
        game.physics.arcade.overlap(realPlayer, spaceS, this.collectSuit, null, this);
        var lostLive = game.physics.arcade.collide(realPlayer, elements);
        var finishWin = game.physics.arcade.collide(realPlayer, bordersWin);
        if (finishWin && isSuitCollected) {} else if (finishWin) {
            game.paused = true;
            isPaused = true;
            this.resetPlayer(realPlayer.position.x, realPlayer.position.y);
            this.infoText(message3, '20px', true, 700, 200, 300, 70);
        }
        if (isInit) {
            if (collected) {
                //spaceSuit.kill();
                isSuitCollected = true;
                game.paused = true;
                isPaused = true;
                player.body.velocity.x = 0;
                player.body.velocity.y = 0;
                realPlayer.body.velocity.x = 0;
                realPlayer.body.velocity.y = 0;
                collected = false;
                this.infoText(message4, '20px', false, player.position.x - 50, 200, 380, 150);
            }
            if (lostLive || planetCollition) {
                countLives -= 1;
                if (countLives == 0) {
                    isInit = false;
                    countLives = 3;
                    isSuitCollected = false;
                    isPaused = false;
                    spaceSuitPhysics = false;
                    elementsCollected = 0;
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
                    this.infoText(message5, '20px', true, spaceA.position.x - 50, 200, 300, 80);
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
                if (player.position.x > 590 && player.position.x < 600) {
                    this.shootingStart(1);
                }
                if (player.position.x > 2800 && player.position.x < 2810) {
                    this.shootingStart(2);
                }
                if (player.position.x > 4800 && player.position.x < 4810) {
                    this.shootingStart(2);
                }
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
            this.resetPlayer(player.position.x - 150, player.position.y);
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
            this.resetPlayer(200, 200);
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
    resetPlayer: function (x, y) {
        if (player) {
            player.kill();
        }
        if (realPlayer) {
            realPlayer.kill();
        }
        player = game.add.sprite(x, y, 'rocket');
        realPlayer = game.add.sprite(x + 20, y - 5, 'px');
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
    render: function () {
        if (isInit) {
            // If our timer is running, show the time in a nicely formatted way, else show 'Done!'
            if (timerL1.running) {
                timeRest = this.formatTime(Math.round((timerEvent.delay - timerL1.ms) / 1000));
                game.debug.text(player.position.x + "-" + this.formatTime(Math.round((timerEvent.delay - timerL1.ms) / 1000)), 15, 18, "#2565e5");
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
    addPlanets: function (planet) {
        for (var i = 0; i < planet1.length; i++) {
            var p1 = planet.create(planet1[i].x, planet1[i].y, 'planet1');
            p1.body.immovable = true;
            var p2 = planet.create(planet2[i].x, planet2[i].y, 'planet2');
            p2.body.immovable = true;
            var p3 = planet.create(planet3[i].x, planet3[i].y, 'planet3');
            p3.body.immovable = true;
            var p4 = planet.create(planet4[i].x, planet4[i].y, 'planet4');
            p4.body.immovable = true;
        }
    },
    addSpaceSuit: function (spaceS) {
        for (var i = 0; i < spaceSuit.length; i++) {
            var ss = spaceS.create(spaceSuit[i].x, spaceSuit[i].y, 'part' + i);
            ss.body.inmovable = true;
        }
    },
    collectSuit: function (player, suitS) {
        for (var i = 0; i < spaceSuit.length; i++) {
            if (suitS.key == "part" + i) {
                suitS.kill();
                elementsCollected += 1;
            }
        }
        if (elementsCollected == 7) {
            collected = true;
        } else {
            collected = false;
        }
    },
    addObstructions: function () {
        for (var i = 0; i < 5; i++) {
            var obstruction1 = elements.create(400 + (i * 400), 20, 'obstructionGroup');
            obstruction1.body.immovable = true;
            game.physics.enable(obstruction1, Phaser.Physics.ARCADE);
            obstruction1.body.velocity.setTo(-10, 100);
            obstruction1.body.collideWorldBounds = true;
            obstruction1.body.bounce.set(0.4);

            var obstruction1 = elements.create(700 + (i * 600), 20, 'obstruction1');
            obstruction1.body.immovable = true;
            game.physics.enable(obstruction1, Phaser.Physics.ARCADE);
            obstruction1.body.velocity.setTo(-10, 100);
            obstruction1.body.collideWorldBounds = true;
            obstruction1.body.bounce.set(0.4);
            var obstruction1 = elements.create(800 + (i * 580), 20, 'obstruction2');
            obstruction1.body.immovable = true;
            game.physics.enable(obstruction1, Phaser.Physics.ARCADE);
            obstruction1.body.velocity.setTo(-10, 100);
            obstruction1.body.collideWorldBounds = true;
            obstruction1.body.bounce.set(0.4);
        }
        for (var i = 5; i < 10; i++) {
            var obstruction1 = elements.create(400 + (i * 400), 20, 'obstructionGroup');
            obstruction1.body.immovable = true;
            game.physics.enable(obstruction1, Phaser.Physics.ARCADE);
            obstruction1.body.velocity.setTo(10, 100);
            obstruction1.body.collideWorldBounds = true;
            obstruction1.body.bounce.set(0.3);

            var obstruction1 = elements.create(700 + (i * 600), 20, 'obstruction1');
            obstruction1.body.immovable = true;
            game.physics.enable(obstruction1, Phaser.Physics.ARCADE);
            obstruction1.body.velocity.setTo(-10, 100);
            obstruction1.body.collideWorldBounds = true;
            obstruction1.body.bounce.set(0.5);

            var obstruction1 = elements.create(800 + (i * 580), 20, 'obstruction2');
            obstruction1.body.immovable = true;
            game.physics.enable(obstruction1, Phaser.Physics.ARCADE);
            obstruction1.body.velocity.setTo(-10, 100);
            obstruction1.body.collideWorldBounds = true;
            obstruction1.body.bounce.set(0.5);
        }
        for (var i = 15; i < 20; i++) {
            var obstruction1 = elements.create(400 + (i * 400), 20, 'obstructionGroup');
            obstruction1.body.immovable = true;
            game.physics.enable(obstruction1, Phaser.Physics.ARCADE);
            obstruction1.body.velocity.setTo(-10, 100);
            obstruction1.body.collideWorldBounds = true;
            obstruction1.body.bounce.set(0.4);

            var obstruction1 = elements.create(700 + (i * 600), 20, 'obstruction1');
            obstruction1.body.immovable = true;
            game.physics.enable(obstruction1, Phaser.Physics.ARCADE);
            obstruction1.body.velocity.setTo(10, 100);
            obstruction1.body.collideWorldBounds = true;
            obstruction1.body.bounce.set(0.4);
            var obstruction1 = elements.create(800 + (i * 580), 20, 'obstruction2');
            obstruction1.body.immovable = true;
            game.physics.enable(obstruction1, Phaser.Physics.ARCADE);
            obstruction1.body.velocity.setTo(10, 100);
            obstruction1.body.collideWorldBounds = true;
            obstruction1.body.bounce.set(0.4);
        }
    },
    shootingStart: function (pos) {
        switch (pos) {
            case 1:
                var star = elements.create(1000, 10, 'starM');
                break;
            case 2:
                var star = elements.create(3000, 10, 'starM');
                break;
            case 3:
                var star = elements.create(5000, 10, 'starM');
                break;
            default:
                break;
        }
        star.body.checkCollision.up = false;
        star.body.checkCollision.down = true;
        star.body.checkCollision.left = false;
        star.body.checkCollision.right = false;
        star.body.immovable = true;
        game.physics.enable(star, Phaser.Physics.ARCADE);
        star.body.velocity.setTo(-100, 100);
    },
    addSuitElements: function () {
        helmet = game.add.image(35, 30, 'helmet');
        body = game.add.image(26, 69, 'body');
        arm1 = game.add.image(13, 80, 'arm1');
        arm2 = game.add.image(68, 80, 'arm2');
        pant = game.add.image(35, 110, 'pant');
        foot1 = game.add.image(25, 145, 'foot1');
        foot2 = game.add.image(55, 145, 'foot2');
        helmet.fixedToCamera = true;
        helmet.visible = false;
        body.fixedToCamera = true;
        body.visible = false;
        arm1.fixedToCamera = true;
        arm1.visible = false;
        arm2.fixedToCamera = true;
        arm2.visible = false;
        pant.fixedToCamera = true;
        pant.visible = false;
        foot1.fixedToCamera = true;
        foot1.visible = false;
        foot2.fixedToCamera = true;
        foot2.visible = false;
    },
    buildSpaceSuit: function () {
        switch (elementsCollected) {
            case 1:
                helmet.visible = true;
                break;
            case 2:
                arm2.visible = true;

                break;
            case 3:
                arm1.visible = true;
                break;
            case 4:
                body.visible = true;
                break;
            case 5:
                pant.visible = true;
                break;
            case 6:
                foot1.visible = true;
                break;
            case 7:
                foot2.visible = true;
                break;
            default:
                break;
        }
    }
};
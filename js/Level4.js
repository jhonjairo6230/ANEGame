var player, bioHSprite, platforms, elements, bottomLine, cursors, enemies, enemiesBio, line, roadLine, bFinish;
var carsSprite = [],
    biosSprite = [],
    bgGreen = [];
var initLVl4 = false,
    isLeftCar = true,
    isLeftTruck = true,
    isLeftBio0 = true,
    isLeftBio2 = true;
var collectables, messageInfo, messageRadio, sTV, sRadio, sPhone;
var countPhone = 0,
    countTv = 0,
    countRadio = 0,
    countWifi = 0;
var increment = -120;
var signal;
var btnRadio, btnTV, btnPhone;
RutaEspectral.Level4 = function (game) {};
RutaEspectral.Level4.prototype = {
    preload: function () {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.load.image('background', 'assets/level4/backgroundLVL4.png');
        game.load.image('pauseBackground', 'assets/backgrounds/pauseBackground.png');
        game.load.spritesheet('pauseBtn', 'assets/buttons/pauseBtn.png', (57 / 2), 32);
        game.load.spritesheet('bgSoundBtn', 'assets/buttons/soundBgBtn.png', (186 / 3), 62);
        game.load.spritesheet('SoundBtn', 'assets/buttons/soundBtn.png', (186 / 3), 62);
        game.load.spritesheet('ControlBtn', 'assets/buttons/controlsBtn.png', (341 / 4), 61);
        this.load.spritesheet('gamepad', 'assets/dpad.png', 100, 100);
        game.load.spritesheet('LevelBtn', 'assets/buttons/levelBtn.png', (194 / 2), 40);
        game.load.image('bgLevel', 'assets/bgLevel.png');
        game.load.spritesheet('AvatarBtn', 'assets/buttons/avatarBtn.png', (300 / 2), 95);
        game.load.spritesheet('Level1Btn', 'assets/buttons/level1Btn.png', (300 / 2), 94);
        game.load.spritesheet('Level2Btn', 'assets/buttons/level2Btn.png', (300 / 2), 94);
        game.load.spritesheet('Level3Btn', 'assets/buttons/level3Btn.png', (300 / 2), 94);
        game.load.spritesheet('Level4Btn', 'assets/buttons/level4Btn.png', (300 / 2), 95);
        game.load.spritesheet('Level5Btn', 'assets/buttons/level5Btn.png', (300 / 2), 95);
        game.load.spritesheet('spritePlayer', 'assets/sprites/sprite' + selectedSprite + '.png', spriteSizes[selectedSprite].width / 11, spriteSizes[selectedSprite].height);
        //game.load.spritesheet('spritePlayer', 'assets/sprites/sprite' + 8 + '.png', spriteSizes[8].width / 11, spriteSizes[14].height);
        game.load.spritesheet('spriteBio', 'assets/level3/bioSprite.png', (120 / 3), 40);
        game.load.image('platformS', 'assets/level3/platformSky.png');

        game.load.image('Lpx', 'assets/Level2/lineSun.png');

        game.load.image('bottomLine', 'assets/level4/bottomLine.png');
        game.load.image('roadLine', 'assets/level4/roadLine.png');
        game.load.image('s0', 'assets/level4/phone.png');
        game.load.image('s1', 'assets/level4/radio.png');
        game.load.image('s2', 'assets/level4/tv.png');
        game.load.image('s3', 'assets/level4/wifi.png');
        game.load.image('tv', 'assets/level4/sTV.png');
        game.load.image('radio', 'assets/level4/sRadio.png');
        game.load.image('phone', 'assets/level4/sPhone.png');
        game.load.image('wifi', 'assets/level4/sWifi.png');
        game.load.image('messageInfo0', 'assets/level4/messageInfo0.png');
        game.load.image('messageInfo1', 'assets/level4/messageInfo1.png');
        game.load.image('messageInfo2', 'assets/level4/messageInfo2.png');
        game.load.image('messageInfo3', 'assets/level4/messageInfo3.png');
        game.load.image('messageInfo4', 'assets/level4/messageInfo4.png');
        game.load.image('indicator', 'assets/level4/indicator.png');

        game.load.spritesheet('spriteCar', 'assets/level4/carSprite.png', (570 / 6), 50);
        game.load.spritesheet('spriteTruck', 'assets/level4/truckSprite.png', (1217 / 6), 70);

        game.load.image('bgLives', 'assets/level1/bgLives.png');
        game.load.image('bgLivesG', 'assets/level4/bgLives.png');
        game.load.image('star', 'assets/star.png');
        game.load.spritesheet('levelSt', 'assets/levelSt.png', 126 / 2, 25);
        game.load.spritesheet('closeBtn', 'assets/buttons/closeBtn.png', 40, 40);
    },
    create() {
        levelState = 4;
        if (levelWin <= levelState) {
            levelWin = 4;
        }
        player = "";
        game.add.image(0, 0, 'background');
        game.world.setBounds(0, 0, 7056, 600);
        game.renderer.roundPixels = true;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        platforms = game.add.group();
        platforms.enableBody = true;
        setPlatforms(platforms, null);
        addLines();
        setPlatforms(platforms, null);
        setPlayer();
        enemies = game.add.group();
        enemies.enableBody = true;
        addCarSprite(enemies);
        addBioSprite(biosSprite);
        var stbackround = game.add.image(610, 0, 'bgLives');
        stbackround.fixedToCamera = true;
        stbackround.scale.set(2, 1);
        stars = game.add.group();
        stars.enableBody = true;
        stars.fixedToCamera = true;
        game.add.image(0, 0, 'bgLives').fixedToCamera = true;
        for (n = 0; n < 4; n++) {
            game.add.image(200 + (n * 100), 0, 'bgLives').fixedToCamera = true;
            bgGreen[n] = game.add.sprite(200 + (n * 100), 0, 'bgLivesG')
            bgGreen[n].fixedToCamera = true;
            bgGreen[n].visible = false;
            game.add.image(240 + (n * 100), 4, 's' + n).fixedToCamera = true;
        }
        showLives();
        setCollectableElements();
        bFinish = game.add.group();
        bFinish.enableBody = true;
        var borderS = bFinish.create(7054, 1, 'Lpx');
        borderS.body.immovable = true;
        var indicator = game.add.image(6900, 300, 'indicator');
        //indicator.body.immovable = true;
        game.paused = true;
        infoText(message18, '20px', game.camera.view.x + 200, 200, 400, 200, function () {
            initLevel();
        });
        gamepad = game.plugins.add(Phaser.Plugin.VirtualGamepad);
        addGamePad(true);
        removeGamePad();
        if (joystickVisible) {
            showGamePad();
        }
    },
    update() {
        var hitPlatform = game.physics.arcade.collide(player, platforms);
        var hitFloor = game.physics.arcade.collide(player, lineBottom);
        var hitRoadLine = game.physics.arcade.collide(player, roadLine);
        var losLive0 = game.physics.arcade.collide(player, enemies);
        var losLive1 = game.physics.arcade.collide(player, enemiesBio);
        var finish = game.physics.arcade.collide(player, bFinish);
        game.physics.arcade.overlap(player, collectables, collectElements, null, this);

        player.checkWorldBounds = true;

        animateCarsMove();
        animateBio(biosSprite);
        if (losLive0 || losLive1) {
            this.die();
        }
        if (finish) {
            //countTv = 5;
            if (countTv == 5 || countPhone == 5 || countRadio == 5 || countWifi == 5) {
                if (countTv == 5) {
                    signal = 2;
                }
                if (countRadio == 5) {
                    signal = 0;
                }
                if (countPhone == 5) {
                    signal = 1;
                }
                if (countWifi == 5) {
                    signal = 3;
                }
                timerL1.paused = true;
                game.state.start('Level4_2');
            } else {
                game.paused = true;
                infoText(message19, '20px', game.camera.view.x + 200, 200, 350, 100, function () {
                    player.position.x = player.position.x - 20;
                    game.paused = false;
                    closeTextInfo();
                });
            }
        }
        player.body.velocity.x = 0;
        if (joystickVisible) {
            gamepad.joystickPad.visible = true;
            gamepad.joystick.visible = true;
            if (joystick.properties.left) {
                player.body.velocity.x = -velocityLevel2.moveX;
                player.animations.play('left');
            } else if (joystick.properties.right) {
                player.body.velocity.x = velocityLevel2.moveX;
                player.animations.play('right');
            } else {
                player.animations.stop();
                player.frame = 5;
            }
            if (button.isDown && player.body.touching.down) {
                if (isSound) {
                    var jumpS = document.getElementById("jump");
                    jumpS.volume = 0.4;
                    jumpS.play();
                }
                if (player.position.x > 2100) {
                    player.body.velocity.y = -velocityLevel2.secondPart;
                } else {
                    player.body.velocity.y = -velocityLevel2.firstPart;
                }
            }
            roadLine.body.checkCollision.up = true;
            if (joystick.properties.down) {
                hitRoadLine = false;
                roadLine.body.checkCollision.up = false;
                player.body.velocity.y = velocityLevel2.firstPart;
            }
        } else {
            cursors = game.input.keyboard.createCursorKeys();
            if (cursors.left.isDown) {
                player.body.velocity.x = -velocityLevel2.moveX;
                player.animations.play('left');
            } else if (cursors.right.isDown) {
                player.body.velocity.x = velocityLevel2.moveX;
                player.animations.play('right');
            } else {
                player.animations.stop();
                player.frame = 5;
            }
            if (cursors.up.isDown && player.body.touching.down) {
                if (hitRoadLine || hitPlatform) {
                    if (isSound) {
                        var jumpS = document.getElementById("jump");
                        jumpS.volume = 0.4;
                        jumpS.play();
                    }
                }
                player.body.velocity.y = -velocityLevel2.firstPart;

            }
            roadLine.body.checkCollision.up = true;
            if (cursors.down.isDown && hitRoadLine) {
                hitRoadLine = false;
                roadLine.body.checkCollision.up = false;
                player.body.velocity.y = velocityLevel2.firstPart;
            }
        }
    },
    die: function () {
        if (isSound) {
            document.getElementById("lostLive").play();
        }
        countRadio = countTv = countPhone = 0;
        initLVl4 = false;
        countLives -= 1;
        if (countLives == 0) {
            countLives = 3;
            game.state.start('Level4');
        }
        showLives();
        game.paused = true;
        var msg = timerL1.running ? message14 : message13;
        infoText(msg, '20px', game.camera.view.x + 200, 200, 300, 100, function () {
            game.paused = false;
            game.state.start('Level4');
        });
    },
    render() {
        if (initLVl4) {
            if (timerL1.running) {
                timeRest = formatTime(Math.round((timerEvent.delay - timerL1.ms) / 1000));
                game.debug.text(formatTime(Math.round((timerEvent.delay - timerL1.ms) / 1000)), 15, 18, "#2565e5");
                game.debug.text('Nivel ' + levelState, 92, 18, "#2565e5");
            } else {
                this.die();
            }
            // game.debug.text(player.position.x + "-" + player.position.y, 15, 18, "#2565e5");
            if (countPhone == 5) {
                bgGreen[0].visible = true;
            }
            if (countRadio == 5) {
                bgGreen[1].visible = true;
            }

            if (countTv == 5) {
                bgGreen[2].visible = true;
            }
            if (countWifi == 5) {
                bgGreen[3].visible = true;
            }
            game.debug.text(countPhone + "x", 220, 18, "#2565e5");
            game.debug.text(countRadio + "x", 320, 18, "#2565e5");
            game.debug.text(countTv + "x", 420, 18, "#2565e5");
            game.debug.text(countWifi + "x", 520, 18, "#2565e5");
        }
    }
}
var player, bioHSprite, platforms, elements, bottomLine,
    cursors, enemies, enemiesBio, line, roadLine, bFinish, finishLine;
var carsSprite = [],
    biosSprite = [];
var initLVl5 = false,
    isLeftCar = true,
    isLeftTruck = true,
    isLeftBio0 = true,
    isLeftBio2 = true;
var antenas, antenaL, antenaR;
var collectables, messageInfo, messageRadio, sTV, sRadio, sPhone, signal;
var countAntennas = 0;
var increment = -120;
var signal, bgGreen;
var btnRadio, btnTV, btnPhone;
RutaEspectral.Level5 = function (game) {};
RutaEspectral.Level5.prototype = {
    preload: function () {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.load.image('pauseBackground', 'assets/backgrounds/pauseBackground.png');
        game.load.spritesheet('pauseBtn', 'assets/buttons/pauseBtn.png', (57 / 2), 32);
        game.load.spritesheet('bgSoundBtn', 'assets/buttons/soundBgBtn.png', (186 / 3), 62);
        game.load.spritesheet('SoundBtn', 'assets/buttons/soundBtn.png', (186 / 3), 62);
        game.load.spritesheet('ControlBtn', 'assets/buttons/controlsBtn.png', (341 / 4), 61);
        game.load.spritesheet('LevelBtn', 'assets/buttons/levelBtn.png', (194 / 2), 40);
        this.load.spritesheet('gamepad', 'assets/dpad.png', 100, 100);
        game.load.image('bgLevel', 'assets/bgLevel.png');
        game.load.spritesheet('AvatarBtn', 'assets/buttons/avatarBtn.png', (300 / 2), 95);
        game.load.spritesheet('Level1Btn', 'assets/buttons/level1Btn.png', (300 / 2), 94);
        game.load.spritesheet('Level2Btn', 'assets/buttons/level2Btn.png', (300 / 2), 94);
        game.load.spritesheet('Level3Btn', 'assets/buttons/level3Btn.png', (300 / 2), 94);
        game.load.spritesheet('Level4Btn', 'assets/buttons/level4Btn.png', (300 / 2), 95);
        game.load.spritesheet('Level5Btn', 'assets/buttons/level5Btn.png', (300 / 2), 95);
        //game.load.spritesheet('spritePlayer', 'assets/sprites/sprite' + 22 + '.png', spriteSizes[22].width / 11, spriteSizes[14].height);
        game.load.spritesheet('spritePlayer', 'assets/sprites/sprite' + selectedSprite + '.png', spriteSizes[selectedSprite].width / 11, spriteSizes[selectedSprite].height);

        game.load.spritesheet('spriteBio', 'assets/level3/bioSprite.png', (120 / 3), 40);
        game.load.image('platformS', 'assets/level3/platformSky.png');

        game.load.image('Lpx', 'assets/Level2/lineSun.png');

        game.load.image('bottomLine', 'assets/level5/bottomLine.png');
        game.load.image('roadLine', 'assets/level5/roadLine.png');
        game.load.image('antenna', 'assets/level5/antenna.png');
        game.load.image('ch0', 'assets/level5/ch0.png');
        game.load.image('ch1', 'assets/level5/ch1.png');
        game.load.image('ch2', 'assets/level5/ch2.png');
        game.load.image('ch3', 'assets/level5/ch3.png');
        game.load.image('ch4', 'assets/level5/ch4.png');

        game.load.spritesheet('spriteCar', 'assets/level4/carSprite.png', (570 / 6), 50);
        game.load.spritesheet('spriteTruck', 'assets/level4/truckSprite.png', (1217 / 6), 70);

        game.load.image('bgLives', 'assets/level1/bgLives.png');
        game.load.image('bgLivesG', 'assets/level4/bgLives.png');
        game.load.image('star', 'assets/star.png');

        game.load.spritesheet('closeBtn', 'assets/buttons/closeBtn.png', 40, 40);
        game.load.spritesheet('testBtn', 'assets/level5/testBtn.png', 98, 50);

        game.load.image('message0', 'assets/level5/message0.png');
        game.load.image('message1', 'assets/level5/message1.png');
        game.load.image('antennaC', 'assets/level5/antennaC.png');
        game.load.image('background', 'assets/level5/bg5.png');
        game.load.spritesheet('leftSprite', 'assets/level5/leftSprite.png', (280 / 4), 100);
        game.load.spritesheet('rigthSprite', 'assets/level5/rigthSprite.png', (280 / 4), 100);
        game.load.image('Lpx', 'assets/Level2/lineSun.png');
        game.load.spritesheet('levelSt', 'assets/levelSt.png', 126 / 2, 25);
    },
    create: function () {
        levelState = 5;
        if (levelWin <= levelState) {
            levelWin = 5;
        }
        carsSprite = [];
        biosSprite = [];
        player = "";
        game.add.image(0, 0, 'background');
        game.world.setBounds(0, 0, 8609, 600);
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
        // for (n = 0; n < 5; n++) {
        signal = game.add.group();
        signal.enableBody = true;
        sg = signal.create(400, 0, 'ch0');
        sg.fixedToCamera = true;
        //game.add.image(240 + (n * 100), 4, 's' + n).fixedToCamera = true;
        // }
        showLives();
        setCollectableElements();
        btnHorn = game.add.button(8100, 350, 'testBtn', this.antena, this, 1, 1, 0);
        game.paused = true;
        game.add.image(0, 0, 'bgLives').fixedToCamera = true;

        finishLine = game.add.group();
        finishLine.enableBody = true;
        var borderS = finishLine.create(7057, 1, 'Lpx');
        borderS.body.immovable = true;

        gamepad = game.plugins.add(Phaser.Plugin.VirtualGamepad);
        addGamePad(true);
        removeGamePad();
        if (joystickVisible) {
            showGamePad();
        }
        infoText(message20, '20px', game.camera.view.x + 200, 200, 400, 150, function () {
            initLevel();
        });
    },
    update: function () {
        var hitPlatform = game.physics.arcade.collide(player, platforms);
        var hitFloor = game.physics.arcade.collide(player, lineBottom);
        var hitRoadLine = game.physics.arcade.collide(player, roadLine);
        var losLive0 = game.physics.arcade.collide(player, enemies);
        var losLive1 = game.physics.arcade.collide(player, enemiesBio);
        var finish = game.physics.arcade.collide(player, bFinish);
        var endMessage = game.physics.arcade.collide(player, finishLine);
        game.physics.arcade.overlap(player, collectables, collectElements, null, this);

        player.checkWorldBounds = true;

        animateCarsMove();
        animateBio(biosSprite);

        if (endMessage) {
            finishLine.kill();
            game.paused = true;
            infoText(message21, '20px', game.camera.view.x + 200, 200, 400, 150, function () {
                game.paused = false;
            });
        }

        if (losLive0 || losLive1) {
            this.die();
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
    antena: function (e) {
        if (countAntennas > 18) {
            setAntenas(7);
        } else if (countAntennas > 10) {
            setAntenas(4);
        } else if (countAntennas > 0) {
            setAntenas(2);
        } else {
            setAntenas(0);
        }
        game.time.events.add(1000, this.testSignal, this, "");
    },
    testSignal: function () {
        if (countAntennas > 18) {
            message1 = game.add.sprite(game.camera.view.x + 200, 200, 'message1');
            game.time.events.add(2000, this.removePicture, this, message1);
        } else {
            message1 = game.add.sprite(game.camera.view.x + 200, 200, 'message0');
            game.time.events.add(2000, this.removePicture, this, message1);
        }
    },
    removePicture: function (pic) {
        pic.visible = false;
        killAntenas();
        if (pic.key == 'message1') {
            game.time.events.add(30, this.finalMessage, this, 5);
        }
    },
    finalMessage: function (sl) {
        if (isSound) {
            document.getElementById("changeLevel").play();
        }
        stateLavel = sl;
        game.state.start('finalLevel');
    },
    die: function () {
        if (isSound) {
            document.getElementById("lostLive").play();
        }
        countRadio = countTv = countPhone = 0;
        initLVl5 = false;
        countLives -= 1;
        if (countLives == 0) {
            countLives = 3;
            game.state.start('Level5');
        }
        showLives();
        game.paused = true;
        var msg = timerL1.running ? message14 : message13;
        infoText(msg, '20px', game.camera.view.x + 200, 200, 300, 100, function () {
            game.paused = false;
            game.state.start('Level5');
        });
    },
    render: function () {
        if (initLVl5) {
            if (timerL1.running) {
                timeRest = formatTime(Math.round((timerEvent.delay - timerL1.ms) / 1000));
                game.debug.text(formatTime(Math.round((timerEvent.delay - timerL1.ms) / 1000)), 15, 18, "#2565e5");
                game.debug.text('Nivel ' + levelState, 92, 18, "#2565e5");
            } else {
                this.die();
            }
        }
    }
}
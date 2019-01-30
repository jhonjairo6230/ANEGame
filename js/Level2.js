var player, platforms, elements, pMoveGroup, cursors, bSun, waveCollition, bordersWin, platformMV, platformMH;
var initLVl2 = false;
var glasses, closeBtn, obstructions, st, planet, bEarth, bEarthH, liveUpGroup, circle, circleT, pltMovement;
var isError = false,
    showFinish = false;
var message0, message1;
var biosSprite = [];
var enemiesBio;
RutaEspectral.Level2 = function (game) {};
RutaEspectral.Level2.prototype = {
    preload: function () {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.load.image('background', 'assets/level2/backgroundLevel2.png');
        game.load.image('pauseBackground', 'assets/backgrounds/pauseBackground.png');
        game.load.spritesheet('pauseBtn', 'assets/buttons/pauseBtn.png', (57 / 2), 32);
        game.load.spritesheet('bgSoundBtn', 'assets/buttons/soundBgBtn.png', (186 / 3), 62);
        game.load.spritesheet('SoundBtn', 'assets/buttons/soundBtn.png', (186 / 3), 62);
        game.load.spritesheet('ControlBtn', 'assets/buttons/controlsBtn.png', (341 / 4), 61);
        game.load.spritesheet('LevelBtn', 'assets/buttons/levelBtn.png', (194 / 2), 40);
        game.load.image('bgLevel', 'assets/bgLevel.png');
        game.load.spritesheet('AvatarBtn', 'assets/buttons/avatarBtn.png', (300 / 2), 95);
        game.load.spritesheet('Level1Btn', 'assets/buttons/level1Btn.png', (300 / 2), 94);
        game.load.spritesheet('Level2Btn', 'assets/buttons/level2Btn.png', (300 / 2), 94);
        game.load.spritesheet('Level3Btn', 'assets/buttons/level3Btn.png', (300 / 2), 94);
        game.load.spritesheet('Level4Btn', 'assets/buttons/level4Btn.png', (300 / 2), 95);
        game.load.spritesheet('Level5Btn', 'assets/buttons/level5Btn.png', (300 / 2), 95);

        this.load.spritesheet('gamepad', 'assets/dpad.png', 100, 100);

        game.load.spritesheet('spriteA', 'assets/sprites/spriteA.png', spriteSizes[spriteSizes.length - 1].width / 11, spriteSizes[spriteSizes.length - 1].height);
        game.load.spritesheet('spriteAlienShip', 'assets/level2/spriteNave.png', (409 / 5), 60);

        game.load.image('wave', 'assets/level2/wave.png');
        game.load.image('platform', 'assets/level2/platform.png');
        game.load.image('platformF0', 'assets/level2/platformFloor0.png');
        game.load.image('platformF1', 'assets/level2/platformFloor1.png');
        game.load.image('platformF2', 'assets/level2/platformFloor2.png');
        game.load.image('bgLives', 'assets/level1/bgLives.png');
        game.load.image('star', 'assets/star.png');
        game.load.image('liveUp', 'assets/liveUp.png');
        game.load.image('px', 'assets/Level2/1px.png');
        game.load.image('Lpx', 'assets/Level2/lineSun.png');
        game.load.image('glasses', 'assets/Level2/glasses.png');
        game.load.image('BH1', 'assets/Level2/borderH1.png');
        game.load.image('BH2', 'assets/Level2/borderH2.png');
        game.load.spritesheet('closeBtn', 'assets/buttons/closeBtn.png', 40, 40);
        game.load.image('obstructionGroup', 'assets/level1/obstructionGroup.png');
        game.load.image('obstruction1', 'assets/level1/obstruction1.png');
        game.load.image('obstruction2', 'assets/level1/obstruction2.png');
        game.load.image('starM', 'assets/level1/starMoving.png');
        game.load.image('planet1', 'assets/level1/planet1.png');
        game.load.image('planet2', 'assets/level1/planet2.png');
        game.load.image('planet3', 'assets/level1/planet3.png');
        game.load.image('planet4', 'assets/level1/planet4.png');
        game.load.image('satellite', 'assets/level1/satelite.png');
        game.load.image('winFlag', 'assets/level1/winFlag.png');
        game.load.image('circleT', 'assets/level2/circleT.png');
        game.load.image('finishLine', 'assets/level2/finishLine.png');
        game.load.image('message0', 'assets/level2/message0.png');
        game.load.image('message1', 'assets/level2/message1.png');
        game.load.spritesheet('levelSt', 'assets/levelSt.png', 126 / 2, 25);
    },
    create: function () {
        levelState = 2;
        biosSprite = [];
        player = "";
        game.add.image(0, 0, 'background');
        game.world.setBounds(0, 0, 7900, 600);
        game.renderer.roundPixels = true;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.checkCollision.down = false;
        st = game.add.group();
        st.enableBody = true;
        planet = game.add.group();
        planet.enableBody = true;
        addPlanets(planet);

        circleT = game.add.group();
        circleT.enableBody = true;
        var t = circleT.create(7120, 110, 'circleT');
        t.body.setCircle(600)
        t.body.immovable = true;

        elements = game.add.group();
        elements.enableBody = true;
        pMoveGroup = game.add.group();
        pMoveGroup.enableBody = true;
        obstructions = game.add.group();
        obstructions.enableBody = true;
        bSun = game.add.group();
        bSun.enableBody = true;

        bEarthH = game.add.group();
        bEarthH.enableBody = true;
        var finishLine = bEarthH.create(7120, 599, 'finishLine');
        finishLine.body.immovable = true;
        var borderS = bSun.create(1650, 1, 'Lpx');
        borderS.body.immovable = true;
        glasses = game.add.group();
        glasses.enableBody = true;
        var glass = glasses.create(1000, 100, 'glasses');
        glass.body.immovable = true;
        liveUpGroup = game.add.group();
        liveUpGroup.enableBody = true;
        var liveUp = liveUpGroup.create(6800, 380, 'liveUp');
        liveUp.body.immovable = true;
        setPlatforms(elements, pMoveGroup);
        addObstructions();
        setPlayer();
        bordersWin = game.add.group();
        bordersWin.enableBody = true;
        var winFlag = bordersWin.create(7500, 360, 'winFlag');
        winFlag.body.immovable = true;
        var stbackround = game.add.image(610, 0, 'bgLives');
        stbackround.fixedToCamera = true;
        stbackround.scale.set(2, 1);
        stars = game.add.group();
        stars.enableBody = true;
        stars.fixedToCamera = true;
        var st2 = game.add.image(0, 0, 'bgLives');
        st2.fixedToCamera = true;
        showLives();
        game.paused = true;
        if (!collectGls) {
            infoText(message6, '20px', 200, 200, 380, 190, function () {
                closeAdvLvl2();
            });
        } else {
            game.camera.view.x = 1900;
            infoText(message6, '20px', 2100, 200, 380, 190, function () {
                closeAdvLvl2();
            });
        }
        addBioSprite(biosSprite);
        gamepad = game.plugins.add(Phaser.Plugin.VirtualGamepad);
        addGamePad(true);
        removeGamePad();
        if (joystickVisible) {
            showGamePad();
        }
    },
    update: function () {
        game.physics.arcade.collide(player, bEarthH);
        var hitPlatform = game.physics.arcade.collide(player, elements);
        var hitSun = game.physics.arcade.collide(player, bSun);
        var finish = game.physics.arcade.collide(player, bordersWin);
        var lostLive = game.physics.arcade.collide(player, obstructions);
        var losLive1 = game.physics.arcade.collide(player, enemiesBio);
        var circle = game.physics.arcade.collide(player, circleT);
        var movementV = game.physics.arcade.collide(player, pMoveGroup.children[0]);
        var movementH = game.physics.arcade.collide(player, pMoveGroup.children[1]);
        player.checkWorldBounds = true;
        player.events.onOutOfBounds.add(this.test, this);
        if (player.position.x > 2500) {
            animateBio(biosSprite);
        }
        if (player.position.x > 7344 && player.position.x < 7349 && !showFinish) {
            // if () {
            isError = false;
            player.position.x = 7400;
            game.paused = true;
            isError = false;
            game.paused = true;
            this.showMessage();
            // }
        }
        if (circle) {
            if (player.position.y > 240 && player.position.y < 440) {
                circleT.kill();
            }
            if (player.position.y < 239) {
                player.position.x = player.position.x - 500;
                player.position.y = player.position.y - 50;
                game.paused = true;
                isError = true;
                this.showMessage();

            }
            if (player.position.y > 441) {
                player.position.y = player.position.y - 50;
                player.position.x = player.position.x - 800;
                game.paused = true;
                isError = true;
                this.showMessage();
            }

        }
        if (pltMovement.position.x < 4100) {
            pltMovement.body.velocity.x = 70;
        } else if (pltMovement.position.x > 4600) {
            pltMovement.body.velocity.x = -70;
        }
        if (movementV) {
            if (platformMV.position.y < 350) {
                platformMV.body.velocity.y = 60;
            } else if (platformMV.position.y > 560) {
                platformMV.body.velocity.y = -60;
            }
        }
        if (movementH) {
            if (platformMH.position.x < 6600) {
                platformMH.body.velocity.x = 80;
            }
        }
        if (platformMH.position.x > 7300) {
            platformMH.body.velocity.x = -80;
        }
        var lostLPlanet = game.physics.arcade.collide(player, planet);
        game.physics.arcade.overlap(player, glasses, collectGlasses, null, this);
        game.physics.arcade.overlap(player, liveUpGroup, collectLiveUp, null, this);
        if (player.position.x > 2530 && player.position.x < 540) {
            addSatellites(3000, 100, elements);
        }
        if (player.position.x > 2982 && player.position.x < 2990) {
            addSatellites(4367, 100, elements);
        }
        if (player.position.x > 4367 && player.position.x < 4372) {
            addSatellites(5667, 150, elements);
            addSatellites(6707, 10, elements);
        }
        if (player.position.x > 1210 && player.position.x < 1220) {
            shootingExplotion();
        }
        if (lostLive || lostLPlanet || losLive1) {
            if (isSound) {
                document.getElementById("lostLive").play();
            }
            initLVl2 = false;
            countLives -= 1;
            if (countLives == 0) {
                countLives = 3;
                collectGls = false;
                game.state.start('Level2');
            }
            showLives();
            game.paused = true;
            infoText(message11, '20px', game.camera.view.x + 200, 200, 350, 80, function () {
                game.paused = false;
                game.state.start('Level2');
            });
        }
        //Verify SunGlasses
        if (hitSun && !collectGls) {
            player.position.x = player.position.x - 10;
            game.paused = true;
            infoText(message10, '20px', player.position.x - 150, 200, 380, 100, function () {
                game.paused = false;
            });
        }
        if (hitSun && collectGls) {
            bSun.kill();
        }
        if (finish) {
            levelState = 2;
            countLives += 1;
            showLives();
            if (isSound) {
                document.getElementById("changeLevel").play();
            }
            collectGls = false;
            game.state.start('PassLevel');
        }
        cursors = game.input.keyboard.createCursorKeys();
        player.body.velocity.x = 0;
        if (joystickVisible == false) {
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
        } else {
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
            if (joystick.properties.down) {
                player.body.velocity.y = velocityLevel2.firstPart;
            }
        }
    },
    test: function () {
        if (isSound) {
            document.getElementById("lostLive").play();
        }
        initLVl2 = false;
        countLives -= 1;
        if (countLives == 0) {
            countLives = 3;
            collectGls = false;
            game.state.start('Level2');
        }
        showLives();
        game.paused = true;
        infoText(message12, '20px', game.camera.view.x + 200, 200, 300, 80, function () {
            game.paused = false;
            game.state.start('Level2');
        });
    },
    showMessage: function () {
        if (!isError) {
            showFinish = true;
            infoText(message22, '20px', game.camera.view.x + 200, 200, 300, 180, function () {
                game.paused = false;
                closeTextInfo();
            });
        } else {
            infoText(message21, '20px', game.camera.view.x + 200, 200, 300, 200, function () {
                game.paused = false;
                closeTextInfo();
            });
        }
    },
    removePicture: function (pic) {
        pic.visible = false;
    },
    render: function () {
        if (initLVl2) {
            if (timerL1.running) {
                timeRest = formatTime(Math.round((timerEvent.delay - timerL1.ms) / 1000));
                game.debug.text(formatTime(Math.round((timerEvent.delay - timerL1.ms) / 1000)), 15, 18, "#2565e5");
                game.debug.text('Nivel ' + levelState, 92, 18, "#2565e5");
            } else {
                initLVl2 = false;
                if (isSound) {
                    document.getElementById("lostLive").play();
                }
                countLives -= 1;
                if (countLives == 0) {
                    countLives = 3;
                    collectGls = false;
                    game.state.start('Level2');
                }
                showLives();
                game.paused = true;
                infoText(message13, '20px', game.camera.view.x + 200, 200, 300, 80, function () {
                    game.paused = false;
                    game.state.start('Level2');
                });
            }
        }
    }
}
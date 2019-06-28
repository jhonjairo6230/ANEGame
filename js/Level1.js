var realPlayer, player, playerFire, planet, cursors, bordersWin, bordersLost, text, music, elements, spaceS, spaceSuit;
RutaEspectral.Level1 = function (game) {};
RutaEspectral.Level1.prototype = {
    preload: function () {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.load.image('background', 'assets/level1/background.png');
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

        game.load.image('rocket', 'assets/level1/rocket.png');
        game.load.image('rocketFire', 'assets/level1/rocketFire.png');
        game.load.image('moon', 'assets/level1/moon.png');
        game.load.image('planet1', 'assets/level1/planet1.png');
        game.load.image('planet2', 'assets/level1/planet2.png');
        game.load.image('planet3', 'assets/level1/planet3.png');
        game.load.image('planet4', 'assets/level1/planet4.png');
        game.load.image('circleP1', 'assets/level1/circleP1.png');
        game.load.image('circleP2', 'assets/level1/circleP2.png');
        game.load.image('circleP3', 'assets/level1/circleP3.png');
        game.load.image('circleP4', 'assets/level1/circleP4.png');
        game.load.image('satellite', 'assets/level1/satelite.png');
        game.load.image('obstructionGroup', 'assets/level1/obstructionGroup.png');
        game.load.image('obstruction1', 'assets/level1/obstruction1.png');
        game.load.image('obstruction2', 'assets/level1/obstruction2.png');
        game.load.image('winFlag', 'assets/level1/winFlag.png');
        game.load.image('starM', 'assets/level1/starMoving.png');
        // game.load.image('spaceSuit', 'assets/level1/spaceSuit.png');
        game.load.image('px', 'assets/pix.png');
        game.load.image('roundPx', 'assets/level1/roundPX.png');
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
        game.load.spritesheet('levelSt', 'assets/levelSt.png', 126 / 2, 25);
        game.load.spritesheet('spriteA', 'assets/sprites/spriteA.png', spriteSizes[spriteSizes.length - 1].width / 11, spriteSizes[spriteSizes.length - 1].height);
    },
    create: function () {
        game.add.image(0, 0, 'background');
        game.world.setBounds(0, 0, 10000, 600);
        game.renderer.roundPixels = true;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        planet = game.add.group();
        planet.enableBody = true;
        var moon = planet.create(game.world.width - 170, 1, 'moon');
        moon.body.immovable = true;
        addPlanets(planet);
        spaceS = game.add.group();
        spaceS.enableBody = true;
        addSpaceSuit(spaceS);
        elements = game.add.group();
        elements.enableBody = true;
        addObstructions();
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
        var st1 = game.add.image(610, 0, 'bgLives');
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
        showLives();
        infoText(message2, '20px', 150, 150, 520, 180, function () {
            infoText(message5, '20px', game.camera.view.x + 300, 200, 300, 80, function () {
                initLevel1();
            });
        });
        // this.infoText(message2, '20px', false, 150, 150, 520, 180);
        addSuitElements();
        gamepad = game.plugins.add(Phaser.Plugin.VirtualGamepad);
        addGamePad(false);
        if (isMobile) {
            joystickVisible = true;
        } else {
            removeGamePad();
        }
    },
    update: function () {
        //this.buildSpaceSuit();
        var planetCollition = game.physics.arcade.collide(realPlayer, planet);
        game.physics.arcade.overlap(realPlayer, spaceS, collectSuit, null, this);
        var lostLive = game.physics.arcade.collide(realPlayer, elements);
        var finishWin = game.physics.arcade.collide(realPlayer, bordersWin);
        if (finishWin && isSuitCollected) {

        } else if (finishWin) {
            game.paused = true;
            isPaused = true;
            resetPlayer(realPlayer.position.x, realPlayer.position.y);
            //this.resetPlayer(realPlayer.position.x, realPlayer.position.y);
            infoText(message3, '20px', game.camera.view.x + 200, 200, 300, 70, function () {
                closeAdvLvl1();
            });
        }
        if (isInitLVL1) {
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
                infoText(message4, '20px', player.position.x - 50, 200, 380, 150, function () {
                    infoText(message24, '20px', player.position.x - 50, 200, 380, 150, function () {
                        initLevel1();
                    });
                });
            }
            if (lostLive || planetCollition) {
                if (isSound) {
                    document.getElementById("shipCrash").play();
                }
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
                showLives();
                infoText(message5, '20px', game.camera.view.x + 300, 200, 300, 80, function () {
                    closeAdvLvl1();
                });

            }
            if (spaceSuitPhysics) {
                var lostLive = game.physics.arcade.collide(spaceA, elements);
                var planetC = game.physics.arcade.collide(spaceA, planet);
                var winLevel = game.physics.arcade.collide(spaceA, bordersWin);
                if (winLevel) {
                    if (isSound) {
                        document.getElementById("changeLevel").play();
                    }
                    spaceSuitPhysics = false;
                    isSuitCollected = false;
                    collected = false;
                    elementsCollected = 0;
                    game.state.start('PassLevel');
                }
                if (lostLive || planetC) {
                    if (isSound) {
                        document.getElementById("shipCrash").play();
                    }
                    countLives -= 1;
                    if (countLives == 0) {
                        isInit = false;
                        countLives = 3;
                        isSuitCollected = false;
                        isPaused = false;
                        spaceSuitPhysics = false;
                        game.state.start('Level1');
                    }
                    lLive = true;
                    game.paused = true;
                    spaceA.kill();
                    spaceSuitPhysics = false;
                    isSuitCollected = false;
                    showLives();
                    infoText(message5, '20px', game.camera.view.x + 300, 200, 300, 80, function () {
                        closeAdvLvl1();
                    });
                }
                spaceA.body.velocity.x = 0;
                if (joystickVisible == false) {
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
                    gamepad.joystickPad.visible = true;
                    gamepad.joystick.visible = true;
                    if (joystick.properties.left) {
                        spaceA.body.velocity.x = -velocityLevel1.mobile;
                        spaceA.animations.play('left');
                    }
                    if (joystick.properties.right) {
                        spaceA.body.velocity.x = velocityLevel1.mobile;
                        spaceA.animations.play('right');
                    }
                    if (joystick.properties.up) {
                        spaceA.body.velocity.y = -velocityLevel1.mobile;
                    }
                    if (joystick.properties.down) {
                        spaceA.body.velocity.y = velocityLevel1.mobile;
                    }
                }
            } else {
                player.checkWorldBounds = true;
                realPlayer.body.velocity.x = 0;
                player.body.velocity.x = 0;
                realPlayer.body.velocity.y = 30;
                player.body.velocity.y = 30;
                if (player.position.x > 590 && player.position.x < 600) {
                    shootingStart(1);
                }
                if (player.position.x > 2800 && player.position.x < 2810) {
                    shootingStart(2);
                }
                if (player.position.x > 4800 && player.position.x < 4810) {
                    shootingStart(3);
                }
                if (joystickVisible == false) {
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
                        if (player.position.y != 0) {
                            realPlayer.body.velocity.y = -velocityLevel1.ship;
                        }
                    }
                    if (cursors.down.isDown) {
                        player.body.velocity.y = velocityLevel1.ship;
                        if (player.position.y != 546) {
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
                } else {
                    gamepad.joystickPad.visible = true;
                    gamepad.joystick.visible = true;
                    if (joystick.properties.left) {
                        player.body.velocity.x = -velocityLevel1.mobile;
                        realPlayer.body.velocity.x = -velocityLevel1.mobile;
                    }
                    if (joystick.properties.right) {
                        player.body.velocity.x = velocityLevel1.mobile;
                        realPlayer.body.velocity.x = velocityLevel1.mobile;
                    }
                    if (joystick.properties.up) {
                        player.body.velocity.y = -velocityLevel1.mobile;
                        if (player.position.y != 0) {
                            realPlayer.body.velocity.y = -velocityLevel1.mobile;
                        }
                    }
                    if (joystick.properties.down) {
                        player.body.velocity.y = velocityLevel1.mobile;
                        if (player.position.y != 546) {
                            realPlayer.body.velocity.y = velocityLevel1.mobile;
                        }
                    }
                }
            }
        }
    },
    reloadPlayer: function () {
        if (!isSuitCollected) {
            if (playerFire) {
                playerFire.kill();
            }
            game.paused = false;
            isInitLVL1 = false;
            isSuitCollected = false;
            isPaused = false;
            spaceSuitPhysics = false;
            elementsCollected = 0;
            lLive = false;
            game.state.start('Level1');
        } else {
            game.paused = false;
            setSpaceSuit(219, 200);
        }
    },
    render: function () {
        if (isInitLVL1) {
            // If our timer is running, show the time in a nicely formatted way, else show 'Done!'
            if (timerL1.running) {
                timeRest = formatTime(Math.round((timerEvent.delay - timerL1.ms) / 1000));
                game.debug.text(formatTime(Math.round((timerEvent.delay - timerL1.ms) / 1000)), 15, 18, "#2565e5");
                game.debug.text('Nivel ' + levelState, 92, 18, "#2565e5");
            } else {
                isInitLVL1 = false;
                if (isSound) {
                    document.getElementById("shipCrash").play();
                }
                countLives -= 1;
                if (countLives == 0) {
                    isInit = false;
                    countLives = 3;
                    isSuitCollected = false;
                    isPaused = false;
                    spaceSuitPhysics = false;
                    game.state.start('Level1');
                }
                lLive = true;
                game.paused = true;
                if (spaceSuitPhysics) {
                    spaceA.kill();
                } else {
                    playerFire = game.add.sprite(player.position.x, player.position.y, 'rocketFire');
                    game.paused = true;
                    player.kill();
                    realPlayer.kill();
                }
                spaceSuitPhysics = false;
                isSuitCollected = false;
                collected = false;
                elementsCollected = 0;
                showLives();
                infoText(message13, '20px', game.camera.view.x + 300, 200, 300, 80, function () {
                    game.paused = false;
                    game.state.start('Level1');
                });
            }
        }
    },
};
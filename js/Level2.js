var player, platforms, elements, pMoveGroup, cursors, bSun, waveCollition, bordersWin, platformMV, platformMH;
var initLVl2 = false;
var glasses, closeBtn, obstructions, st, planet, bEarth, bEarthH, liveUpGroup, circle, circleT, pltMovement;
var isError = false;
var message0, message1;
RutaEspectral.Level2 = function (game) {};
RutaEspectral.Level2.prototype = {
    preload: function () {
        game.load.image('background', 'assets/level2/backgroundLevel2.png');
        game.load.spritesheet('spriteA', 'assets/sprites/spriteA.png', spriteSizes[spriteSizes.length - 1].width / 11, spriteSizes[spriteSizes.length - 1].height);
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
    },
    create: function () {
        levelState = 2;
        game.add.tileSprite(0, 0, 7900, 600, 'background');
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
        var liveUp = liveUpGroup.create(1700, 50, 'liveUp');
        liveUp.body.immovable = true;
        setPlatforms(elements, pMoveGroup);
        addObstructions();
        setPlayer();
        bordersWin = game.add.group();
        bordersWin.enableBody = true;
        var winFlag = bordersWin.create(7500, 360, 'winFlag');
        winFlag.body.immovable = true;
        var stbackround = game.add.image(640, 0, 'bgLives');
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
    },
    update: function () {
        game.physics.arcade.collide(player, bEarthH);
        var hitPlatform = game.physics.arcade.collide(player, elements);
        var hitSun = game.physics.arcade.collide(player, bSun);
        var finish = game.physics.arcade.collide(player, bordersWin);
        var lostLive = game.physics.arcade.collide(player, obstructions);
        var circle = game.physics.arcade.collide(player, circleT);
        var movementV = game.physics.arcade.collide(player, pMoveGroup.children[0]);
        var movementH = game.physics.arcade.collide(player, pMoveGroup.children[1]);
        player.checkWorldBounds = true;
        player.events.onOutOfBounds.add(this.test, this);

        // this.physics.world.on('worldbounds', this.test, this)
        if (circle) {
            if (player.position.y > 300 && player.position.y < 400) {
                circleT.kill();
                isError = false;
                game.time.events.add(100, this.showMessage, this, message1);
            }
            if (player.position.y < 339) {
                player.position.x = player.position.x - 500;
                player.position.y = player.position.y - 50;
                isError = true;
                game.time.events.add(100, this.showMessage, this, message0);
            }
            if (player.position.y > 401) {
                player.position.x = player.position.x - 800;
                player.position.y = player.position.y - 50;
                isError = true;
                game.time.events.add(100, this.showMessage, this, message0);
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
            if (platformMH.position.x < 7000) {
                platformMH.body.velocity.x = 80;
            }
            if (platformMH.position.x > 7500) {
                platformMH.kill();
            }
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
        if (lostLive || lostLPlanet) {
            document.getElementById("lostLive").play();
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
            document.getElementById("changeLevel").play();
            game.state.start('PassLevel');
        }
        cursors = game.input.keyboard.createCursorKeys();
        player.body.velocity.x = 0;
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
            var jumpS = document.getElementById("jump");
            jumpS.volume = 0.4;
            jumpS.play();
            if (player.position.x > 2100) {
                player.body.velocity.y = -velocityLevel2.secondPart;
            } else {
                player.body.velocity.y = -velocityLevel2.firstPart;
            }
        }
    },
    test: function () {
        document.getElementById("lostLive").play();
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
            message1 = game.add.sprite(game.camera.view.x + 200, 200, 'message1');
            game.time.events.add(3000, this.removePicture, this, message1);

        } else {
            message0 = game.add.sprite(game.camera.view.x, 200, 'message0');
            game.time.events.add(3000, this.removePicture, this, message0);
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
            } else {
                initLVl2 = false;
                document.getElementById("lostLive").play();
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
        game.debug.text(player.position.x, 15, 18, "#2565e5");

    }
}
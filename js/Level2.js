var player, platforms, elements, cursors, bSun, waveCollition, bordersWin;
var initLVl2 = false;
var glasses, closeBtn, obstructions, st, planet, bEarth, bEarthH, liveUpGroup;
RutaEspectral.Level2 = function (game) {};
RutaEspectral.Level2.prototype = {
    preload: function () {
        game.load.image('background', 'assets/level2/backgroundLevel2.png');
        game.load.spritesheet('spriteA', 'assets/sprites/spriteA.png', this.round(spriteSizes[spriteSizes.length - 1].width / 11, 3), spriteSizes[spriteSizes.length - 1].height);
        game.load.image('wave', 'assets/level2/wave.png');
        game.load.image('platform', 'assets/level2/platform.png');
        game.load.image('bgLives', 'assets/level1/bgLives.png');
        game.load.image('star', 'assets/star.png');
        game.load.image('liveUp', 'assets/liveUp.png');

        game.load.image('px', 'assets/Level2/1px.png');
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
    },
    create: function () {
        game.add.tileSprite(0, 0, 7900, 600, 'background');
        game.world.setBounds(0, 0, 7900, 600);
        game.renderer.roundPixels = true;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        st = game.add.group();
        st.enableBody = true;

        planet = game.add.group();
        planet.enableBody = true;
        this.addPlanets(planet);
        elements = game.add.group();
        elements.enableBody = true;
        obstructions = game.add.group();
        obstructions.enableBody = true;
        bSun = game.add.group();
        bSun.enableBody = true;

        bEarth = game.add.group();
        bEarth.enableBody = true;

        bEarthH = game.add.group();
        bEarthH.enableBody = true;

        for (var i = 0; i < 599; i++) {
            var borderS = bSun.create(1650, i, 'px');
            borderS.body.immovable = true;
        }

        glasses = game.add.group();
        glasses.enableBody = true;
        var glass = glasses.create(1000, 100, 'glasses');
        glass.body.immovable = true;

        liveUpGroup = game.add.group();
        liveUpGroup.enableBody = true;
        var liveUp = liveUpGroup.create(7800, 310, 'liveUp');
        liveUp.body.immovable = true;
        setPlatforms(elements);

        this.addObstructions();
        setPlayerLvl2();
        bordersWin = game.add.group();
        bordersWin.enableBody = true;
        var winFlag = bordersWin.create(7137, 500, 'winFlag');
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
        //this.shootingExplotion();
        //this.infoText(message6, '20px', 200, 200, 380, 190);
        if (!collectGls) {
            game.paused = true;
            infoText(message6, '20px', 200, 200, 380, 190, function () {
                closeAdvLvl2();
            });
        }
    },
    update: function () {
        var hitPlatform = game.physics.arcade.collide(player, elements);
        var hitSun = game.physics.arcade.collide(player, bSun);
        var finish = game.physics.arcade.collide(player, bordersWin);
        var lostLive = game.physics.arcade.collide(player, obstructions);
        var hitEarth = game.physics.arcade.collide(player, bEarth);
        var hitEarthH = game.physics.arcade.collide(player, bEarthH);
        var lostLPlanet = game.physics.arcade.collide(player, planet);
        game.physics.arcade.overlap(player, glasses, this.collectGlasses, null, this);
        game.physics.arcade.overlap(player, liveUpGroup, this.collectLiveUp, null, this);
        if (player.position.x > 2982 && player.position.x < 2990) {
            addSatellites(4367, 100);
        }
        if (player.position.x > 4367 && player.position.x < 4372) {
            addSatellites(5667, 150);
        }
        if (player.position.x > 6500 && player.position.x < 6510) {
            this.addBorderEarth();
        }
        if (player.position.x > 800 && player.position.x < 810) {
            this.shootingExplotion();
        }
        if (lostLive || lostLPlanet) {
            countLives -= 1;
            if (countLives == 0) {
                countLives = 3;
                collectGls = false;
                game.state.start('Level2');
            }
            showLives();
            // game.state.start('Level2');
            game.paused = true;
            infoText(message5, '20px', game.camera.view.x + 200, 200, 380, 100, function () {
                //player.kill();
                //setPlayerLvl2();
                //game.paused = false;
                game.state.start('Level2');
                closeAdvLvl2();
                //game.state.start('Level2');
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

        if (hitEarth) {
            player.position.x = player.position.x - 50;
        }
        if (hitEarthH) {
            player.position.y = player.position.y - 50;
        }
        if (finish) {
            levelState = 2;
            countLives += 1;
            this.showLives();
            game.state.start('PassLevel');
        }
        cursors = game.input.keyboard.createCursorKeys();
        player.body.velocity.x = 0;
        if (cursors.left.isDown) {
            player.body.velocity.x = -velocityLevel2.firstPart;
            player.animations.play('left');
        } else if (cursors.right.isDown) {
            player.body.velocity.x = velocityLevel2.firstPart;
            player.animations.play('right');
        } else {
            player.animations.stop();
            player.frame = 5;
        }
        if (cursors.up.isDown && hitPlatform) {
            if (player.position.x > 2100) {
                player.body.velocity.y = -velocityLevel2.secondPart;
            } else {
                player.body.velocity.y = -velocityLevel2.firstPart;
            }
        }
    },
    collectGlasses: function (player, glasses) {
        glasses.kill();
        collectGls = true;
        game.paused = true;
        infoText(message7, '20px', player.position.x - 150, 200, 380, 100, function () {
            game.paused = false;
        });
    },
    collectLiveUp: function (player, liveUp) {
        countLives += 1;
        liveUp.kill();
        this.showLives();
    },
    collectWave: function (player, wave) {
        wave.kill();
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

    addObstructions: function () {
        for (var i = 0; i < 3; i++) {
            var obstruction1 = obstructions.create(80 + (i * 500), 20, 'obstructionGroup');
            obstruction1.body.immovable = true;
            game.physics.enable(obstruction1, Phaser.Physics.ARCADE);
            obstruction1.body.velocity.setTo(-10, 100);
            obstruction1.body.collideWorldBounds = true;
            obstruction1.body.bounce.set(0.4);

            var obstruction1 = obstructions.create(150 + (i * 700), 200, 'obstruction1');
            obstruction1.body.immovable = true;
            game.physics.enable(obstruction1, Phaser.Physics.ARCADE);
            obstruction1.body.velocity.setTo(10, 100);
            obstruction1.body.collideWorldBounds = true;
            obstruction1.body.bounce.set(0.4);

            var obstruction1 = obstructions.create(170 + (i * 680), 400, 'obstruction2');
            obstruction1.body.immovable = true;
            game.physics.enable(obstruction1, Phaser.Physics.ARCADE);
            obstruction1.body.velocity.setTo(10, 100);
            obstruction1.body.collideWorldBounds = true;
            obstruction1.body.bounce.set(0.7);
        }
    },
    shootingExplotion: function () {
        var star = st.create(1000, 10, 'starM');
        star.body.immovable = true;
        game.physics.enable(star, Phaser.Physics.ARCADE);
        star.body.velocity.setTo(-100, 100);
    },
    addPlanets: function (planet) {
        for (var i = 0; i < planet1.length - 6; i++) {
            if (i > 3) {
                var p1 = planet.create(4300 + planet1[i].x, 80 + planet1[i].y, 'planet1');
                p1.body.immovable = true;
            }
            var p4 = planet.create(2400 + planet2[i].x, 10 + planet2[i].y, 'planet4');
            p4.body.immovable = true;
            var p3 = planet.create(2400 + planet3[i].x, 80 + planet3[i].y, 'planet3');
            p3.body.immovable = true;
        }
    },
    addBorderEarth: function () {
        for (var i = 490; i < 599; i++) {
            var borderE = bEarth.create(6430, i, 'px');
            borderE.body.immovable = true;
        }
        // for (var i = 6430; i < 6920; i++) {
        var borderH = bEarthH.create(6445, 470, 'BH1');
        borderH.body.immovable = true;
        // }
        // for (var i = 7010; i < 7900; i++) {
        var borderH = bEarthH.create(7146, 430, 'BH2');
        borderH.body.immovable = true;
        // }
    },
    render: function () {
        if (initLVl2) {
            if (timerL1.running) {
                timeRest = formatTime(Math.round((timerEvent.delay - timerL1.ms) / 1000));
                game.debug.text(formatTime(Math.round((timerEvent.delay - timerL1.ms) / 1000)), 15, 18, "#2565e5");
            }
        }
        //game.debug.text(player.position.x + "--" + player.position.y, 15, 18, "#2565e5");
    }
}
var player, bioHSprite, platforms, elements, bottomLine, cursors, enemies, enemiesBio, line, roadLine, bFinish;
var carsSprite = [],
    biosSprite = [];
var initLVl5 = false,
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
var signal, bgGreen = [];
var btnRadio, btnTV, btnPhone;
RutaEspectral.Level5 = function (game) {};
RutaEspectral.Level5.prototype = {
    preload: function () {
        game.load.image('background', 'assets/level5/bg5.png');
        //game.load.spritesheet('spritePlayer', 'assets/sprites/sprite' + selectedSprite + '.png', spriteSizes[selectedSprite].width / 11, spriteSizes[selectedSprite].height);
        game.load.spritesheet('spritePlayer', 'assets/sprites/sprite' + 8 + '.png', spriteSizes[8].width / 11, spriteSizes[14].height);
        game.load.spritesheet('spriteBio', 'assets/level3/bioSprite.png', (120 / 3), 40);
        game.load.image('platformS', 'assets/level3/platformSky.png');

        game.load.image('Lpx', 'assets/Level2/lineSun.png');

        game.load.image('bottomLine', 'assets/level5/bottomLine.png');
        game.load.image('roadLine', 'assets/level5/roadLine.png');
        game.load.image('antenna', 'assets/level5/antenna.png');
        // game.load.image('s0', 'assets/level4/phone.png');
        // game.load.image('s1', 'assets/level4/radio.png');
        // game.load.image('s2', 'assets/level4/tv.png');
        // game.load.image('s3', 'assets/level4/wifi.png');
        // game.load.image('tv', 'assets/level4/sTV.png');
        // game.load.image('radio', 'assets/level4/sRadio.png');
        // game.load.image('phone', 'assets/level4/sPhone.png');
        // game.load.image('wifi', 'assets/level4/sWifi.png');
        // game.load.image('messageInfo0', 'assets/level4/messageInfo0.png');
        // game.load.image('messageInfo1', 'assets/level4/messageInfo1.png');
        // game.load.image('messageInfo2', 'assets/level4/messageInfo2.png');
        // game.load.image('messageInfo3', 'assets/level4/messageInfo3.png');
        // game.load.image('messageInfo4', 'assets/level4/messageInfo4.png');
        // game.load.image('indicator', 'assets/level4/indicator.png');

        game.load.spritesheet('spriteCar', 'assets/level4/carSprite.png', (570 / 6), 50);
        game.load.spritesheet('spriteTruck', 'assets/level4/truckSprite.png', (1217 / 6), 70);

        game.load.image('bgLives', 'assets/level1/bgLives.png');
        game.load.image('bgLivesG', 'assets/level4/bgLives.png');
        game.load.image('star', 'assets/star.png');

        game.load.spritesheet('closeBtn', 'assets/buttons/closeBtn.png', 40, 40);
    },
    create: function () {
        levelState = 5;
        game.add.tileSprite(0, 0, 8614, 600, 'background');
        game.world.setBounds(0, 0, 8614, 600);
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
        addBioSprite();

        var stbackround = game.add.image(640, 0, 'bgLives');
        stbackround.fixedToCamera = true;
        stbackround.scale.set(2, 1);
        stars = game.add.group();
        stars.enableBody = true;
        stars.fixedToCamera = true;
        showLives();
        setCollectableElements();
        game.paused = true;
        game.add.image(0, 0, 'bgLives').fixedToCamera = true;
        infoText('Nivel 5', '20px', game.camera.view.x + 200, 200, 400, 200, function () {
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
        game.physics.arcade.overlap(player, collectables, collectElements, null, this);

        player.checkWorldBounds = true;

        animateCarsMove();
        animateBio();

        if (losLive0 || losLive1) {
            this.die();
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
            if (hitRoadLine || hitPlatform) {
                var jumpS = document.getElementById("jump");
                jumpS.volume = 0.4;
                jumpS.play();
            }

            player.body.velocity.y = -velocityLevel2.firstPart;

        }
        roadLine.body.checkCollision.up = true;
        if (cursors.down.isDown && hitRoadLine) {
            hitRoadLine = false;
            roadLine.body.checkCollision.up = false;
            player.body.velocity.y = velocityLevel2.firstPart;
        }
    },
    die: function () {
        document.getElementById("lostLive").play();
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
            } else {
                this.die();
            }
        }
    }
}
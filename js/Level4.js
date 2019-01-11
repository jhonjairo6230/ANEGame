var player, bioHSprite, platforms, elements, bottomLine, cursors, enemies, enemiesBio, line, roadLine;
var carsSprite = [],
    biosSprite = [];
var initLVl4 = false,
    isLeftCar = true,
    isLeftTruck = true,
    isLeftBio0 = true,
    isLeftBio2 = true,
    isLeftBio3 = true;
var collectables, messageInfo, messageRadio;
var countWifi = 0,
    countTV = 0,
    countRadio = 0;
var increment = -120;
var btnRadio, btnHorn, btnSmoke, btnTelegraph;
RutaEspectral.Level4 = function (game) {};
RutaEspectral.Level4.prototype = {
    preload: function () {
        game.load.image('background', 'assets/level4/backgroundLVL4.png');
        //game.load.spritesheet('spritePlayer', 'assets/sprites/sprite' + selectedSprite + '.png', spriteSizes[selectedSprite].width / 11, spriteSizes[selectedSprite].height);
        game.load.spritesheet('spritePlayer', 'assets/sprites/sprite' + 14 + '.png', spriteSizes[14].width / 11, spriteSizes[14].height);
        game.load.spritesheet('spriteBio', 'assets/level3/bioSprite.png', (120 / 3), 40);
        game.load.image('platformS', 'assets/level3/platformSky.png');

        game.load.image('bottomLine', 'assets/level4/bottomLine.png');
        game.load.image('roadLine', 'assets/level4/roadLine.png');
        game.load.spritesheet('spriteCar', 'assets/level4/carSprite.png', (570 / 6), 50);
        game.load.spritesheet('spriteTruck', 'assets/level4/truckSprite.png', (1217 / 6), 70);

        game.load.image('bgLives', 'assets/level1/bgLives.png');
        game.load.image('star', 'assets/star.png');

        game.load.spritesheet('closeBtn', 'assets/buttons/closeBtn.png', 40, 40);
    },
    create() {
        levelState = 4;
        game.add.tileSprite(0, 0, 7056, 600, 'background');
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
        addBioSprite();
        var stbackround = game.add.image(640, 0, 'bgLives');
        stbackround.fixedToCamera = true;
        stbackround.scale.set(2, 1);
        stars = game.add.group();
        stars.enableBody = true;
        stars.fixedToCamera = true;
        var st2 = game.add.image(0, 0, 'bgLives');
        st2.fixedToCamera = true;
        showLives();
    },
    update() {
        var hitPlatform = game.physics.arcade.collide(player, platforms);
        var hitFloor = game.physics.arcade.collide(player, lineBottom);
        var hitRoadLine = game.physics.arcade.collide(player, roadLine);
        var losLive0 = game.physics.arcade.collide(player, enemies);
        var losLive1 = game.physics.arcade.collide(player, enemiesBio);

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
        countRadio = countTv = countWifi = 0;
        initLVl3 = false;
        countLives -= 1;
        if (countLives == 0) {
            countLives = 3;
            game.state.start('Level4');
        }
        showLives();
        game.paused = true;
        // var msg = timerL1.running ? message14 : message13;
        infoText("msg", '20px', game.camera.view.x + 200, 200, 300, 100, function () {
            game.paused = false;
            game.state.start('Level4');
        });
    },
    render() {
        game.debug.text(player.position.x, 15, 18, "#2565e5");
    }
}
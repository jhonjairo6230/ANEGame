var player, bioHSprite, platforms, elements, cursors, enemies, enemiesBio, mountain;
var fishesSprite = [],
    biosSprite = [];
var initLVl3 = false,
    isUp = true,
    isLeft = true,
    isLeft12 = true;
var sHorn, sRadio, sSmoke, sTelegraph, collectables, messageInfo, messageRadio;
var countSmoke = 0,
    countHorn = 0,
    countTelegraph = 0,
    countRadio = 0;
var increment = -120;
var btnRadio, btnHorn, btnSmoke, btnTelegraph;
RutaEspectral.Level3 = function (game) {};
RutaEspectral.Level3.prototype = {
    preload: function () {
        game.load.image('background', 'assets/level3/backgroundLVL3.png');
        // game.load.spritesheet('spritePlayer', 'assets/sprites/sprite' + selectedSprite + '.png', spriteSizes[selectedSprite].width / 11, spriteSizes[selectedSprite].height);
        game.load.spritesheet('spritePlayer', 'assets/sprites/sprite' + 31 + '.png', spriteSizes[31].width / 11, spriteSizes[14].height);
        game.load.spritesheet('spriteFish', 'assets/level3/fishSprite.png', (207 / 4), 80);
        game.load.spritesheet('spriteBio', 'assets/level3/bioSprite.png', (120 / 3), 40);
        game.load.image('platformL', 'assets/level3/platformL.png');
        game.load.image('platformR', 'assets/level3/platformR.png');
        game.load.image('platformC', 'assets/level3/platformC.png');
        game.load.image('platformS', 'assets/level3/platformSky.png');
        game.load.image('horn', 'assets/level3/sHorn.png');
        game.load.image('radio', 'assets/level3/sRadio.png');
        game.load.image('smoke', 'assets/level3/sSmoke.png');
        game.load.image('telegraph', 'assets/level3/sTelegraph.png');
        game.load.image('s0', 'assets/level3/cuerno.png');
        game.load.image('s1', 'assets/level3/radio.png');
        game.load.image('s2', 'assets/level3/humo.png');
        game.load.image('s3', 'assets/level3/telegrafo.png');
        game.load.image('mountain', 'assets/level3/mountain.png');

        game.load.image('bgLives', 'assets/level1/bgLives.png');
        game.load.image('star', 'assets/star.png');

        game.load.spritesheet('closeBtn', 'assets/buttons/closeBtn.png', 40, 40);
        game.load.spritesheet('btnHorn', 'assets/level3/btnHorn.png', 209 / 2, 105);
        game.load.spritesheet('btnSmoke', 'assets/level3/btnSmoke.png', 207 / 2, 104);
        game.load.spritesheet('btnRadio', 'assets/level3/btnRadio.png', 210 / 2, 104);
        game.load.spritesheet('btnTelegraph', 'assets/level3/btnTelegraph.png', 211 / 2, 104);
        game.load.image('dialogBg', 'assets/level3/dialogSelect.png');

        game.load.image('messageHorn', 'assets/level3/messageHorn.png');
        game.load.image('messageRadio', 'assets/level3/messageRadio.png');
        game.load.image('messageTelegraph', 'assets/level3/messageTelegraph.png');
        game.load.image('messageSmoke', 'assets/level3/messageSmoke.png');
    },
    create: function () {
        levelState = 3;
        game.add.tileSprite(0, 0, 14130, 600, 'background');
        game.world.setBounds(0, 0, 14130, 600);
        game.renderer.roundPixels = true;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.checkCollision.down = false;

        mountain = game.add.group();
        mountain.enableBody = true;
        var m = mountain.create(12756, 140, 'mountain');
        m.body.immovable = true;
        platforms = game.add.group();
        platforms.enableBody = true;

        setPlatforms(platforms, null);
        setPlayer();
        addBioSprite();
        var stbackround = game.add.image(640, 0, 'bgLives');
        stbackround.fixedToCamera = true;
        stbackround.scale.set(2, 1);
        stars = game.add.group();
        stars.enableBody = true;
        stars.fixedToCamera = true;
        var st2 = game.add.image(0, 0, 'bgLives');
        st2.fixedToCamera = true;
        for (n = 0; n < 4; n++) {
            game.add.image(200 + (n * 100), 0, 'bgLives').fixedToCamera = true;
            game.add.image(240 + (n * 100), 4, 's' + n).fixedToCamera = true;
        }

        showLives();

        enemies = game.add.group();
        enemies.enableBody = true;
        addFishSprite(enemies);

        // collectables = game.add.group();
        // collectables.enableBody = true;
        setCollectableElements();
        game.paused = true;
        infoText(message15, '20px', game.camera.view.x + 200, 200, 400, 150, function () {
            initLevel();
        });
    },
    update: function () {
        var hitPlatform = game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(enemiesBio, platforms);
        var losLive0 = game.physics.arcade.collide(player, enemies);
        var losLive1 = game.physics.arcade.collide(player, enemiesBio);
        var mountainC = game.physics.arcade.collide(player, mountain);
        game.physics.arcade.overlap(player, collectables, collectElements, null, this);

        player.checkWorldBounds = true;
        player.events.onOutOfBounds.add(this.die, this);
        animateFishJump();
        animateBio();
        if (mountainC) {
            //    if (game.camera.x == 12412) {
            game.paused = true;
            var msg;
            var isCollected = false;
            // countHorn = 10;
            // countRadio = 10;
            // countSmoke = 1;
            // countTelegraph = 10;
            if (countHorn == 10 || countRadio == 10 || countSmoke == 10 || countTelegraph == 10) {
                msg = message16;
                isCollected = true;
            } else {
                msg = message17;
                isCollected = false;
                //player.position.x = player.position.x - 10;
            }
            if (game.camera.x < 13000) {
                for (var i = 0; i < 900; i++) {
                    game.camera.x += i;
                }
                infoText(msg, '20px', game.camera.view.x + 200, 200, 300, 120, function () {

                    closeTextInfo();
                    if (isCollected) {
                        game.paused = false;
                        //game.paused = true;
                        createDialogSelect();
                    } else {
                        game.paused = false;
                    }
                });
                player.position.x = player.position.x - 100;
            }


            // }
        }
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
            // document.getElementById("jump").play();
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
    die: function () {
        document.getElementById("lostLive").play();
        countHorn = countRadio = countSmoke = countTelegraph = 0;
        initLVl3 = false;
        countLives -= 1;
        if (countLives == 0) {
            countLives = 3;
            game.state.start('Level3');
        }
        showLives();
        game.paused = true;
        var msg = timerL1.running ? message14 : message13;
        infoText(msg, '20px', game.camera.view.x + 200, 200, 300, 100, function () {
            game.paused = false;
            game.state.start('Level3');
        });
    },
    render: function () {
        if (initLVl3) {
            if (timerL1.running) {
                timeRest = formatTime(Math.round((timerEvent.delay - timerL1.ms) / 1000));
                game.debug.text(formatTime(Math.round((timerEvent.delay - timerL1.ms) / 1000)), 15, 18, "#2565e5");
            } else {
                this.die();
            }
            //game.debug.text(player.position.x, 15, 18, "#2565e5");
            game.debug.text(countHorn + "x", 220, 18, "#2565e5");
            game.debug.text(countRadio + "x", 320, 18, "#2565e5");
            game.debug.text(countSmoke + "x", 420, 18, "#2565e5");
            game.debug.text(countTelegraph + "x", 520, 18, "#2565e5");
        }
    }
}
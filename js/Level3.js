var player, bioHSprite, platforms, elements, cursors, enemies;
var fishesSprite = [];
var initLVl3 = false,
    isUp = true;
var sHorn, sRadio, sSmoke, sTelegraph, collectables;

RutaEspectral.Level3 = function (game) {};
RutaEspectral.Level3.prototype = {
    preload: function () {
        game.load.image('background', 'assets/level3/backgroundLVL3.png');
        //game.load.spritesheet('sprite' + selectedSprite, 'assets/sprites/sprite' + selectedSprite + '.png', spriteSizes[selectedSprite].width / 11, spriteSizes[selectedSprite].height);
        game.load.spritesheet('spritePlayer', 'assets/sprites/sprite' + 14 + '.png', spriteSizes[14].width / 11, spriteSizes[14].height);
        game.load.spritesheet('spriteFish', 'assets/level3/fishSprite.png', (183 / 4), 80);
        game.load.image('platformL', 'assets/level3/platformL.png');
        game.load.image('platformR', 'assets/level3/platformR.png');
        game.load.image('platformC', 'assets/level3/platformC.png');
        game.load.image('horn', 'assets/level3/sHorn.png');
        game.load.image('radio', 'assets/level3/sRadio.png');
        game.load.image('smoke', 'assets/level3/sSmoke.png');
        game.load.image('telegraph', 'assets/level3/sTelegraph.png');

        game.load.image('bgLives', 'assets/level1/bgLives.png');
        game.load.image('star', 'assets/star.png');
        game.load.spritesheet('closeBtn', 'assets/buttons/closeBtn.png', 40, 40);


    },
    create: function () {
        levelState = 3;
        game.add.tileSprite(0, 0, 14130, 600, 'background');
        game.world.setBounds(0, 0, 14130, 600);
        game.renderer.roundPixels = true;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.checkCollision.down = false;

        platforms = game.add.group();
        platforms.enableBody = true;
        setPlatforms(platforms, null);
        setPlayerLvl2();

        var stbackround = game.add.image(640, 0, 'bgLives');
        stbackround.fixedToCamera = true;
        stbackround.scale.set(2, 1);
        stars = game.add.group();
        stars.enableBody = true;
        stars.fixedToCamera = true;
        var st2 = game.add.image(0, 0, 'bgLives');
        st2.fixedToCamera = true;
        showLives();

        enemies = game.add.group();
        enemies.enableBody = true;
        addFishSprite(enemies);

        collectables = game.add.group();
        collectables.enableBody = true;
        setCollectableElements();
    },
    update: function () {
        var hitPlatform = game.physics.arcade.collide(player, platforms);
        var losLive0 = game.physics.arcade.collide(player, enemies);
        player.checkWorldBounds = true;
        player.events.onOutOfBounds.add(this.die, this);
        animateFishJump();
        if (losLive0) {
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
            document.getElementById("jump").play();
            if (player.position.x > 2100) {
                player.body.velocity.y = -velocityLevel2.secondPart;
            } else {
                player.body.velocity.y = -velocityLevel2.firstPart;
            }
        }
    },
    die: function () {
        document.getElementById("lostLive").play();
        initLVl3 = false;
        countLives -= 1;
        if (countLives == 0) {
            countLives = 3;
            game.state.start('Level3');
        }
        showLives();
        game.paused = true;
        infoText(message14, '20px', game.camera.view.x + 200, 200, 300, 100, function () {
            game.paused = false;
            game.state.start('Level3');
        });
    },
    render: function () {
        game.debug.text(player.position.x, 15, 18, "#2565e5");
    }
}
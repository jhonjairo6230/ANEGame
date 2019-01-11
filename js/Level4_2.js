var player, platforms, rocks, bottomLine, cursors, line, roadLine, bFinish, lineFinish;
RutaEspectral.Level4_2 = function (game) {};
RutaEspectral.Level4_2.prototype = {
    preload: function () {
        game.load.image('background', 'assets/level4/background4_2.png');
        game.load.spritesheet('spritePlayer', 'assets/sprites/sprite' + selectedSprite + '.png', spriteSizes[selectedSprite].width / 11, spriteSizes[selectedSprite].height);
        //game.load.spritesheet('spritePlayer', 'assets/sprites/sprite' + 14 + '.png', spriteSizes[14].width / 11, spriteSizes[14].height);
        game.load.image('messageInfo0', 'assets/level4/messageInfo0.png');
        game.load.image('messageInfo1', 'assets/level4/messageInfo1.png');
        game.load.image('messageInfo2', 'assets/level4/messageInfo2.png');
        game.load.image('messageInfo1', 'assets/level4/messageInfo3.png');
        game.load.image('messageInfo2', 'assets/level4/messageInfo4.png');
        game.load.image('bottomLine', 'assets/level4/bottomLine4_2.png');
        game.load.image('lineF', 'assets/level4/lineF.png');
        game.load.image('rock0', 'assets/level4/rock0.png');
        game.load.image('rock1', 'assets/level4/rock1.png');
        game.load.image('rock2', 'assets/level4/rock2.png');
        game.load.image('rock3', 'assets/level4/rock3.png');
        game.load.image('winFlag', 'assets/level1/winFlag.png');
        game.load.image('messageInfo0', 'assets/level4/messageInfo0.png');
        game.load.image('messageInfo1', 'assets/level4/messageInfo1.png');
        game.load.image('messageInfo2', 'assets/level4/messageInfo2.png');
        game.load.image('messageInfo3', 'assets/level4/messageInfo3.png');
        game.load.image('messageInfo4', 'assets/level4/messageInfo4.png');

        game.load.image('bgLives', 'assets/level1/bgLives.png');
        game.load.image('star', 'assets/star.png');
        game.load.spritesheet('closeBtn', 'assets/buttons/closeBtn.png', 40, 40);
    },
    create: function () {
        levelState = 4;
        game.add.tileSprite(0, 0, 1542, 600, 'background');
        game.world.setBounds(0, 0, 1542, 600);
        game.renderer.roundPixels = true;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        if (signal != 2) {
            lineFinish = game.add.group();
            lineFinish.enableBody = true;
            lineFin = lineFinish.create(1540, 0, 'lineF');
            lineFin.body.immovable = true;
            lineFin.body.velocity.setTo(-100, 0);
        } else {
            bordersWin = game.add.group();
            bordersWin.enableBody = true;
            var winFlag = bordersWin.create(1483, 320, 'winFlag');
            winFlag.body.immovable = true;
        }


        line = game.add.group();
        line.enableBody = true;
        lineBottom = line.create(0, 599, 'bottomLine');
        lineBottom.body.immovable = true;
        lineBottom = line.create(0, 440, 'bottomLine');
        lineBottom.body.immovable = true;
        lineBottom = line.create(0, 245, 'bottomLine');
        lineBottom.body.immovable = true;
        player = game.add.sprite(320, signal * 150, 'spritePlayer');
        player.animations.add('right', [7, 8, 9, 10], 8, true);
        player.animations.add('left', [0, 1, 2, 3], 8, true);
        game.physics.arcade.enable(player);
        player.body.bounce.y = 0.1;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

        var stbackround = game.add.image(640, 0, 'bgLives');
        stbackround.fixedToCamera = true;
        stbackround.scale.set(2, 1);
        stars = game.add.group();
        stars.enableBody = true;
        stars.fixedToCamera = true;
        var st2 = game.add.image(0, 0, 'bgLives');
        st2.fixedToCamera = true;
        showLives();
        addRocks(signal);
    },
    update: function () {
        var hitFloor = game.physics.arcade.collide(player, line);
        var lost = game.physics.arcade.collide(player, rocks);
        if (signal != 2) {
            if (game.physics.arcade.collide(player, lineFinish)) {
                this.message();
            }
        } else {
            if (game.physics.arcade.collide(player, bordersWin)) {
                levelState = 4;
                document.getElementById("changeLevel").play();
                game.state.start('PassLevel');
            }
        }
        if (lost) {
            this.message();
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
        if (cursors.up.isDown) {
            var jumpS = document.getElementById("jump");
            jumpS.volume = 0.4;
            jumpS.play();
            player.body.velocity.y = -velocityLevel2.firstPart;

        }
    },
    die: function () {
        document.getElementById("lostLive").play();
        countRadio = countTv = countPhone = 0;
        initLVl4 = false;
        countLives -= 1;
        if (countLives == 0) {
            countLives = 3;
            game.state.start('Level4');
        }
        showLives();
        game.paused = false;
        game.state.start('Level4');
    },
    message: function () {
        game.paused = true;
        if (signal == 1) {
            messageInfo = game.add.image(game.camera.view.x + 100, 100, 'messageInfo4');
        }
        if (signal == 3) {
            messageInfo = game.add.image(game.camera.view.x + 100, 100, 'messageInfo3');
        }
        btncls = game.add.button(game.camera.view.x + 100 + 460, 100, 'closeBtn', this.die, this, 1, 1, 0);
    },
    render() {
        //game.debug.text(player.position.x + "-" + player.position.y, 15, 18, "#2565e5");
    }
}
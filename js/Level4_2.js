var player, platforms, rocks, bottomLine, cursors, line, roadLine, bFinish;
// var carsSprite = [],
//     biosSprite = [];
// var initLVl4 = false,
//     isLeftCar = true,
//     isLeftTruck = true,
//     isLeftBio0 = true,
//     isLeftBio2 = true;
// var collectables, messageInfo, messageRadio, sTV, sRadio, sPhone;
RutaEspectral.Level4_2 = function (game) {};
RutaEspectral.Level4_2.prototype = {
    preload: function () {
        game.load.image('background', 'assets/level4/background4_2.png');
        //game.load.spritesheet('spritePlayer', 'assets/sprites/sprite' + selectedSprite + '.png', spriteSizes[selectedSprite].width / 11, spriteSizes[selectedSprite].height);
        game.load.spritesheet('spritePlayer', 'assets/sprites/sprite' + 14 + '.png', spriteSizes[14].width / 11, spriteSizes[14].height);
        game.load.image('messageInfo0', 'assets/level4/messageInfo0.png');
        game.load.image('messageInfo1', 'assets/level4/messageInfo1.png');
        game.load.image('messageInfo2', 'assets/level4/messageInfo2.png');
        game.load.image('messageInfo1', 'assets/level4/messageInfo3.png');
        game.load.image('messageInfo2', 'assets/level4/messageInfo4.png');
        game.load.image('bottomLine', 'assets/level4/bottomLine4_2.png');
        game.load.image('rock0', 'assets/level4/rock0.png');
        game.load.image('rock1', 'assets/level4/rock1.png');
        game.load.image('rock2', 'assets/level4/rock2.png');
        game.load.image('mountainRock', 'assets/level4/mountainrock.png');

        game.load.image('bgLives', 'assets/level1/bgLives.png');
        game.load.image('star', 'assets/star.png');
    },
    create: function () {
        levelState = 4;
        game.add.tileSprite(0, 0, 1542, 600, 'background');
        game.world.setBounds(0, 0, 1542, 600);
        game.renderer.roundPixels = true;
        game.physics.startSystem(Phaser.Physics.ARCADE);

        line = game.add.group();
        line.enableBody = true;
        lineBottom = line.create(0, 599, 'bottomLine');
        lineBottom.body.immovable = true;
        lineBottom = line.create(0, 440, 'bottomLine');
        lineBottom.body.immovable = true;
        lineBottom = line.create(0, 245, 'bottomLine');
        lineBottom.body.immovable = true;
        setPlayer();

        var stbackround = game.add.image(640, 0, 'bgLives');
        stbackround.fixedToCamera = true;
        stbackround.scale.set(2, 1);
        stars = game.add.group();
        stars.enableBody = true;
        stars.fixedToCamera = true;
        var st2 = game.add.image(0, 0, 'bgLives');
        st2.fixedToCamera = true;
        showLives();
        addRocks(3);
    },
    update: function () {
        var hitFloor = game.physics.arcade.collide(player, line);
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
    render() {
        game.debug.text(player.position.x + "-" + player.position.y, 15, 18, "#2565e5");
    }
}
var player, bioHSprite, platforms, elements, cursors;
var initLVl3 = false;
var sHorn, sRadio, sSmoke, sTelegraph;

RutaEspectral.Level3 = function (game) {};
RutaEspectral.Level3.prototype = {
    preload: function () {
        game.load.image('background', 'assets/level3/backgroundLVL3.png');
        //game.load.spritesheet('sprite' + selectedSprite, 'assets/sprites/sprite' + selectedSprite + '.png', spriteSizes[selectedSprite].width / 11, spriteSizes[selectedSprite].height);
        game.load.spritesheet('spritePlayer', 'assets/sprites/sprite' + 14 + '.png', spriteSizes[14].width / 11, spriteSizes[14].height);
        game.load.image('platformL', 'assets/level3/platformL.png');
        game.load.image('platformR', 'assets/level3/platformR.png');
        game.load.image('platformC', 'assets/level3/platformC.png');
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
    },
    update: function () {
        var hitPlatform = game.physics.arcade.collide(player, platforms);
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
    render: function () {
        game.debug.text(player.position.x, 15, 18, "#2565e5");
    }
}
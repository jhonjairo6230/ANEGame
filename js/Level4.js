var player, bioHSprite, platforms, elements, bottomLine, cursors, enemies, enemiesBio, line, roadLine;
var fishesSprite = [],
    biosSprite = [];
var initLVl4 = false,
    isUp = true,
    isLeft = true,
    isLeft12 = true;
var collectables, messageInfo, messageRadio;
var countSmoke = 0,
    countHorn = 0,
    countTelegraph = 0,
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
        game.load.spritesheet('spriteCar', 'assets/level4/carSprite.png', (689 / 6), 60);
        game.load.spritesheet('truckCar', 'assets/level4/truckSprite.png', (10391 / 6), 80);
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
    },
    update() {
        var hitPlatform = game.physics.arcade.collide(player, platforms);
        var hitFloor = game.physics.arcade.collide(player, lineBottom);
        var hitRoadLine = game.physics.arcade.collide(player, roadLine);
        player.checkWorldBounds = true;
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
            if (hitRoadLine) {
                var jumpS = document.getElementById("jump");
                jumpS.volume = 0.4;
                jumpS.play();
            }
            if (player.position.x > 2100) {
                player.body.velocity.y = -velocityLevel2.secondPart;
            } else {
                player.body.velocity.y = -velocityLevel2.firstPart;
            }
        }
        roadLine.body.checkCollision.up = true;
        if (cursors.down.isDown && hitRoadLine) {
            hitRoadLine = false;
            roadLine.body.checkCollision.up = false;
        }

    },
    render() {
        game.debug.text(player.position.x, 15, 18, "#2565e5");
    }
}
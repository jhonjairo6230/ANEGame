// var config = {
//     type: Phaser.CANVAS,
//     width: 800,
//     height: 600,
//     scene: {
//         preload: preload,
//         create: create,
//         update: update
//     }
// };
var platforms;
var player;
var cursors;
var starts;
var score = 0;
var scoreText;
var button;
var clicked = false;
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game');
var PhaserGame = function () {
    this.player = null;
}
PhaserGame.prototype = {

    preload: function () {

        // Load the gamepad spritesheet. Note that the width must equal height
        // of the sprite.
        this.load.spritesheet('gamepad',
            'assets/dpad.png', 100, 100);
        this.load.spritesheet('button', 'assets/buttons.png', 193, 71);
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude', 'assets/astronauta.png', 105, 136);
        // this.load.image('space', 'assets/space_bg.jpg');
        // this.load.image('ship', 'assets/ship.png');
        // this.load.image('laser', 'assets/laser.png');
    },

    create: function () {

        game.renderer.roundPixels = true;
        //  We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //  A simple background for our game
        game.add.sprite(0, 0, 'sky');

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = game.add.group();

        //  We will enable physics for any object that is created in this group
        platforms.enableBody = true;

        // Here we create the ground.
        var ground = platforms.create(0, game.world.height - 64, 'ground');

        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        ground.scale.setTo(2, 2);

        //  This stops it from falling away when you jump on it
        ground.body.immovable = true;

        //  Now let's create two ledges
        var ledge = platforms.create(400, 400, 'ground');

        ledge.body.immovable = true;

        ledge = platforms.create(-150, 250, 'ground');

        ledge.body.immovable = true;
        ledge = platforms.create(200, 100, 'ground');

        ledge.body.immovable = true;
        // The player and its settings
        player = game.add.sprite(32, game.world.height - 250, 'dude');

        //  We need to enable physics on the player
        game.physics.arcade.enable(player);

        //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 7, 8, 9], 10, true);
        stars = game.add.group();

        stars.enableBody = true;
        scoreText = game.add.text(16, 16, 'score: 0', {
            fontSize: '32px',
            fill: '#000'
        });
        // button = game.add.button(50, game.world.height - 71, 'button', actionOnClick, this, 2, 1, 0);

        // button.onInputOver.add(over, this);
        // button.onInputOut.add(out, this);
        // button.onInputUp.add(up, this);
        //  Here we'll create 12 of them evenly spaced apart
        for (var i = 0; i < 12; i++) {
            //  Create a star inside of the 'stars' group
            var star = stars.create(i * 70, 0, 'star');

            //  Let gravity do its thing
            star.body.gravity.y = 6;

            //  This just gives each star a slightly random bounce value
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }
        // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // this.scale.pageAlignHorizontally = true;
        // this.scale.pageAlignVertically = true;

        // this.physics.startSystem(Phaser.Physics.ARCADE);

        // this.add.tileSprite(0, 0, game.width, game.height, 'space');

        // this.lasers = game.add.group();
        // this.lasers.enableBody = true;
        // this.lasers.physicsBodyType = Phaser.Physics.ARCADE;

        // this.lasers.createMultiple(40, 'laser');
        // this.lasers.setAll('scale.x', 0.5);
        // this.lasers.setAll('scale.y', 0.5);
        // this.lasers.setAll('anchor.x', 0.5);
        // this.lasers.setAll('anchor.y', 0.5);

        // this.laserTime = 0;

        // this.player = this.add.sprite(250, 250, 'ship');
        // this.player.scale.setTo(0.8, 0.8);
        // this.player.anchor.set(0.5);

        // game.physics.arcade.enable(this.player);
        // this.player.body.drag.set(100);
        // this.player.body.maxVelocity.set(300);
        // this.player.lastAngle = -90;

        // var style = {
        //     font: '14px Arial',
        //     fill: '#ffffff',
        //     align: 'left',
        //     stroke: '#000000'
        // };

        // this.directionText = this.add.text(20, 20, '', style);
        // this.rectangularText = this.add.text(140, 20, '', style);
        // this.polarText = this.add.text(260, 20, '', style);
        // this.pushText = this.add.text(380, 20, '', style);

        // Add the VirtualGamepad plugin to the game
        this.gamepad = this.game.plugins.add(Phaser.Plugin.VirtualGamepad);

        // Add a joystick to the game (only one is allowed right now)
        this.joystick = this.gamepad.addJoystick(100, game.world.height - 100, 1.2, 'gamepad');

        // Add a button to the game (only one is allowed right now)
        this.button = this.gamepad.addButton(400, game.world.height - 100, 1.0, 'gamepad');
    },

    update: function () {
        //this.updateDebugText();
        //  Collide the player and the stars with the platforms
        var hitPlatform = game.physics.arcade.collide(player, platforms);
        // Read joystick data to set ship's angle and acceleration
        if (this.joystick.properties.inUse) {
            // this.player.angle = this.joystick.properties.angle;
            // this.player.lastAngle = this.player.angle;
        } else {
            // this.player.angle = this.player.lastAngle;
        }
        //this.player.body.acceleration.x = 4 * this.joystick.properties.x;
        //this.player.body.acceleration.y = 4 * this.joystick.properties.y;

        // Fire the lasers!
        if (this.button.isDown && player.body.touching.down && hitPlatform) {
            //this.fireLaser();
            player.body.velocity.y = -350;
        }

        game.physics.arcade.collide(stars, platforms);
        cursors = game.input.keyboard.createCursorKeys();
        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;

        if (cursors.left.isDown || this.joystick.properties.left) {
            //  Move to the left
            player.body.velocity.x = -150;

            player.animations.play('left');

        } else if (cursors.right.isDown || this.joystick.properties.right) {
            //  Move to the right
            player.body.velocity.x = 150;

            player.animations.play('right');
            //clicked = false;
        } else {
            //  Stand still
            player.animations.stop();

            player.frame = 5;
        }

        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
            player.body.velocity.y = -350;
        }
        game.physics.arcade.overlap(player, stars, this.collectStar, null, this);
        //this.screenWrap(this.player);
        //this.lasers.forEachExists(this.screenWrap, this);
    },
    collectStar: function (player, star) {

        // Removes the star from the screen
        star.kill();
        //  Add and update the score
        score += 10;
        scoreText.text = 'Score: ' + score;
    }
    // ,

    // fireLaser: function () {
    //     if (game.time.now > this.laserTime) {
    //         this.laser = this.lasers.getFirstExists(false);
    //         if (this.laser) {
    //             this.laser.reset(this.player.body.x + 20,
    //                 this.player.body.y + 12);
    //             this.laser.lifespan = 2000;
    //             this.laser.angle = this.player.angle;
    //             game.physics.arcade.velocityFromRotation(this.player.rotation,
    //                 400, this.laser.body.velocity);
    //             this.laserTime = game.time.now + 100;
    //         }
    //     }
    // },

    // screenWrap: function (sprite) {
    //     if (sprite.x < 0) {
    //         sprite.x = game.width;
    //     } else if (sprite.x > game.width) {
    //         sprite.x = 0;
    //     }

    //     if (sprite.y < 0) {
    //         sprite.y = game.height;
    //     } else if (sprite.y > game.height) {
    //         sprite.y = 0;
    //     }
    // },

    // updateDebugText: function () {
    //     this.directionText.setText("Direction:\n up: " +
    //         this.joystick.properties.up + "\n down: " +
    //         this.joystick.properties.down + "\n left: " +
    //         this.joystick.properties.left + "\n right: " +
    //         this.joystick.properties.right);
    //     this.rectangularText.setText("Rectangular:\n x: " +
    //         this.joystick.properties.x + "\n y: " + this.joystick.properties.y);
    //     this.polarText.setText("Polar:\n distance: " +
    //         this.joystick.properties.distance + "\n angle: " +
    //         (Math.round(this.joystick.properties.angle * 100) / 100) +
    //         "\n rotation: " +
    //         (Math.round(this.joystick.properties.rotation * 100) / 100));
    //     this.pushText.setText("Joystick: " + this.joystick.properties.inUse +
    //         "\nButton: " + this.button.isDown);
    // }
};

game.state.add('game', PhaserGame, true);
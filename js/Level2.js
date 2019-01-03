var player, platforms, elements, cursors, bSun, waveCollition, bordersWin;
var collectGls = false;
var glasses, closeBtn;
RutaEspectral.Level2 = function (game) {};
RutaEspectral.Level2.prototype = {
    preload: function () {
        game.load.image('background', 'assets/level2/backgroundLevel2.png');
        game.load.spritesheet('spriteA', 'assets/sprites/spriteA.png', this.round(spriteSizes[spriteSizes.length - 1].width / 11, 3), spriteSizes[spriteSizes.length - 1].height);
        game.load.image('wave', 'assets/level2/wave.png');
        game.load.image('platform', 'assets/level2/platform.png');
        game.load.image('bgLives', 'assets/level1/bgLives.png');
        game.load.image('star', 'assets/star.png');
        game.load.image('px', 'assets/Level2/1px.png');
        game.load.image('glasses', 'assets/Level2/glasses.png');
        game.load.spritesheet('closeBtn', 'assets/buttons/closeBtn.png', 40, 40);
    },
    create: function () {
        game.add.tileSprite(0, 0, 7900, 600, 'background');
        game.world.setBounds(0, 0, 7900, 600);
        game.renderer.roundPixels = true;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        waveCollition = game.add.group();
        waveCollition.enableBody = true;
        elements = game.add.group();
        elements.enableBody = true;

        bSun = game.add.group();
        bSun.enableBody = true;
        for (var i = 0; i < 599; i++) {
            var borderS = bSun.create(1650, i, 'px');
            borderS.body.immovable = true;
        }

        glasses = game.add.group();
        glasses.enableBody = true;
        var glass = glasses.create(1000, 100, 'glasses');
        glass.body.immovable = true;

        this.setPlatforms(elements);

        // var platform = elements.create(200, 550, 'platform');
        // platform.body.immovable = true;
        // var wave = waveCollition.create(220, 300, 'wave');
        // wave.body.immovable = true;
        // platform = elements.create(400, 400, 'platform');
        // platform.body.immovable = true;
        // platform = elements.create(600, 550, 'platform');
        // platform.body.immovable = true;
        // platform = elements.create(800, 350, 'platform');
        // platform.body.immovable = true;
        // var wave = waveCollition.create(820, 300, 'wave');
        // wave.body.immovable = true;
        // platform = elements.create(1000, 100, 'platform');
        // platform.body.immovable = true;
        // platform = elements.create(1200, 350, 'platform');
        // platform.body.immovable = true;
        // platform = elements.create(1300, 250, 'platform');
        // platform.body.immovable = true;
        // platform = elements.create(1350, 350, 'platform');
        // platform.body.immovable = true;
        // var wave = waveCollition.create(1500, 300, 'wave');
        // wave.body.immovable = true;
        // platform = elements.create(1500, 200, 'platform');
        // platform.body.immovable = true;
        // platform = elements.create(1700, 400, 'platform');
        // platform.body.immovable = true;
        // platform = elements.create(1930, 450, 'platform');
        // platform.body.immovable = true;
        // platform = elements.create(2050, 300, 'platform');
        // platform.body.immovable = true;
        // platform = elements.create(2200, 200, 'platform');
        // platform.body.immovable = true;
        // platform = elements.create(2450, 340, 'platform');
        // platform.body.immovable = true;
        // platform = elements.create(2800, 400, 'platform');
        // platform.body.immovable = true;
        player = game.add.sprite(80, 500, 'spriteA');
        player.animations.add('right', [7, 8, 9, 10], 8, true);
        player.animations.add('left', [0, 1, 2, 3], 8, true);
        game.physics.arcade.enable(player);
        player.body.bounce.y = 0.4;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
        bordersWin = game.add.group();
        bordersWin.enableBody = true;
        var winFlag = bordersWin.create(game.world.width - 36, 220, 'winFlag');
        winFlag.body.immovable = true;
        var stbackround = game.add.image(640, 0, 'bgLives');
        stbackround.fixedToCamera = true;
        stbackround.scale.set(2, 1);
        stars = game.add.group();
        stars.enableBody = true;
        stars.fixedToCamera = true;
        this.showLives();
        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        this.infoText(message6, '20px', 200, 200, 380, 190);
    },
    update: function () {
        var hitPlatform = game.physics.arcade.collide(player, elements);
        var hitSun = game.physics.arcade.collide(player, bSun);
        var finish = game.physics.arcade.collide(player, bordersWin);
        game.physics.arcade.overlap(player, waveCollition, this.collectWave, null, this);
        game.physics.arcade.overlap(player, glasses, this.collectGlasses, null, this);
        //Verify SunGlasses
        if (hitSun && !collectGls) {
            player.position.x = player.position.x - 10;
            this.infoText(message10, '20px', player.position.x - 150, 200, 380, 100);
        }
        if (hitSun && collectGls) {
            bSun.kill();
        }

        if (finish) {
            isFinishLevel2 = true;
            game.state.start('PassLevel');
        }
        cursors = game.input.keyboard.createCursorKeys();
        player.body.velocity.x = 0;
        if (cursors.left.isDown) {
            player.body.velocity.x = -150;
            player.animations.play('left');
        } else if (cursors.right.isDown) {
            player.body.velocity.x = 150;
            player.animations.play('right');
        } else {
            player.animations.stop();
            player.frame = 5;
        }
        if (cursors.up.isDown && hitPlatform) {
            player.body.velocity.y = -150;
        }

    },
    collectGlasses: function (player, glasses) {
        glasses.kill();
        collectGls = true;
        this.infoText(message7, '20px', player.position.x - 150, 200, 380, 100);
    },
    collectWave: function (player, wave) {
        wave.kill();
    },
    showLives() {
        if (stars) {
            stars.kill();
            stars = game.add.group();
            stars.enableBody = true;
            stars.fixedToCamera = true;
            var w = 0;
            for (var i = 0; i < countLives; i++) {
                //  Create a star inside of the 'stars' group
                var star = stars.create(766 - w, 5, 'star');
                w += 22;
            }
        }
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
    infoText(txt, letterSize, x, y, width, height) {
        bar = game.add.graphics();
        bar.beginFill(0x003300, 0.4);
        bar.drawRect(x, y, width, height);
        var style = {
            font: letterSize + " Myriad",
            fill: "#fff",
            wordWrap: true,
            wordWrapWidth: width - 20,
            wordWrapHeight: height,
            align: "center",
        };
        text = game.add.text(10, 20, txt, style);
        text.setTextBounds(x, y, width, height);
        game.paused = true;
        closeBtn = game.add.button((x - 20) + width, y - 20, 'closeBtn', this.closeAdv, this, 1, 1, 0);
    },
    closeAdv: function () {
        // if (!isSuitCollected) {
        //     if (playerFire) {
        //         playerFire.kill();
        //     }
        //     bar.kill();
        //     text.kill();
        //     closeBtn.kill();
        //     game.paused = false;
        //     isInit = false;
        //     // countLives = 3;
        //     isSuitCollected = false;
        //     isPaused = false;
        //     spaceSuitPhysics = false;
        //     elementsCollected = 0;
        //     lLive = false;
        //     game.state.start('Level1');
        //     // this.resetPlayer(player.position.x - 50, player.position.y);
        // } else {
        bar.kill();
        text.kill();
        closeBtn.kill();
        game.paused = false;
        //     this.setSpaceSuit(219, 200);
        // }
    },
    setPlatforms: function (elements) {
        for (var i = 0; i < platformPositions.length; i++) {
            var platform = elements.create(platformPositions[i].x, platformPositions[i].y, 'platform');
            platform.body.immovable = true;
        }
    },
    render: function () {
        game.debug.text(player.position.x, 15, 18, "#2565e5");
    }
}
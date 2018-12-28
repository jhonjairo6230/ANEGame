var player, light, cursors, bordersWin, bordersLost, bar, text, initBtn, continueBtn, elements, spaceS, spaceSuit;
var isInit = false;
var isSuitCollected = false;
var isPaused = false;
var starts;
RutaEspectral.Level1 = function (game) {};
RutaEspectral.Level1.prototype = {
    preload: function () {
        game.load.image('background', 'assets/level1/backround.png');
        game.load.image('rocket', 'assets/level1/rocket.png');
        game.load.image('platform', 'assets/level1/platform.png');
        game.load.image('moon', 'assets/level1/moon.png');
        game.load.image('planet1', 'assets/level1/planet1.png');
        game.load.image('planet2', 'assets/level1/planet2.png');
        game.load.image('planet3', 'assets/level1/planet3.png');
        game.load.image('planet4', 'assets/level1/planet4.png');
        game.load.image('satellite', 'assets/level1/satelite.png');
        game.load.image('obstruction', 'assets/level1/obstruction.png');
        game.load.image('winFlag', 'assets/level1/winFlag.png');
        game.load.image('spaceSuit', 'assets/level1/spaceSuit.png');
        game.load.image('px', 'assets/pix.png');
        game.load.image('bgLives', 'assets/level1/bgLives.png');
        game.load.image('star', 'assets/star.png');
        game.load.spritesheet('playBtn', 'assets/buttons/play2Btn.png', 134, 78);
        game.load.spritesheet('continueBtn', 'assets/buttons/continueBtn.png', 136, 79);
    },
    create: function () {
        game.add.tileSprite(0, 0, 1340, 600, 'background');
        game.world.setBounds(0, 0, 1340, 600);
        game.renderer.roundPixels = true;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //Add planets
        elements = game.add.group();
        elements.enableBody = true;
        var monE = game.add.group();
        monE.enableBody = true;
        var moon = monE.create(game.world.width - 170, 1, 'moon');
        moon.body.immovable = true;
        var planet1 = elements.create(game.world.width - 300, 60, 'planet1');
        planet1.body.immovable = true;
        var planet2 = elements.create(450, 20, 'planet2');
        planet2.body.immovable = true;
        var planet3 = elements.create(700, 120, 'planet3');
        planet3.body.immovable = true;
        var planet4 = elements.create(1100, 550, 'planet4');
        planet4.body.immovable = true;
        var planet5 = elements.create(750, 0, 'satellite');
        planet5.body.immovable = true;
        var obstruction = elements.create(900, 300, 'obstruction');
        obstruction.body.immovable = true;
        obstruction = elements.create(500, 400, 'obstruction');
        obstruction.body.immovable = true;
        light = game.add.group();
        light.enableBody = true;
        var l = light.create(219, 500, 'px');
        for (var i = 220; i < 1050; i++) {
            l = light.create(i, 531, 'px');
            l.body.immovable = true;
            l = light.create(i, 100, 'px');
            l.body.immovable = true;
        }
        bordersWin = game.add.group();
        bordersWin.enableBody = true;
        bordersLost = game.add.group();
        bordersLost.enableBody = true;
        for (var i = 380; i < 400; i++) {
            var borderV = bordersWin.create(1338, i, 'px');
            borderV.body.immovable = true;
        }
        var winFlag = bordersWin.create(game.world.width - 36, 360, 'winFlag');
        winFlag.body.immovable = true;
        borderV.body.immovable = true;
        var stbackround = game.add.image(715, 0, 'bgLives');
        stbackround.fixedToCamera = true;
        stars = game.add.group();
        stars.enableBody = true;
        stars.fixedToCamera = true;
        spaceS = game.add.group();
        spaceS.enableBody = true;
        spaceSuit = spaceS.create(750, 200 + (Math.random() * (220 - 0) + 0), 'spaceSuit');
        spaceSuit.body.immovable = true;
        this.showLives();
        this.infoText("Sabias que el azul del cielo es una parte del espectro electromagnético,a que el cielo es un arco iris gigantesco, y el único color que vemos es el azul, pero encima de ese azul están todos los colores del arco iris, el rojo, el amarillo, verde, violeta. (luz visible)", 200, 550);
    },
    update: function () {
        var borderCollition = game.physics.arcade.collide(player, light);
        var suitCollition = game.physics.arcade.collide(player, spaceS);
        var lostLive = game.physics.arcade.collide(player, elements);
        var finishWin = game.physics.arcade.collide(player, bordersWin);
        var finishLost = game.physics.arcade.collide(player, bordersLost);
        if (finishWin && isSuitCollected) {
            game.state.start('Level2');
        } else if (finishWin) {
            game.paused = true;
            isPaused = true;
            this.resetPlayer();
            this.infoText("debes encontrar el traje espacial", 700, 300);
        }
        if (finishLost) {}
        if (isInit) {
            if (suitCollition) {
                spaceSuit.kill();
                isSuitCollected = true;
                game.paused = true;
                isPaused = true;
                this.infoText("¡Encontraste el traje espacial!\n por tu gran azaña ganaste una vida", 400, 300);
            }
            if (lostLive) {
                countLives -= 1;
                this.resetPlayer();
                this.showLives();
                if (countLives == 0) {
                    game.state.start('Level1');
                    isInit = false;
                    countLives = 3;
                }
            }
            player.body.velocity.x = 0;
            cursors = game.input.keyboard.createCursorKeys();
            if (cursors.left.isDown) {
                player.body.velocity.x = -velocityLevel1;
            }
            if (cursors.right.isDown) {
                player.body.velocity.x = velocityLevel1;
            }
            if (cursors.up.isDown) {
                player.body.velocity.y = -velocityLevel1;
            }
            if (cursors.down.isDown) {
                player.body.velocity.y = velocityLevel1;
            }
        }
    },
    infoText(txt, width, height) {
        bar = game.add.graphics();
        bar.beginFill(0x003300, 0.4);
        bar.drawRect(width - 20, 180, height + 20, 180);
        var style = {
            font: "20px Myriad pro",
            fill: "#fff",
            wordWrap: true,
            wordWrapWidth: 480,
            wordWrapHeight: 200,
            align: "center",
        };
        text = game.add.text(0, 0, txt, style);
        text.setTextBounds(width, 200, height, 200);
        if (!isPaused) {
            initBtn = game.add.button(380, 355, 'playBtn', this.initLevel, this, 1, 1, 0);
        } else {
            continueBtn = game.add.button(width + 90, 355, 'continueBtn', this.initLevel, this, 1, 1, 0);
        }
    },
    initLevel() {
        bar.kill();
        text.kill();
        if (!isPaused) {
            initBtn.kill();
            isInit = true;
            this.resetPlayer();
        } else {
            game.paused = false;
            isPaused = false;
            continueBtn.kill();
        }
    },
    resetPlayer() {
        if (player) {
            player.kill();
        }
        player = game.add.sprite(219, 200, 'rocket');
        game.physics.arcade.enable(player);
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 200;
        player.body.collideWorldBounds = true;
        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
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
    }
};
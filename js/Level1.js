var player, light, cursors, bordersWin, bordersLost, bar, text, initBtn, elements;
var isInit = false;
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
        game.load.image('px', 'assets/pix.png');
        game.load.image('star', 'assets/star.png');
        game.load.spritesheet('playBtn', 'assets/buttons/playBtn.png', 164, 79);
    },
    create: function () {
        game.add.tileSprite(0, 0, 1340, 600, 'background');
        game.world.setBounds(0, 0, 1340, 600);
        game.renderer.roundPixels = true;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //Add planets
        elements = game.add.group();
        elements.enableBody = true;
        var moon = elements.create(game.world.width - 229, 1, 'moon');
        moon.body.immovable = true;
        var planet1 = elements.create(game.world.width - 300, 120, 'planet1');
        planet1.body.immovable = true;
        var planet2 = elements.create(450, 20, 'planet2');
        planet2.body.immovable = true;
        var planet3 = elements.create(700, 120, 'planet3');
        planet3.body.immovable = true;
        var planet4 = elements.create(1100, 500, 'planet4');
        planet4.body.immovable = true;
        var planet5 = elements.create(750, 0, 'satellite');
        planet5.body.immovable = true;
        var obstruction = elements.create(1000, 300, 'obstruction');
        obstruction.body.immovable = true;
        obstruction = elements.create(600, 400, 'obstruction');
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
        var borderV = bordersWin.create(1338, 99, 'px');
        for (var i = 380; i < 400; i++) {
            borderV = bordersWin.create(1338, i, 'px');
            borderV.body.immovable = true;
        }
        for (var i = 0; i < 1339; i++) {
            var borderHB = bordersLost.create(i, 599, 'px');
            borderHB.body.immovable = true;
            var borderHT = bordersLost.create(i, 1, 'px');
            borderHT.body.immovable = true;
        }
        stars = game.add.group();
        stars.enableBody = true;
        stars.fixedToCamera = true;
        this.showLives();
        this.infoText("sabias que el azul del cielo es una parte del espectro electromagnético,a que el cielo es un arco iris gigantesco, y el único color que vemos es el azul, pero encima de ese azul están todos los colores del arco iris, el rojo, el amarillo, verde, violeta. (luz visible)");
    },
    update: function () {
        var borderCollition = game.physics.arcade.collide(player, light);
        var lostLive = game.physics.arcade.collide(player, elements);
        var finishWin = game.physics.arcade.collide(player, bordersWin);
        var finishLost = game.physics.arcade.collide(player, bordersLost);
        if (finishWin) {
            // game.state.start('Level2');
            title = game.add.text(1000, game.world.height / 2, 'Otro nivel', {
                fontSize: '25px',
                fill: '#ffabed',
                font: 'Myriad pro'
            });
        }
        if (finishLost) {
            title = game.add.text(1000, game.world.height / 2, 'Pierde', {
                fontSize: '25px',
                fill: '#ffabfe',
                font: 'Myriad pro'
            });
        }
        if (isInit) {
            if (lostLive) {
                countLives -= 1;
                this.resetPlayer();
                this.showLives();
                if (countLives == 0) {
                    game.state.start('Splash');
                    isInit = false;
                }
            }
            player.body.velocity.x = 0;
            cursors = game.input.keyboard.createCursorKeys();
            if (cursors.left.isDown) {
                player.body.velocity.x = -120;
            }
            if (cursors.right.isDown) {
                player.body.velocity.x = 120;
            }
            if (cursors.up.isDown) {
                player.body.velocity.y = -120;
            }
            if (cursors.down.isDown) {
                player.body.velocity.y = 120;
            }
        }

    },
    infoText(txt) {
        bar = game.add.graphics();
        bar.beginFill(0x003300, 0.2);
        bar.drawRect(200, 200, 500, 200);
        var style = {
            font: "20px Myriad pro",
            fill: "#fff",
            wordWrap: true,
            wordWrapWidth: 500,
            align: "center",
        };
        text = game.add.text(0, 0, txt, style);
        text.setTextBounds(200, 200, 500, 200);
        initBtn = game.add.button(380, 380, 'playBtn', this.initLevel, this, 1, 1, 0);
    },
    initLevel() {
        bar.kill();
        text.kill();
        initBtn.kill();
        isInit = true;
        this.resetPlayer();
    },
    resetPlayer() {
        if (player) {
            player.kill();
        }
        player = game.add.sprite(219, 200, 'rocket');
        game.physics.arcade.enable(player);
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
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
                var star = stars.create(776 - w, 0, 'star');
                w += 24;
            }
        }
    }
};
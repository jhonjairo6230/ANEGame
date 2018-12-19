var player;
var title;
var button;
var hair1, hair2, hair3;
var clicked = false;
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', {
    preload: preload,
    create: create,
    update: update
});

function preload() {
    for (var i = 0; i < 6; i++) {
        game.load.spritesheet('h' + i, 'assets/Hair1.png', 100, 100);
    }

    game.load.image('background', 'assets/background1.png');
    game.load.image('hair1', 'assets/avatarOptions/hair1.png');
    game.load.image('hair2', 'assets/avatarOptions/hair2.png');
    game.load.image('hair3', 'assets/avatarOptions/hair3.png');
    game.load.image('head2', 'assets/avatarOptions/head2.png');
    game.load.image('body1', 'assets/avatarOptions/body1.png');
    game.load.image('foot4', 'assets/avatarOptions/foot4.png');
    // game.load.spritesheet('astronauta', 'assets/astronauta.png', 105, 136);

}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'background');
    game.add.sprite(100, (game.world.height / 2) - 200, 'head2');
    hair3 = game.add.sprite(100, (game.world.height / 2) - 240, 'hair3');
    game.add.sprite(80, (game.world.height / 2) - 90, 'body1');
    //game.add.sprite(95, (game.world.height / 2) + 30, 'foot4');
    // player = game.add.sprite(100, game.world.height / 2, 'astronauta');
    // game.physics.arcade.enable(player);

    title = game.add.text(16, 16, 'Configura tu avatar: ', {
        fontSize: '32px',
        fill: '#fff'
    });
    button = game.add.button((game.world.width / 2) + 100, 100, 'h0', actionOnClick0, this, 2, 1, 0);
    button = game.add.button((game.world.width / 2) + 220, 100, 'h1', actionOnClick1, this, 2, 1, 0);
    button = game.add.button((game.world.width / 2) + 100, 220, 'h2', actionOnClick2, this, 2, 1, 0);
    button = game.add.button((game.world.width / 2) + 220, 220, 'h3', actionOnClick1, this, 2, 1, 0);
    button = game.add.button((game.world.width / 2) + 100, 340, 'h4', actionOnClick1, this, 2, 1, 0);
    button = game.add.button((game.world.width / 2) + 220, 340, 'h5', actionOnClick1, this, 2, 1, 0);
}

function update() {
    //var hitPlatform = game.physics.arcade.collide(player, platforms);
    //player.frame = 5;
}

function actionOnClick0() {
    if (hair3) {
        hair3.kill()
    }
    if (hair2) {
        hair2.kill();
    }
    if (hair1) {
        hair1.kill();
    }
    hair1 = game.add.sprite(85, (game.world.height / 2) - 225, 'hair1');
}

function actionOnClick1() {
    if (hair3) {
        hair3.kill()
    }
    if (hair2) {
        hair2.kill();
    }
    if (hair1) {
        hair1.kill();
    }
    hair2 = game.add.sprite(99, (game.world.height / 2) - 200, 'hair2');
}

function actionOnClick2() {
    if (hair3) {
        hair3.kill()
    }
    if (hair2) {
        hair2.kill();
    }
    if (hair1) {
        hair1.kill();
    }
    hair3 = game.add.sprite(100, (game.world.height / 2) - 240, 'hair3');
}
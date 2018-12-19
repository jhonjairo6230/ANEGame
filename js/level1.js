var player;
var title;
var button;
var hair1, hair2, hair3, hair4, hair5, hair6;
var head2;
var body1;
var menuBtn0, menuBtn1, menuBtn2, menuBtn3, backBtn;
var clicked = false;
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', {
    preload: preload,
    create: create,
    update: update
});

function preload() {
    for (var i = 0; i < 4; i++) {
        game.load.spritesheet('menuBtn' + i, 'assets/buttons/menuBtn' + i + '.png', 100, 50);
    }
    for (var i = 0; i < 6; i++) {
        game.load.spritesheet('h' + i, 'assets/Hair1.png', 100, 100);
    }
    game.load.spritesheet('backBtn', 'assets/buttons/backBtn.png', 200, 102);
    game.load.image('background', 'assets/background1.png');
    game.load.image('hair1', 'assets/avatarOptions/hair1.png');
    game.load.image('hair2', 'assets/avatarOptions/hair2.png');
    game.load.image('hair3', 'assets/avatarOptions/hair3.png');
    game.load.image('hair4', 'assets/avatarOptions/hair4.png');
    game.load.image('hair5', 'assets/avatarOptions/hair5.png');
    game.load.image('hair6', 'assets/avatarOptions/hair6.png');
    game.load.image('head2', 'assets/avatarOptions/head2.png');
    game.load.image('body1', 'assets/avatarOptions/body1.png');
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'background');
    head2 = game.add.sprite(100, (game.world.height / 2) - 200, 'head2');
    hair3 = game.add.sprite(100, (game.world.height / 2) - 240, 'hair3');
    body1 = game.add.sprite(80, (game.world.height / 2) - 90, 'body1');
    title = game.add.text(16, 16, 'Configura tu avatar: ', {
        fontSize: '32px',
        fill: '#fff'
    });
    initMainMenuBtns();
}

function initMainMenuBtns() {
    menuBtn0 = game.add.button((game.world.width / 2) + 100, 170, 'menuBtn0', hairAction, this, 2, 1, 0);
    menuBtn1 = game.add.button((game.world.width / 2) + 100, 230, 'menuBtn1', skinAction, this, 2, 1, 0);
    menuBtn2 = game.add.button((game.world.width / 2) + 100, 290, 'menuBtn2', genderAction, this, 2, 1, 0);
    menuBtn3 = game.add.button((game.world.width / 2) + 100, 350, 'menuBtn3', eyesAction, this, 2, 1, 0);
}

function update() {
    //var hitPlatform = game.physics.arcade.collide(player, platforms);
    //player.frame = 5;
}

function hairAction() {
    menuBtn0.kill();
    menuBtn1.kill();
    menuBtn2.kill();
    menuBtn3.kill();
    initHairMenuBtns();
}

function initHairMenuBtns() {
    h0 = game.add.button((game.world.width / 2) + 100, 100, 'h0', actionHair0, this, 2, 1, 0);
    h1 = game.add.button((game.world.width / 2) + 220, 100, 'h1', actionHair1, this, 2, 1, 0);
    h2 = game.add.button((game.world.width / 2) + 100, 220, 'h2', actionHair2, this, 2, 1, 0);
    h3 = game.add.button((game.world.width / 2) + 220, 220, 'h3', actionHair3, this, 2, 1, 0);
    h4 = game.add.button((game.world.width / 2) + 100, 340, 'h4', actionHair4, this, 2, 1, 0);
    h5 = game.add.button((game.world.width / 2) + 220, 340, 'h5', actionHair5, this, 2, 1, 0);
    backBtn = game.add.button((game.world.width / 2) + 100, 460, 'backBtn', backAction, this, 2, 1, 0);
}

function backAction() {
    h0.kill();
    h1.kill();
    h2.kill();
    h3.kill();
    h4.kill();
    h5.kill();
    backBtn.kill();
    initMainMenuBtns();
}

function skinAction() {}

function genderAction() {}

function eyesAction() {}

function actionHair0() {
    deleteAllHairs();
    hair1 = game.add.sprite(85, (game.world.height / 2) - 225, 'hair1');
}

function actionHair1() {
    deleteAllHairs();
    hair2 = game.add.sprite(99, (game.world.height / 2) - 200, 'hair2');
}

function actionHair2() {
    deleteAllHairs();
    hair3 = game.add.sprite(100, (game.world.height / 2) - 240, 'hair3');
}

function actionHair3() {
    deleteAllHairs();
    hair4 = game.add.sprite(60, (game.world.height / 2) - 235, 'hair4');
}

function actionHair4() {
    deleteAllHairs();
    hair5 = game.add.sprite(74, (game.world.height / 2) - 225, 'hair5');
    body1 = game.add.sprite(80, (game.world.height / 2) - 90, 'body1');
}

function actionHair5() {
    deleteAllHairs();
    body1.kill();
    hair6 = game.add.sprite(100, (game.world.height / 2) - 205, 'hair6');
}

function deleteAllHairs() {
    if (hair1) {
        hair1.kill();
    }
    if (hair2) {
        hair2.kill();
    }
    if (hair3) {
        hair3.kill();
    }
    if (hair4) {
        hair4.kill();
    }
    if (hair5) {
        hair5.kill();
    }
    if (hair6) {
        hair6.kill();
    }
}
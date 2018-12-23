var player;
var title;
var subtitle;
var button;
var headBtn0, headBtn1, headBtn2, headBtn3;
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
    // for (var i = 0; i < 4; i++) {
    //     game.load.spritesheet('menuBtn' + i, 'assets/buttons/menuBtn' + i + '.png', 100, 50);
    // }
    for (var i = 0; i < 4; i++) {
        game.load.spritesheet('headBtn' + i, 'assets/buttons/Head' + i + '.png', 100, 100);
        game.load.image('head' + i, 'assets/avatarOptions/head' + i + '.png');
    }
    //game.load.spritesheet('backBtn', 'assets/buttons/backBtn.png', 200, 102);
    game.load.spritesheet('playBtn', 'assets/buttons/playBtn.png', 200, 102);
    game.load.image('background', 'assets/backgrounds/Background1.png');
    game.load.image('hair1', 'assets/avatarOptions/hair1.png');
    game.load.image('hair2', 'assets/avatarOptions/hair2.png');
    game.load.image('hair3', 'assets/avatarOptions/hair3.png');
    game.load.image('hair4', 'assets/avatarOptions/hair4.png');
    game.load.image('hair5', 'assets/avatarOptions/hair5.png');
    game.load.image('hair6', 'assets/avatarOptions/hair6.png');

    game.load.image('body1', 'assets/avatarOptions/body1.png');
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'background');
    head0 = game.add.sprite(170, 140, 'head0');
    hair3 = game.add.sprite(150, 80, 'hair3');
    body1 = game.add.sprite(150, 220, 'body1');
    title = game.add.text(400, 17, 'Arma tu personaje', {
        fontSize: '40px',
        fill: '#40abed'
    });
    subtitle = game.add.text(500, 60, 'comencemos nuestra aventura', {
        fontSize: '20px',
        fill: '#fff'
    });
    optionsBtns();
    //game.add.button(50, game.world.height - 120, 'playBtn', playAction, this, 2, 1, 0);
    //initMainMenuBtns();
}

function optionsBtns() {
    game.add.button(400, 100, 'headBtn0', actionHead, this, 2, 1, 0);
    game.add.button(500, 100, 'headBtn1', actionHead, this, 2, 1, 0);
    game.add.button(400, 200, 'headBtn2', actionHead, this, 2, 1, 0);
    game.add.button(500, 200, 'headBtn3', actionHead, this, 2, 1, 0);
}


function update() {}

function playAction() {}

function actionHead(e) {
    console.log('clave:' + e.key);
    deleteAllHead();
    switch (e.key) {
        case 'headBtn0':
            head0 = game.add.sprite(170, 140, 'head0');
            break;
        case 'headBtn1':
            head1 = game.add.sprite(170, 140, 'head1');
            break;
        case 'headBtn2':
            head2 = game.add.sprite(170, 140, 'head2');
            break;
        case 'headBtn3':
            head3 = game.add.sprite(170, 140, 'head3');
            break;
        default:
            break;
    }
}

function deleteAllHead() {
    if (headBtn0) {
        headBtn0.kill();
    }
    if (headBtn1) {
        headBtn1.kill();
    }
    if (headBtn2) {
        headBtn2.kill();
    }
    if (headBtn3) {
        headBtn3.kill();
    }
}
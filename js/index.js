var player;
var title;
var subtitle;
var initPosBtnX = 400,
    initPosBtnY = 110,
    distanceBtn = 80,
    distanceSectionBtn = 5;
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
    for (var i = 0; i < 6; i++) {
        if (i < 2) {
            game.load.spritesheet('coatBtn' + i, 'assets/buttons/CoatBtn' + i + '.png', 75, 75);
            //game.load.spritesheet('coatBtn' + i, 'assets/buttons/CoatBtn' + i + '.png', 75, 100);

            game.load.spritesheet('pantBtn' + i, 'assets/buttons/PantBtn' + i + '.png', 75, 75);
            //game.load.spritesheet('pantBtn' + i, 'assets/buttons/PantBtn' + i + '.png', 75, 75);

            game.load.spritesheet('skirtBtn' + i, 'assets/buttons/SkirtBtn' + i + '.png', 75, 75);

            game.load.spritesheet('wcoatBtn' + i, 'assets/buttons/WcoatBtn' + i + '.png', 75, 75);
        }
        if (i < 4) {
            game.load.spritesheet('headBtn' + i, 'assets/buttons/HeadBtn' + i + '.png', 75, 75);
            game.load.image('head' + i, 'assets/avatarOptions/head' + i + '.png');
        }
        if (i < 6) {
            game.load.spritesheet('hairBtn' + i, 'assets/buttons/HairBtn' + i + '.png', 75, 75);
        }
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
    //head Buttons
    game.add.button(initPosBtnX, initPosBtnY, 'headBtn0', actionHead, this, 2, 1, 0);
    game.add.button(initPosBtnX + distanceBtn, initPosBtnY, 'headBtn1', actionHead, this, 2, 1, 0);
    game.add.button(initPosBtnX, initPosBtnY + distanceBtn, 'headBtn2', actionHead, this, 2, 1, 0);
    game.add.button(initPosBtnX + distanceBtn, initPosBtnY + distanceBtn, 'headBtn3', actionHead, this, 2, 1, 0);
    //Coat Buttons
    game.add.button(initPosBtnX, initPosBtnY + distanceSectionBtn + (2 * distanceBtn), 'coatBtn0', actionCoat, this, 2, 1, 0);
    game.add.button(initPosBtnX + distanceBtn, initPosBtnY + distanceSectionBtn + (2 * distanceBtn), 'coatBtn1', actionCoat, this, 2, 1, 0);
    //pant Buttons
    game.add.button(initPosBtnX, initPosBtnY + (distanceSectionBtn * 2) + (3 * distanceBtn), 'pantBtn0', actionPant, this, 2, 1, 0);
    game.add.button(initPosBtnX + distanceBtn, initPosBtnY + (distanceSectionBtn * 2) + (3 * distanceBtn), 'pantBtn1', actionPant, this, 2, 1, 0);
    //hair Bbuttons
    game.add.button(initPosBtnX + (2 * distanceBtn) + distanceSectionBtn, initPosBtnY, 'hairBtn0', actionHair, this, 2, 1, 0);
    game.add.button(initPosBtnX + (3 * distanceBtn) + distanceSectionBtn, initPosBtnY, 'hairBtn1', actionPant, this, 2, 1, 0);
    game.add.button(initPosBtnX + (4 * distanceBtn) + distanceSectionBtn, initPosBtnY, 'hairBtn2', actionPant, this, 2, 1, 0);
    game.add.button(initPosBtnX + (2 * distanceBtn) + distanceSectionBtn, initPosBtnY + distanceBtn, 'hairBtn3', actionPant, this, 2, 1, 0);
    game.add.button(initPosBtnX + (3 * distanceBtn) + distanceSectionBtn, initPosBtnY + distanceBtn, 'hairBtn4', actionPant, this, 2, 1, 0);
    game.add.button(initPosBtnX + (4 * distanceBtn) + distanceSectionBtn, initPosBtnY + distanceBtn, 'hairBtn5', actionPant, this, 2, 1, 0);
    //WCoat Buttons
    game.add.button(initPosBtnX + (2 * distanceBtn) + distanceSectionBtn, initPosBtnY + distanceSectionBtn + (2 * distanceBtn), 'wcoatBtn0', actionPant, this, 2, 1, 0);
    game.add.button(initPosBtnX + (3 * distanceBtn) + distanceSectionBtn, initPosBtnY + distanceSectionBtn + (2 * distanceBtn), 'wcoatBtn1', actionPant, this, 2, 1, 0);
    //Skirt Buttons
    game.add.button(initPosBtnX + (2 * distanceBtn) + distanceSectionBtn, initPosBtnY + (distanceSectionBtn * 2) + (3 * distanceBtn), 'skirtBtn0', actionPant, this, 2, 1, 0);
    game.add.button(initPosBtnX + (3 * distanceBtn) + distanceSectionBtn, initPosBtnY + (distanceSectionBtn * 2) + (3 * distanceBtn), 'skirtBtn1', actionPant, this, 2, 1, 0);
}


function update() {}

function playAction() {}

function actionHair(e) {

}

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

function actionCoat(e) {
    console.log('clave:' + e.key);
    //deleteAllHead();
    switch (e.key) {
        case 'coatBtn0':
            head0 = game.add.sprite(170, 140, 'head0');
            break;
        case 'coatBtn1':
            head1 = game.add.sprite(170, 140, 'head1');
            break;
        default:
            break;
    }
}

function actionPant(e) {
    console.log('clave:' + e.key);
    //deleteAllHead();
    switch (e.key) {
        case 'pantBtn0':
            head0 = game.add.sprite(170, 140, 'head0');
            break;
        case 'pantBtn1':
            head1 = game.add.sprite(170, 140, 'head1');
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
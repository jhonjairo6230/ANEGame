var player;
var title;
var subtitle;
var buttonPosition = {
    initPosBtnX: 400,
    initPosBtnY: 110,
    distanceBtn: 80,
    distanceSectionBtn: 5
};

var buttonSize = {
    width: 75,
    height: 75
};

var hairPositions = {
    hx0: 150,
    hy0: 120,
    hx1: 130,
    hy1: 115,
    hx2: 160,
    hy2: 140,
    hx3: 140,
    hy3: 112,
    hx4: 165,
    hy4: 140,
    hx5: 165,
    hy5: 110
}
var armPostions = {
    ax0: 140,
    ay0: 230,
    ax1: 120,
    ay1: 230,
    ax2: 145,
    ay2: 230,
    ax3: 145,
    ay3: 230
}

var footPositions = {
    fx0: 160,
    fy0: 325,
    fx1: 173,
    fy1: 325,
    fx2: 155,
    fy2: 320,
    fx3: 155,
    fy3: 320
}

var headPositions = {
    headX0: 170,
    headY0: 150,
    headX1: 170,
    headY1: 150,
    headX2: 170,
    headY2: 150,
    headX3: 170,
    headY3: 150
}

var headBtn0, headBtn1, headBtn2, headBtn3;
var head0, head1, head2, head3, hair0, hair1, hair2, hair3, hair4, hair5;

var headSelected, hairSelected, footSelected, armSelected;

var foot0, arm0;
var menuBtn0, menuBtn1, menuBtn2, menuBtn3, backBtn;
var clicked = false;
// var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', {
//     preload: preload,
//     create: create,
//     update: update
// });
RutaEspectral.AvatarConfig = function (game) {};
RutaEspectral.AvatarConfig.prototype = {
    preload: function () {
        for (var i = 0; i < 6; i++) {
            if (i < 4) {
                game.load.spritesheet('footBtn' + i, 'assets/buttons/FootBtn' + i + '.png', buttonSize.width, buttonSize.height);
                game.load.image('foot' + i, 'assets/avatarOptions/foot' + i + '.png');

                game.load.spritesheet('armBtn' + i, 'assets/buttons/ArmBtn' + i + '.png', buttonSize.width, buttonSize.height);
                game.load.image('arm' + i, 'assets/avatarOptions/arm' + i + '.png');

                game.load.spritesheet('headBtn' + i, 'assets/buttons/HeadBtn' + i + '.png', buttonSize.width, buttonSize.height);
                game.load.image('head' + i, 'assets/avatarOptions/head' + i + '.png');
            }
            if (i < 6) {
                game.load.spritesheet('hairBtn' + i, 'assets/buttons/HairBtn' + i + '.png', buttonSize.width, buttonSize.height);
                game.load.image('hair' + i, 'assets/avatarOptions/hair' + i + '.png');
            }
        }
        game.load.image('background', 'assets/backgrounds/Background1.png');
    },
    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0, 0, 'background');

        head0 = game.add.sprite(headPositions.headX0, headPositions.headY0, 'head0');
        headSelected = head0;
        foot0 = game.add.sprite(footPositions.fx3, footPositions.fy3, 'foot3');
        footSelected = foot0
        arm0 = game.add.sprite(armPostions.ax0, armPostions.ay0, 'arm0');
        armSelected = arm0;
        hair0 = game.add.sprite(hairPositions.hx0, hairPositions.hy0, 'hair0');
        hairSelected = hair0;
        title = game.add.text(400, 17, 'Arma tu personaje', {
            fontSize: '40px',
            fill: '#40abed',
            font: 'Myriad pro'
        });
        subtitle = game.add.text(500, 60, 'comencemos nuestra aventura', {
            fontSize: '20px',
            fill: '#fff',
            font: 'Myriad pro'
        });
        this.optionsBtns();
    },
    optionsBtns: function () {
        //head Buttons
        game.add.button(buttonPosition.initPosBtnX, buttonPosition.initPosBtnY, 'headBtn0', this.actionHead, this, 1, 1, 0);
        game.add.button(buttonPosition.initPosBtnX + buttonPosition.distanceBtn, buttonPosition.initPosBtnY, 'headBtn1', this.actionHead, this, 1, 1, 0);
        game.add.button(buttonPosition.initPosBtnX, buttonPosition.initPosBtnY + buttonPosition.distanceBtn, 'headBtn2', this.actionHead, this, 1, 1, 0);
        game.add.button(buttonPosition.initPosBtnX + buttonPosition.distanceBtn, buttonPosition.initPosBtnY + buttonPosition.distanceBtn, 'headBtn3', this.actionHead, this, 1, 1, 0);
        //arm Buttons
        game.add.button(buttonPosition.initPosBtnX, buttonPosition.initPosBtnY + buttonPosition.distanceSectionBtn + (2 * buttonPosition.distanceBtn), 'armBtn0', this.actionArm, this, 1, 1, 0);
        game.add.button(buttonPosition.initPosBtnX + buttonPosition.distanceBtn, buttonPosition.initPosBtnY + buttonPosition.distanceSectionBtn + (2 * buttonPosition.distanceBtn), 'armBtn1', this.actionArm, this, 1, 1, 0);
        game.add.button(buttonPosition.initPosBtnX + (2 * buttonPosition.distanceBtn) + buttonPosition.distanceSectionBtn, buttonPosition.initPosBtnY + buttonPosition.distanceSectionBtn + (2 * buttonPosition.distanceBtn), 'armBtn2', this.actionArm, this, 1, 1, 0);
        game.add.button(buttonPosition.initPosBtnX + (3 * buttonPosition.distanceBtn) + buttonPosition.distanceSectionBtn, buttonPosition.initPosBtnY + buttonPosition.distanceSectionBtn + (2 * buttonPosition.distanceBtn), 'armBtn3', this.actionArm, this, 1, 1, 0);
        //foot Buttons
        game.add.button(buttonPosition.initPosBtnX, buttonPosition.initPosBtnY + (buttonPosition.distanceSectionBtn * 2) + (3 * buttonPosition.distanceBtn), 'footBtn0', this.actionFoot, this, 1, 1, 0);
        game.add.button(buttonPosition.initPosBtnX + buttonPosition.distanceBtn, buttonPosition.initPosBtnY + (buttonPosition.distanceSectionBtn * 2) + (3 * buttonPosition.distanceBtn), 'footBtn1', this.actionFoot, this, 1, 1, 0);
        game.add.button(buttonPosition.initPosBtnX + (2 * buttonPosition.distanceBtn) + buttonPosition.distanceSectionBtn, buttonPosition.initPosBtnY + (buttonPosition.distanceSectionBtn * 2) + (3 * buttonPosition.distanceBtn), 'footBtn2', this.actionFoot, this, 1, 1, 0);
        game.add.button(buttonPosition.initPosBtnX + (3 * buttonPosition.distanceBtn) + buttonPosition.distanceSectionBtn, buttonPosition.initPosBtnY + (buttonPosition.distanceSectionBtn * 2) + (3 * buttonPosition.distanceBtn), 'footBtn3', this.actionFoot, this, 1, 1, 0);
        //hair Buttons
        game.add.button(buttonPosition.initPosBtnX + (2 * buttonPosition.distanceBtn) + buttonPosition.distanceSectionBtn, buttonPosition.initPosBtnY, 'hairBtn0', this.actionHair, this, 1, 1, 0);
        game.add.button(buttonPosition.initPosBtnX + (3 * buttonPosition.distanceBtn) + buttonPosition.distanceSectionBtn, buttonPosition.initPosBtnY, 'hairBtn1', this.actionHair, this, 1, 1, 0);
        game.add.button(buttonPosition.initPosBtnX + (4 * buttonPosition.distanceBtn) + buttonPosition.distanceSectionBtn, buttonPosition.initPosBtnY, 'hairBtn2', this.actionHair, this, 1, 1, 0);
        game.add.button(buttonPosition.initPosBtnX + (2 * buttonPosition.distanceBtn) + buttonPosition.distanceSectionBtn, buttonPosition.initPosBtnY + buttonPosition.distanceBtn, 'hairBtn3', this.actionHair, this, 1, 1, 0);
        game.add.button(buttonPosition.initPosBtnX + (3 * buttonPosition.distanceBtn) + buttonPosition.distanceSectionBtn, buttonPosition.initPosBtnY + buttonPosition.distanceBtn, 'hairBtn4', this.actionHair, this, 1, 1, 0);
        game.add.button(buttonPosition.initPosBtnX + (4 * buttonPosition.distanceBtn) + buttonPosition.distanceSectionBtn, buttonPosition.initPosBtnY + buttonPosition.distanceBtn, 'hairBtn5', this.actionHair, this, 1, 1, 0);
    },


    update: function () {},

    playAction: function () {},

    actionHair: function (e) {
        hairSelected.kill();
        switch (e.key) {
            case 'hairBtn0':
                hair0 = game.add.sprite(hairPositions.hx0, hairPositions.hy0, 'hair0');
                hairSelected = hair0;
                break;
            case 'hairBtn1':
                hair1 = game.add.sprite(hairPositions.hx1, hairPositions.hy1, 'hair1');
                hairSelected = hair1;
                break;
            case 'hairBtn2':
                hair2 = game.add.sprite(hairPositions.hx2, hairPositions.hy2, 'hair2');
                hairSelected = hair2;
                break;
            case 'hairBtn3':
                hair3 = game.add.sprite(hairPositions.hx3, hairPositions.hy3, 'hair3');
                hairSelected = hair3;
                armSelected.kill();
                armSelected = game.add.sprite(armSelected.position.x, armSelected.position.y, armSelected.key);
                break;
            case 'hairBtn4':
                hair4 = game.add.sprite(hairPositions.hx4, hairPositions.hy4, 'hair4');
                hairSelected = hair4;
                break;
            case 'hairBtn5':
                hair5 = game.add.sprite(hairPositions.hx5, hairPositions.hy5, 'hair5');
                hairSelected = hair5;
                break;
            default:
                break;
        }
    },
    actionHead: function (e) {
        headSelected.kill();
        switch (e.key) {
            case 'headBtn0':
                head0 = game.add.sprite(headPositions.headX0, headPositions.headY0, 'head0');
                headSelected = head0;
                break;
            case 'headBtn1':
                head1 = game.add.sprite(headPositions.headX1, headPositions.headY1, 'head1');
                headSelected = head1;
                break;
            case 'headBtn2':
                head2 = game.add.sprite(headPositions.headX2, headPositions.headY2, 'head2');
                headSelected = head2;
                break;
            case 'headBtn3':
                head3 = game.add.sprite(headPositions.headX3, headPositions.headY3, 'head3');
                headSelected = head3;
                break;
            default:
                break;
        }
        hairSelected.kill();
        hairSelected = game.add.sprite(hairSelected.position.x, hairSelected.position.y, hairSelected.key);
    },
    actionArm: function (e) {
        armSelected.kill();
        switch (e.key) {
            case 'armBtn0':
                arm0 = game.add.sprite(armPostions.ax0, armPostions.ay1, 'arm0');
                armSelected = arm0;
                break;
            case 'armBtn1':
                arm1 = game.add.sprite(armPostions.ax1, armPostions.ay1, 'arm1');
                armSelected = arm1;
                break;
            case 'armBtn2':
                arm2 = game.add.sprite(armPostions.ax2, armPostions.ay2, 'arm2');
                armSelected = arm2;
                break;
            case 'armBtn3':
                arm3 = game.add.sprite(armPostions.ax3, armPostions.ay3, 'arm3');
                armSelected = arm3;
                break;
            default:
                break;
        }
    },
    actionFoot: function (e) {
        footSelected.kill()
        switch (e.key) {
            case 'footBtn0':
                foot0 = game.add.sprite(footPositions.fx0, footPositions.fy0, 'foot0');
                footSelected = foot0;
                break;
            case 'footBtn1':
                foot1 = game.add.sprite(footPositions.fx1, footPositions.fy1, 'foot1');
                footSelected = foot1;
                break;
            case 'footBtn2':
                foot2 = game.add.sprite(footPositions.fx2, footPositions.fy2, 'foot2');
                footSelected = foot2;
                armSelected.kill();
                armSelected = game.add.sprite(armSelected.position.x, armSelected.position.y, armSelected.key);
                break;
            case 'footBtn3':
                foot3 = game.add.sprite(footPositions.fx3, footPositions.fy3, 'foot3');
                footSelected = foot3;
                armSelected.kill();
                armSelected = game.add.sprite(armSelected.position.x, armSelected.position.y, armSelected.key);
                break;
            default:
                break;
        }
    }
}
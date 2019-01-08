var bar, initBtn, continueBtn, closeBtn;
var isInitLVL1 = false;
var isSuitCollected = false,
    isPaused = false,
    spaceA, spaceSuitPhysics = false,
    collected = false,
    lLive = false;
var starts, stbackround, bar;
var helmet, body, arm1, arm2, pant, foot1, foot2;
var elementsCollected = 0;
var randomObstructions = (Math.floor(Math.random() * (60 - 50) + 50));

var infoText = function (txt, letterSize, x, y, width, height, action) {
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
    var btn = game.add.button((x - 20) + width, y - 20, 'closeBtn', this.closeTextInfo, this, 1, 1, 0);
    btn.onInputUp.add(action, this);
};
var closeTextInfo = function (e) {
    bar.kill();
    text.kill();
    e.kill();
};
var startTimer = function (minute, seconds) {
    timerL1 = game.time.create(false);
    timerEvent = timerL1.add(Phaser.Timer.MINUTE * minute + Phaser.Timer.SECOND * seconds, this.endTimer, this);
    timerL1.start();
};

//************************************** */
//************************************** */
//***************LEVEL 1**************** */
//************************************** */
//************************************** */
var closeAdvLvl1 = function (e) {
    document.getElementById("click").play();
    if (!isSuitCollected) {
        if (playerFire) {
            playerFire.kill();
        }
        game.paused = false;
        isInitLVL1 = false;
        isSuitCollected = false;
        isPaused = false;
        spaceSuitPhysics = false;
        elementsCollected = 0;
        lLive = false;
        game.state.start('Level1');
    } else {
        game.paused = false;
        this.setSpaceSuit(7800, 350);
    }
};
var initLevel1 = function (e) {
    document.getElementById("click").play();
    if (!isPaused) {
        isInitLVL1 = true;
        this.resetPlayer(200, 200);
        this.startTimer(minuteConfig, secondsConfig);
    } else {
        game.paused = false;
        isPaused = false;
        countLives += 1;
        this.showLives();
        this.setSpaceSuit(player.position.x, player.position.y);
        player.kill();
        realPlayer.kill();
        spaceSuitPhysics = true;
    }
};

var resetPlayer = function (x, y) {
    if (player) {
        player.kill();
    }
    if (realPlayer) {
        realPlayer.kill();
    }
    player = game.add.sprite(x, y, 'rocket');
    realPlayer = game.add.sprite(x + 20, y - 5, 'px');
    game.physics.arcade.enable(player);
    game.physics.arcade.enable(realPlayer);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 200;
    realPlayer.body.bounce.y = 0.2;
    realPlayer.body.gravity.y = 200;
    player.body.collideWorldBounds = true;
    realPlayer.body.collideWorldBounds = true;
    game.camera.follow(realPlayer, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    cursors = game.input.keyboard.createCursorKeys();
};
var showLives = function () {
    if (stars) {
        stars.kill();
        stars = game.add.group();
        stars.enableBody = true;
        stars.fixedToCamera = true;
        var w = 0;
        for (var i = 0; i < countLives; i++) {
            var star = stars.create(766 - w, 5, 'star');
            w += 22;
        }
    }
};
var render = function () {
    if (isInitLVL1) {
        if (timerL1.running) {
            timeRest = this.formatTime(Math.round((timerEvent.delay - timerL1.ms) / 1000));
            game.debug.text(this.formatTime(Math.round((timerEvent.delay - timerL1.ms) / 1000)), 15, 18, "#2565e5");
        } else {
            isInitLVL1 = false;
            spaceSuitPhysics = false;
            game.state.start('Level1');
        }
    }
};
var endTimer = function () {
    timerL1.stop();
};
var formatTime = function (s) {
    var minutes = "0" + Math.floor(s / 60);
    var seconds = "0" + (s - minutes * 60);
    return minutes.substr(-2) + ":" + seconds.substr(-2);
};
var setSpaceSuit = function (x, y) {
    spaceA = game.add.sprite(x, y, 'spriteA');
    spaceA.animations.add('right', [7, 8, 9, 10], 8, true);
    spaceA.animations.add('left', [0, 1, 2, 3], 8, true);
    game.physics.arcade.enable(spaceA);
    spaceA.body.bounce.y = 0.4;
    spaceA.body.gravity.y = 300;
    spaceA.body.collideWorldBounds = true;
    game.camera.follow(spaceA, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
};

var addSpaceSuit = function (spaceS) {
    for (var i = 0; i < spaceSuit.length; i++) {
        var ss = spaceS.create(spaceSuit[i].x, spaceSuit[i].y, 'part' + i);
        ss.body.inmovable = true;
    }
};
var collectSuit = function (player, suitS) {
    for (var i = 0; i < spaceSuit.length; i++) {
        if (suitS.key == "part" + i) {
            suitS.kill();
            elementsCollected += 1;
            buildSpaceSuit(i);
        }
    }
    if (elementsCollected == 7) {
        collected = true;
    } else {
        collected = false;
    }
};
var addObstructions = function () {
    switch (levelState) {
        case 1:
            for (var i = 0; i < 5; i++) {
                var obstruction1 = elements.create(400 + (i * 400), 20, 'obstructionGroup');
                obstruction1.body.immovable = true;
                game.physics.enable(obstruction1, Phaser.Physics.ARCADE);
                obstruction1.body.velocity.setTo(-10, 100);
                obstruction1.body.collideWorldBounds = true;
                obstruction1.body.bounce.set(0.4);
                var obstruction1 = elements.create(700 + (i * 600), 20, 'obstruction1');
                obstruction1.body.immovable = true;
                game.physics.enable(obstruction1, Phaser.Physics.ARCADE);
                obstruction1.body.velocity.setTo(-10, 100);
                obstruction1.body.collideWorldBounds = true;
                obstruction1.body.bounce.set(0.4);
                var obstruction1 = elements.create(800 + (i * 580), 20, 'obstruction2');
                obstruction1.body.immovable = true;
                game.physics.enable(obstruction1, Phaser.Physics.ARCADE);
                obstruction1.body.velocity.setTo(-10, 100);
                obstruction1.body.collideWorldBounds = true;
                obstruction1.body.bounce.set(0.4);
            }
            for (var i = 5; i < 10; i++) {
                var obstruction1 = elements.create(400 + (i * 400), 20, 'obstructionGroup');
                obstruction1.body.immovable = true;
                game.physics.enable(obstruction1, Phaser.Physics.ARCADE);
                obstruction1.body.velocity.setTo(10, 100);
                obstruction1.body.collideWorldBounds = true;
                obstruction1.body.bounce.set(0.3);
                var obstruction1 = elements.create(700 + (i * 600), 20, 'obstruction1');
                obstruction1.body.immovable = true;
                game.physics.enable(obstruction1, Phaser.Physics.ARCADE);
                obstruction1.body.velocity.setTo(-10, 100);
                obstruction1.body.collideWorldBounds = true;
                obstruction1.body.bounce.set(0.5);
                var obstruction1 = elements.create(800 + (i * 580), 20, 'obstruction2');
                obstruction1.body.immovable = true;
                game.physics.enable(obstruction1, Phaser.Physics.ARCADE);
                obstruction1.body.velocity.setTo(-10, 100);
                obstruction1.body.collideWorldBounds = true;
                obstruction1.body.bounce.set(0.5);
            }
            for (var i = 15; i < 20; i++) {
                var obstruction1 = elements.create(400 + (i * 400), 20, 'obstructionGroup');
                obstruction1.body.immovable = true;
                game.physics.enable(obstruction1, Phaser.Physics.ARCADE);
                obstruction1.body.velocity.setTo(-10, 100);
                obstruction1.body.collideWorldBounds = true;
                obstruction1.body.bounce.set(0.4);
                var obstruction1 = elements.create(700 + (i * 600), 20, 'obstruction1');
                obstruction1.body.immovable = true;
                game.physics.enable(obstruction1, Phaser.Physics.ARCADE);
                obstruction1.body.velocity.setTo(10, 100);
                obstruction1.body.collideWorldBounds = true;
                obstruction1.body.bounce.set(0.4);
                var obstruction1 = elements.create(800 + (i * 570), 20, 'obstruction2');
                obstruction1.body.immovable = true;
                game.physics.enable(obstruction1, Phaser.Physics.ARCADE);
                obstruction1.body.velocity.setTo(10, 100);
                obstruction1.body.collideWorldBounds = true;
                obstruction1.body.bounce.set(0.4);
            }
            break;
        case 2:
            for (var i = 1; i < 4; i++) {
                var obstruction1 = obstructions.create(80 + (i * 500), 20, 'obstructionGroup');
                obstruction1.body.immovable = true;
                game.physics.enable(obstruction1, Phaser.Physics.ARCADE);
                obstruction1.body.velocity.setTo(-10, 100);
                obstruction1.body.collideWorldBounds = true;
                obstruction1.body.bounce.set(0.4);
                var obstruction1 = obstructions.create(150 + (i * 900), 200, 'obstruction1');
                obstruction1.body.immovable = true;
                game.physics.enable(obstruction1, Phaser.Physics.ARCADE);
                obstruction1.body.velocity.setTo(10, 100);
                obstruction1.body.collideWorldBounds = true;
                obstruction1.body.bounce.set(0.4);
                var obstruction1 = obstructions.create(170 + (i * 1000), 400, 'obstruction2');
                obstruction1.body.immovable = true;
                game.physics.enable(obstruction1, Phaser.Physics.ARCADE);
                obstruction1.body.velocity.setTo(10, 100);
                obstruction1.body.collideWorldBounds = true;
                obstruction1.body.bounce.set(0.7);
            }
            break;
        default:
            break;
    }
};
var shootingStart = function (pos) {
    switch (pos) {
        case 1:
            var star = elements.create(1000, 10, 'starM');
            var rPx = elements.create(1050, 210, 'roundPx');
            break;
        case 2:
            var star = elements.create(3000, 10, 'starM');
            var rPx = elements.create(3050, 210, 'roundPx');
            break;
        case 3:
            var star = elements.create(5000, 10, 'starM');
            var rPx = elements.create(5050, 210, 'roundPx');
            break;
        default:
            break;
    }
    star.body.checkCollision.up = false;
    star.body.checkCollision.down = false;
    star.body.checkCollision.left = false;
    star.body.checkCollision.right = false;
    star.body.immovable = true;
    game.physics.enable(rPx, Phaser.Physics.ARCADE);
    star.body.velocity.setTo(-100, 100);
    rPx.body.velocity.setTo(-100, 100);
};
var addSuitElements = function () {
    helmet = game.add.image(35, 30, 'helmet');
    body = game.add.image(26, 69, 'body');
    arm1 = game.add.image(13, 80, 'arm1');
    arm2 = game.add.image(68, 80, 'arm2');
    pant = game.add.image(35, 110, 'pant');
    foot1 = game.add.image(25, 145, 'foot1');
    foot2 = game.add.image(55, 145, 'foot2');
    helmet.fixedToCamera = true;
    helmet.visible = false;
    body.fixedToCamera = true;
    body.visible = false;
    arm1.fixedToCamera = true;
    arm1.visible = false;
    arm2.fixedToCamera = true;
    arm2.visible = false;
    pant.fixedToCamera = true;
    pant.visible = false;
    foot1.fixedToCamera = true;
    foot1.visible = false;
    foot2.fixedToCamera = true;
    foot2.visible = false;
};
var buildSpaceSuit = function (element) {
    document.getElementById("collect").play();
    switch (element) {
        case 0:
            helmet.visible = true;
            break;
        case 1:
            arm2.visible = true;

            break;
        case 2:
            arm1.visible = true;
            break;
        case 3:
            body.visible = true;
            break;
        case 4:
            pant.visible = true;
            break;
        case 5:
            foot1.visible = true;
            break;
        case 6:
            foot2.visible = true;
            break;
        default:
            break;
    };
}
//************************************** */
//************************************** */
//***************LEVEL 2**************** */
//************************************** */
//************************************** */
var closeAdvLvl2 = function () {
    document.getElementById("click").play();

    game.paused = false;
    initLVl2 = true;
    if (collectGls) {
        startTimer(2, 0);
    } else {
        startTimer(3, 0);
    }
}

function setPlayerLvl2() {
    if (collectGls) {
        player = game.add.sprite(2295, 500, 'spriteA');
    } else {
        //player = game.add.sprite(320, 500, 'spriteA');
        player = game.add.sprite(2295, 50, 'spriteA');
    }

    player.animations.add('right', [7, 8, 9, 10], 8, true);
    player.animations.add('left', [0, 1, 2, 3], 8, true);
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.1;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
    game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
}

var addSatellites = function (x, y, platform) {
    var satellite = planet.create(x, y, 'satellite');
    satellite.body.immovable = true;
    game.physics.enable(satellite, Phaser.Physics.ARCADE);
    satellite.body.velocity.setTo(-30, 30);
    satellite.body.collideWorldBounds = true;
    satellite.body.bounce.set(0.1);
}

var setPlatforms = function (elements, pMoveGroup) {
    //Platform in the floor
    PlatformsStage1(elements, platform);

    var platform = elements.create(2500, 567, 'platform');
    platform.body.immovable = true;
    var platform = elements.create(2900, 567, 'platform');
    platform.body.immovable = true;
    var platform = elements.create(3350, 567, 'platformF0');
    platform.body.immovable = true;
    var platform = elements.create(4047, 567, 'platformF2');
    platform.body.immovable = true;
    var platform = elements.create(4444, 567, 'platform');
    platform.body.immovable = true;
    var platform = elements.create(4500, 567, 'platform');
    platform.body.immovable = true;
    platformMV = pMoveGroup.create(4709, 567, 'platform');
    platformMV.body.immovable = true;
    var platform = elements.create(5300, 567, 'platformF1');
    platform.body.immovable = true;
    var platform = elements.create(5910, 567, 'platformF0');
    platform.body.immovable = true;
    var platform = elements.create(6800, 567, 'platform');
    platform.body.immovable = true;

    //platforms in color line
    var platform = elements.create(2680, 400, 'platform');
    platform.body.immovable = true;
    var platform = elements.create(3100, 400, 'platformF0');
    platform.body.immovable = true;
    var platform = elements.create(4250, 400, 'platform');
    platform.body.immovable = true;
    var platform = elements.create(5000, 400, 'platformF1');
    platform.body.immovable = true;
    var platform = elements.create(6148, 400, 'platform');
    platform.body.immovable = true;
    platformMH = pMoveGroup.create(6500, 400, 'platform');
    platformMH.body.immovable = true;

    //platforms in thirds
    var platform = elements.create(2980, 240, 'platform');
    platform.body.immovable = true;
    var platform = elements.create(3800, 240, 'platformF1');
    platform.body.immovable = true;
    pltMovement = elements.create(4500, 240, 'platform');
    pltMovement.body.immovable = true;
    pltMovement.body.velocity.x = -200;
    var platform = elements.create(5400, 240, 'platformF1');
    platform.body.immovable = true;
    var platform = elements.create(6348, 240, 'platform');
    platform.body.immovable = true;
    var platform = elements.create(6700, 240, 'platformF1');
    platform.body.immovable = true;
}

var addPlanets = function (planet) {
    switch (levelState) {
        case 1:
            for (var i = 0; i < planet1.length; i++) {
                var p1 = planet.create(planet1[i].x, planet1[i].y, 'planet1');
                p1.body.immovable = true;
                var p2 = planet.create(planet2[i].x, planet2[i].y, 'planet2');
                p2.body.immovable = true;
                var p3 = planet.create(planet3[i].x, planet3[i].y, 'planet3');
                p3.body.immovable = true;
                var p4 = planet.create(planet4[i].x, planet4[i].y, 'planet4');
                p4.body.immovable = true;
            }
            break;
        case 2:
            for (var i = 0; i < planet1.length - 6; i++) {
                if (i > 2) {
                    var p1 = planet.create(planet1[i].x, planet1[i].y, 'planet1');
                    p1.body.setCircle(16)
                    p1.body.immovable = true;
                    var p2 = planet.create(2400 + planet2[i].x, 10 + planet2[i].y - 100, 'planet2');
                    p2.body.setCircle(55)
                    p2.body.immovable = true;
                }
                var p3 = planet.create(2400 + planet3[i].x, 80 + planet3[i].y - 100, 'planet3');
                p3.body.setCircle(27)
                p3.body.immovable = true;

            }
            break;
        default:
            break;
    }

}

var collectGlasses = function (player, glasses) {
    document.getElementById("collect").play();
    glasses.kill();
    collectGls = true;
    game.paused = true;
    infoText(message7, '20px', player.position.x - 150, 200, 380, 100, function () {
        game.paused = false;
    });
}
var collectLiveUp = function (player, liveUp) {
    countLives += 1;
    liveUp.kill();
    showLives();
}


var shootingExplotion = function () {
    var star = st.create(1300, 10, 'starM');
    star.body.immovable = true;
    game.physics.enable(star, Phaser.Physics.ARCADE);
    star.body.velocity.setTo(-100, 100);
}

var PlatformsStage1 = function (elements) {
    var platform = elements.create(0, 567, 'platformF0');
    platform.body.immovable = true;
    var platform = elements.create(650, 567, 'platform');
    platform.body.immovable = true;
    var platform = elements.create(800, 567, 'platformF1');
    platform.body.immovable = true;
    var platform = elements.create(900, 567, 'platform');
    platform.body.immovable = true;
    var platform = elements.create(1000, 567, 'platform');
    platform.body.immovable = true;
    var platform = elements.create(1150, 567, 'platform');
    platform.body.immovable = true;
    var platform = elements.create(1400, 567, 'platformF2');
    platform.body.immovable = true;
    var platform = elements.create(1900, 567, 'platformF0');
    platform.body.immovable = true;
    var platformS1 = elements.create(800, 437, 'platform');
    platformS1.body.immovable = true;
    var platformS11 = elements.create(1000, 340, 'platform');
    platformS11.body.immovable = true;
    var platformS12 = elements.create(200, 340, 'platform');
    platformS12.body.immovable = true;
    var platformS13 = elements.create(600, 340, 'platform');
    platformS13.body.immovable = true;
    var platformS14 = elements.create(550, 100, 'platform');
    platformS14.body.immovable = true;
    var platformS15 = elements.create(400, 250, 'platform');
    platformS15.body.immovable = true;
    var platformS16 = elements.create(200, 170, 'platform');
    platformS16.body.immovable = true;
    var platformS17 = elements.create(1200, 250, 'platform');
    platformS17.body.immovable = true;
    var platformS18 = elements.create(1500, 160, 'platform');
    platformS18.body.immovable = true;
}
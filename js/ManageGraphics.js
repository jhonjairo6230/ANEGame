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
var askMobileBg, titleAskMobile, yesBtn, noBtn;

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
    if (e) {
        e.kill();
    }
};
var startTimer = function (minute, seconds) {
    game.add.button(765, 0, 'pauseBtn', pauseAction, this, 0, 0, 1).fixedToCamera = true;
    timerL1 = game.time.create(false);
    timerEvent = timerL1.add(Phaser.Timer.MINUTE * minute + Phaser.Timer.SECOND * seconds, this.endTimer, this);
    timerL1.start();
};

var addGamePad = function (hasButton) {
    joystick = gamepad.addJoystick(100, game.world.height - 100, 1.2, 'gamepad');
    button = gamepad.addButton(700, game.world.height - 100, 1.0, 'gamepad');
    // //joystick.visible = false;
    if (!hasButton) {
        button.visible = false;
    }
    //game.plugins.removeAll();
}
var showGamePad = function () {
    button.visible = true;
    joystick.visible = true;
    gamepad.joystickPad.visible = true;
}
var removeGamePad = function () {
    button.visible = false;
    joystick.visible = false;
    gamepad.joystickPad.visible = false;
    //joystick.position.x = 100;
}

var pauseAction = function () {
    if (!game.paused) {
        game.paused = true;
        bgPaused = game.add.image(game.camera.view.x + 250, 150, 'pauseBackground');
        var style = {
            font: "25px Myriad",
            fill: "#662d91",
            align: "left",
        };
        titlePauseTxt = game.add.text(game.camera.view.x + 280, 160, 'Selecciona una opción', style);
        bgSoundConfigTxt = game.add.text(game.camera.view.x + 260, 210, 'Música fondo: ', style);
        if (isBgSound) {
            bgSoundBtn = game.add.button(bgSoundConfigTxt.position.x + 180, 200, 'bgSoundBtn', silenceBgSound, this, 1, 0, 1);
        } else {
            bgSoundBtn = game.add.button(bgSoundConfigTxt.position.x + 180, 200, 'bgSoundBtn', silenceBgSound, this, 1, 2, 2);
        }
        soundConfigTxt = game.add.text(game.camera.view.x + 260, 280, 'Sonidos: ', style);
        if (isSound) {
            SoundBtn = game.add.button(soundConfigTxt.position.x + 180, 270, 'SoundBtn', silenceAllSounds, this, 1, 0, 1);
        } else {
            SoundBtn = game.add.button(soundConfigTxt.position.x + 180, 270, 'SoundBtn', silenceAllSounds, this, 1, 2, 2);
        }
        controlConfigTxt = game.add.text(game.camera.view.x + 260, 335, 'Controles: ', style);
        if (joystickVisible) {
            controlConfigBtn = game.add.button(controlConfigTxt.position.x + 180, 330, 'ControlBtn', manageGamePad, this, 3, 2, 3);
        } else {
            controlConfigBtn = game.add.button(controlConfigTxt.position.x + 180, 330, 'ControlBtn', manageGamePad, this, 1, 0, 1);
        }
        levelConfigTxt = game.add.text(game.camera.view.x + 260, 390, 'Niveles: ', style);
        levelConfigBtn = game.add.button(levelConfigTxt.position.x + 180, 390, 'LevelBtn', showLevelGrid, this, 1, 0, 1);
        closePausebtn = game.add.button(game.camera.view.x + 520, 140, 'closeBtn', playGame, this, 1, 1, 0);
    } else {
        playGame();
    }
}

var showLevelGrid = function () {
    playGame();
    var style = {
        font: "25px Myriad",
        fill: "#662d91",
        align: "left",
    };
    bgLevel = game.add.image(game.camera.view.x, 0, 'bgLevel');
    titleLevel = game.add.text(game.camera.view.x + 250, 140, 'Selecciona una opción', style);
    game.add.button(game.camera.view.x + 710, 110, 'closeBtn', closeLevelGrid, this, 1, 1, 0);
    avatarTxt = game.add.text(game.camera.view.x + 180, 310, 'Avatar', style);
    level1Txt = game.add.text(game.camera.view.x + 350, 310, 'Nivel 1', style);
    level2Txt = game.add.text(game.camera.view.x + 500, 310, 'Nivel 2', style);
    level3Txt = game.add.text(game.camera.view.x + 180, 450, 'Nivel 3', style);
    level4Txt = game.add.text(game.camera.view.x + 350, 450, 'Nivel 4', style);
    level5Txt = game.add.text(game.camera.view.x + 500, 450, 'Nivel 5', style);
    switch (levelWin) {
        case 1:
            avatarBtn = game.add.button(game.camera.view.x + 150, 210, 'AvatarBtn', levelSelected, this, 1, 0, 1);
            level1Btn = game.add.button(game.camera.view.x + 310, 210, 'Level1Btn', levelSelected, this, 1, 0, 1);
            level2Btn = game.add.button(game.camera.view.x + 470, 210, 'Level2Btn', "", this, 1, 1, 0);
            level3Btn = game.add.button(game.camera.view.x + 150, 350, 'Level3Btn', "", this, 1, 1, 0);
            level4Btn = game.add.button(game.camera.view.x + 310, 350, 'Level4Btn', "", this, 1, 1, 0);
            level5Btn = game.add.button(game.camera.view.x + 470, 350, 'Level5Btn', "", this, 1, 1, 0);
            break;
        case 2:
            avatarBtn = game.add.button(game.camera.view.x + 150, 210, 'AvatarBtn', levelSelected, this, 1, 0, 1);
            level1Btn = game.add.button(game.camera.view.x + 310, 210, 'Level1Btn', levelSelected, this, 1, 0, 1);
            level2Btn = game.add.button(game.camera.view.x + 470, 210, 'Level2Btn', levelSelected, this, 1, 0, 1);
            level3Btn = game.add.button(game.camera.view.x + 150, 350, 'Level3Btn', "", this, 1, 1, 0);
            level4Btn = game.add.button(game.camera.view.x + 310, 350, 'Level4Btn', "", this, 1, 1, 0);
            level5Btn = game.add.button(game.camera.view.x + 470, 350, 'Level5Btn', "", this, 1, 1, 0);
            break;
        case 3:
            avatarBtn = game.add.button(game.camera.view.x + 150, 210, 'AvatarBtn', levelSelected, this, 1, 0, 1);
            level1Btn = game.add.button(game.camera.view.x + 310, 210, 'Level1Btn', levelSelected, this, 1, 0, 1);
            level2Btn = game.add.button(game.camera.view.x + 470, 210, 'Level2Btn', levelSelected, this, 1, 0, 1);
            level3Btn = game.add.button(game.camera.view.x + 150, 350, 'Level3Btn', levelSelected, this, 1, 0, 1);
            level4Btn = game.add.button(game.camera.view.x + 310, 350, 'Level4Btn', "", this, 1, 1, 0);
            level5Btn = game.add.button(game.camera.view.x + 470, 350, 'Level5Btn', "", this, 1, 1, 0);
            break;
        case 4:
            avatarBtn = game.add.button(game.camera.view.x + 150, 210, 'AvatarBtn', levelSelected, this, 1, 0, 1);
            level1Btn = game.add.button(game.camera.view.x + 310, 210, 'Level1Btn', levelSelected, this, 1, 0, 1);
            level2Btn = game.add.button(game.camera.view.x + 470, 210, 'Level2Btn', levelSelected, this, 1, 0, 1);
            level3Btn = game.add.button(game.camera.view.x + 150, 350, 'Level3Btn', levelSelected, this, 1, 0, 1);
            level4Btn = game.add.button(game.camera.view.x + 310, 350, 'Level4Btn', levelSelected, this, 1, 0, 1);
            level5Btn = game.add.button(game.camera.view.x + 470, 350, 'Level5Btn', "", this, 1, 1, 0);
            break;
        case 5:
            avatarBtn = game.add.button(game.camera.view.x + 150, 210, 'AvatarBtn', levelSelected, this, 1, 0, 1);
            level1Btn = game.add.button(game.camera.view.x + 310, 210, 'Level1Btn', levelSelected, this, 1, 0, 1);
            level2Btn = game.add.button(game.camera.view.x + 470, 210, 'Level2Btn', levelSelected, this, 1, 0, 1);
            level3Btn = game.add.button(game.camera.view.x + 150, 350, 'Level3Btn', levelSelected, this, 1, 0, 1);
            level4Btn = game.add.button(game.camera.view.x + 310, 350, 'Level4Btn', levelSelected, this, 1, 0, 1);
            level5Btn = game.add.button(game.camera.view.x + 470, 350, 'Level5Btn', levelSelected, this, 1, 0, 1);
            break;
        default:
            break;
    }
}

var levelSelected = function (e) {
    game.paused = false;
    timerL1.stop();
    isInitLVL1 = false;
    initLVl2 = false;
    initLVl3 = false;
    initLVl4 = false;
    initLVl5 = false;

    isInit = false;
    countLives = 3;
    isSuitCollected = false;
    spaceSuitPhysics = false;
    elementsCollected = 0;
    collectGls = false;
    countHorn = countRadio = countSmoke = countTelegraph = countRadio = countTv = countPhone = countRadio = countTv = countPhone = 0;
    switch (e.key) {
        case 'Level1Btn':
            levelState = 1;
            game.state.start('Level1', true, true, "");
            break;
        case 'Level2Btn':
            levelState = 2;

            game.state.start('Level2', true, true, "");
            break;
        case 'Level3Btn':
            levelState = 3;
            game.state.start('Level3', true, true, "");
            break;
        case 'Level4Btn':
            levelState = 4;
            biosSprite = [];
            game.state.start('Level4', true, true, "");
            break;
        case 'Level5Btn':
            levelState = 5;
            biosSprite = [];
            game.state.start('Level5', true, true, "");
            break;
        case 'AvatarBtn':
            levelState = 1;
            game.state.start('AvatarConfig', true, true, e);
            break;
        default:
            break;
    }
}

var closeLevelGrid = function (e) {
    e.kill();
    bgLevel.kill();
    titleLevel.kill();
    avatarBtn.kill();
    avatarTxt.kill();
    level1Btn.kill();
    level1Txt.kill();
    level2Btn.kill();
    level2Txt.kill();
    level3Btn.kill();
    level3Txt.kill();
    level4Btn.kill();
    level4Txt.kill();
    level5Btn.kill();
    level5Txt.kill();
    pauseAction();
}

var playGame = function (e) {
    titlePauseTxt.kill();
    bgSoundConfigTxt.kill();
    bgSoundBtn.kill();
    soundConfigTxt.kill();
    SoundBtn.kill();
    controlConfigTxt.kill();
    controlConfigBtn.kill();
    levelConfigTxt.kill();
    closePausebtn.kill();
    bgPaused.kill();
    levelConfigBtn.kill();
    game.paused = false;
}

var silenceBgSound = function () {
    var mainTheme = document.getElementById("mainTheme")
    mainTheme.volume = 0.3;
    if (isBgSound) {
        mainTheme.pause();
        bgSoundBtn.kill();
        bgSoundBtn = game.add.button(bgSoundConfigTxt.position.x + 180, 200, 'bgSoundBtn', silenceBgSound, this, 1, 2, 2);
        isBgSound = false;
    } else {
        mainTheme.play();
        bgSoundBtn.kill();
        bgSoundBtn = game.add.button(bgSoundConfigTxt.position.x + 180, 200, 'bgSoundBtn', silenceBgSound, this, 1, 0, 1);
        isBgSound = true;
    }
}

var manageGamePad = function () {
    if (joystickVisible) {
        controlConfigBtn.kill();
        controlConfigBtn = game.add.button(controlConfigTxt.position.x + 180, 330, 'ControlBtn', manageGamePad, this, 1, 0, 1);
        joystickVisible = false;
        isMobile = false;
        removeGamePad();
    } else {
        controlConfigBtn.kill();
        controlConfigBtn = game.add.button(controlConfigTxt.position.x + 180, 330, 'ControlBtn', manageGamePad, this, 3, 2, 3);
        joystickVisible = true;
        if (levelState == 1) {
            button.visible = false;
        } else {
            button.visible = true;
        }
        joystick.visible = true;
        gamepad.joystickPad.visible = true;
    }
}

var silenceAllSounds = function () {
    if (isSound) {
        isSound = false;
        SoundBtn.kill();
        SoundBtn = game.add.button(soundConfigTxt.position.x + 180, 270, 'SoundBtn', silenceAllSounds, this, 1, 2, 2);
    } else {
        isSound = true;
        SoundBtn.kill();
        SoundBtn = game.add.button(soundConfigTxt.position.x + 180, 270, 'SoundBtn', silenceAllSounds, this, 1, 0, 1);
    }
}

var askMobileDlg = function () {
    askMobileBg = game.add.image(0, 0, 'askMobile');
    var style = {
        font: "20px Myriad",
        fill: "#662d91",
        align: "left",
    };
    askMobile = game.add.text(260, 230, '¿Juegas con una pantalla táctil?', style);
    yesBtn = game.add.button(310, 300, 'YesBtn', ynAction, this, 0, 1, 1);
    noBtn = game.add.button(400, 300, 'NoBtn', ynAction, this, 2, 3, 3);
}

var ynAction = function (e) {
    askMobileBg.kill();
    askMobile.kill();
    yesBtn.kill();
    noBtn.kill();
    if (e.key == 'YesBtn') {
        isMobile = true;
        game.state.start('Videos');
    } else {
        document.getElementById("click").play();
        var keys = game.add.sprite(150, 100, 'tutoKeys');
        keys.animations.add('full', [0, 1, 2, 3, 4], 4, true);
        keys.animations.play('full');
        game.time.events.add(2500, goToVideos, this, '');
        // game.state.start('Videos');
    }
}

var goToVideos = function () {
    game.state.start('Videos');
}

//************************************** */
//************************************** */
//***************LEVEL 1**************** */
//************************************** */
//************************************** */
var closeAdvLvl1 = function (e) {
    if (isSound) {
        document.getElementById("click").play();
    }
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
        spaceSuitPhysics = true;
        this.setSpaceSuit(7800, 350);
    }

};
var initLevel1 = function (e) {
    if (isSound) {
        document.getElementById("click").play();
    }
    if (!isPaused) {
        isInitLVL1 = true;
        this.resetPlayer(200, 200);
        this.startTimer(minuteConfig, secondsConfig);
        //this.startTimer(2, 0);
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
    if (isBgSound) {
        var mainTheme = document.getElementById("mainTheme")
        mainTheme.volume = 0.3;
        mainTheme.play();
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
    realPlayer = game.add.sprite(x + 22, y + 20, 'px');
    game.physics.arcade.enable(player);
    game.physics.arcade.enable(realPlayer);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    realPlayer.body.bounce.y = 0.2;
    realPlayer.body.gravity.y = 300;
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
            var star = stars.create(738 - w, 5, 'star');
            w += 22;
        }

    }
    var stLvl = game.add.button(90, 2, 'levelSt', showHelp, this, 1, 1, 0);
    stLvl.animations.add('show', [0, 1], 1, true);
    stLvl.fixedToCamera = true;
    stLvl.animations.play('show');
};

var showHelp = function () {
    game.paused = true;
    var msg = '';
    switch (levelState) {
        case 1:
            msg = 'Recolecta todos los elementos del traje espacial, después sigue avanzando hasta encontrar la bandera de entrada';
            break;
        case 2:
            msg = 'Encuentra las gafas para que puedas mirar el espectro electromagnetico, después intenta ingresar a la tierra por el camino adecuado';
            break;
        case 3:
            msg = 'Debes comunicarte con una lejana ciudad, recolecta al menos 10 iconos de la misma señal para poder probar.¡Solo con la señal indicada podrás comunicarte!';
            break;
        case 4:
            msg = 'Debes ingresar a la autopista de las telecomunicaciones, para esto recolecta 5 iconos de la misma señal.¡Recuerda algunas señales no tienen suficiente alcance!';
            break;
        case 5:
            msg = 'Debes comunicar dos ciudades lejanas, para ello recolecta todas los iconos de antenas y al final pulsa el boton comunicarse para probar';
            break;
        default:
            break;
    }
    infoText(msg, '20px', game.camera.view.x + 200, 200, 300, 180, function () {
        game.paused = false;
    });
}

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
    spaceA.body.bounce.y = 0.5;
    spaceA.body.gravity.y = 170;
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
                obstruction1.body.velocity.setTo(-20, -20);
                obstruction1.body.collideWorldBounds = true;
                obstruction1.body.bounce.set(0.4);
                game.physics.arcade.collide(obstruction1, elements);
                var obstruction1 = obstructions.create(150 + (i * 900), 200, 'obstruction1');
                obstruction1.body.immovable = true;
                game.physics.enable(obstruction1, Phaser.Physics.ARCADE);
                obstruction1.body.velocity.setTo(20, -20);
                obstruction1.body.collideWorldBounds = true;
                obstruction1.body.bounce.set(0.4);
                var obstruction1 = obstructions.create(170 + (i * 1000), 400, 'obstruction2');
                obstruction1.body.immovable = true;
                game.physics.enable(obstruction1, Phaser.Physics.ARCADE);
                obstruction1.body.velocity.setTo(-20, -20);
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
    if (isSound) {
        document.getElementById("collect").play();
    }
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
    if (isSound) {
        document.getElementById("click").play();
    }
    game.paused = false;
    initLVl2 = true;
    if (collectGls) {
        startTimer(2, 0);
    } else {
        startTimer(3, 0);
    }
    // var mainTheme = document.getElementById("mainTheme")
    // mainTheme.volume = 0.4;
    // mainTheme.play();
}

function setPlayer() {
    switch (levelState) {
        case 2:
            if (collectGls) {
                player = game.add.sprite(2295, 500, 'spriteA');
            } else {
                player = game.add.sprite(320, 500, 'spriteA');
                //player = game.add.sprite(6000, 500, 'spriteA');
            }
            break;
        case 3:
            player = game.add.sprite(320, 400, 'spritePlayer');
            //player = game.add.sprite(12000, 400, 'spritePlayer');
            break;
        case 4:
            //player = game.add.sprite(6000, 400, 'spritePlayer');
            player = game.add.sprite(320, 400, 'spritePlayer');
            break;
        case 5:
            //player = game.add.sprite(8000, 400, 'spritePlayer');
            player = game.add.sprite(320, 400, 'spritePlayer');
            break;
        default:
            break;
    }

    player.animations.add('right', [7, 8, 9, 10], 8, true);
    player.animations.add('left', [0, 1, 2, 3], 8, true);
    game.physics.arcade.enable(player);
    if (levelState != 2) {
        player.body.bounce.y = 0.1;
        player.body.gravity.y = 300;
    } else {
        player.body.bounce.y = 0.4;
        player.body.gravity.y = 200;
    }
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
    switch (levelState) {
        case 2:
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
            break;
        case 3:
            var vch = [0, 290, 1167, 1424, 1690, 2580, 2841, 3110, 4017,
                4300, 4500, 5450, 5707, 5972, 6876, 7145, 7406, 8270,
                8500, 8760, 9730, 9995, 10200, 11157, 11412, 11670, 12526,
                12786, 13500, 13758, 14017
            ];
            var vrh = [415, 1850, 3264, 4690, 6124, 7550, 8961, 10397, 11770, 12962];
            var vlh = [890, 2318, 3737, 5165, 6594, 8024, 9440, 10868, 12234, 13385];
            var vSkyH = [100, 300, 530, 989, 1251, 1458, 1868, 2489, 3148, 3461, 4009,
                4356, 4729, 5470, 5832, 7188, 7433, 7760, 8427, 8613, 8745, 9067, 9808, 10063,
                10499, 11185, 11511, 11637
            ];
            var vSkyV = [250, 355, 200, 250, 355, 270, 250, 355, 355, 200, 200, 355, 240,
                355, 200, 200, 355, 210, 355, 200, 200, 150, 355, 210, 300, 355, 205, 205
            ];
            for (var i = 0; i < vch.length; i++) {
                var platform = elements.create(vch[i], 480, 'platformC');
                platform.body.immovable = true;
            }
            for (var i = 0; i < vrh.length; i++) {
                var platform = elements.create(vrh[i], 480, 'platformR');
                platform.body.immovable = true;
            }
            for (var i = 0; i < vlh.length; i++) {
                var platform = elements.create(vlh[i], 480, 'platformL');
                platform.body.immovable = true;

            }
            for (var s = 0; s < vSkyH.length; s++) {
                var platform = elements.create(vSkyH[s], vSkyV[s], 'platformS');
                platform.body.immovable = true;
            }

            break;
        case 4:
            var vSkyH = [100, 500, 830, 945, 1751, 2000, 2300, 2829, 3148, 3461, 4100,
                4356, 4685, 5470, 5732, 5188, 6433, 6760
            ];
            var vSkyV = [385, 350, 270, 270, 385, 270, 140, 385, 305, 200, 267, 385, 270,
                385, 270, 270, 385, 270
            ];
            for (var s = 0; s < vSkyH.length; s++) {
                var platform = elements.create(vSkyH[s], vSkyV[s], 'platformS');
                platform.body.immovable = true;
            }
            break;
        case 5:
            var vSkyH = [100, 500, 830, 945, 1751, 2000, 2300, 2829, 3148, 3461, 4100,
                4356, 4685, 5470, 5732, 5188, 6433, 6760
            ];
            var vSkyV = [385, 350, 270, 270, 385, 270, 140, 385, 305, 200, 267, 385, 270,
                385, 270, 270, 385, 270
            ];
            for (var s = 0; s < vSkyH.length; s++) {
                var platform = elements.create(vSkyH[s], vSkyV[s], 'platformS');
                platform.body.immovable = true;
            }
            break;
        default:
            break;
    }
}

var addPlanets = function (planet) {
    var p = game.add.group();
    // p.enableBody = true;
    switch (levelState) {
        case 1:
            for (var i = 0; i < planet1.length; i++) {
                var p1 = p.create(planet1[i].x, planet1[i].y, 'planet1');
                // p1.body.immovable = true;
                var p1A = planet.create(planet1[i].x + 10, planet1[i].y + 3, 'circleP1');
                p1A.body.setCircle(14);
                //p1A.body.immovable = true;
                var p2 = p.create(planet2[i].x, planet2[i].y, 'planet2');
                var p3A = planet.create(planet2[i].x + 4, planet2[i].y + 4, 'circleP2');
                p3A.body.setCircle(62);
                p3A.body.immovable = true;
                var p3 = p.create(planet3[i].x, planet3[i].y, 'planet3');
                var p3A = planet.create(planet3[i].x + 9, planet3[i].y + 5, 'circleP3');
                p3A.body.setCircle(35);
                p3A.body.immovable = true;
                var p4 = p.create(planet4[i].x, planet4[i].y, 'planet4');
                //p4.body.immovable = true;
                //p4.body.collideWorldBounds = true;
                var p4A = planet.create(planet4[i].x + 15, planet4[i].y + 8, 'circleP4');
                p4A.body.setCircle(30);
                p4A.body.immovable = true;
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
    if (isSound) {
        document.getElementById("collect").play();
    }
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
//************************************** */
//************************************** */
//***************LEVEL 3**************** */
//************************************** */
//************************************** */
var addFishSprite = function (enemies) {
    var fishes = [800, 2200, 3610, 5044, 6480, 7900, 9320, 10750, 12120];
    for (var i = 0; i < fishes.length; i++) {
        fishesSprite[i] = game.add.sprite(fishes[i], 500, 'spriteFish');
        fishesSprite[i].animations.add('up', [0, 1], 2, true);
        fishesSprite[i].animations.add('down', [2, 3], 2, true);
        game.physics.arcade.enable(fishesSprite[i]);
        fishesSprite[i].body.bounce.y = 0.1;
        fishesSprite[i].body.immovable = true;
        enemies.add(fishesSprite[i]);
    }

}

var addBioSprite = function (biosSprite) {
    enemiesBio = game.add.group();
    enemiesBio.enableBody = true;
    game.physics.arcade.enable(enemiesBio);
    switch (levelState) {
        case 2:
            var bios = [2984, 3407, 4834, 5942, 6504,
                7154
            ];
            var bh = [440, 330, 440, 180, 330, 500];
            for (var i = 0; i < bios.length; i++) {
                biosSprite[i] = game.add.sprite(bios[i], bh[i], 'spriteAlienShip');
                biosSprite[i].animations.add('left', [4, 3, 2, 1, 0], 5, true);
                biosSprite[i].animations.add('right', [0, 1, 2, 3, 4], 5, true);
                game.physics.arcade.enable(biosSprite[i]);
                biosSprite[i].body.bounce.y = 0.2;
                biosSprite[i].body.setCircle(20)
                //biosSprite[i].body.gravity.y = 300;
                biosSprite[i].body.collideWorldBounds = true;
                enemiesBio.add(biosSprite[i]);
            }
            break;
        case 3:
            var bios = [1550, 1600, 2984, 4407, 4457, 5834, 5884, 7242, 7292, 10104,
                10154, 11535, 11657, 8783
            ];
            for (var i = 0; i < bios.length; i++) {
                if (i < 12) {
                    biosSprite[i] = game.add.sprite(bios[i], 440, 'spriteBio');
                } else {
                    biosSprite[i] = game.add.sprite(bios[i], 100, 'spriteBio');
                }
                biosSprite[i].animations.add('left', [2, 1, 0], 8, true);
                biosSprite[i].animations.add('right', [0, 1, 2], 8, true);
                game.physics.arcade.enable(biosSprite[i]);
                biosSprite[i].body.bounce.y = 0.2;
                biosSprite[i].body.setCircle(20)
                //biosSprite[i].body.gravity.y = 300;
                biosSprite[i].body.collideWorldBounds = true;
                enemiesBio.add(biosSprite[i]);
            }
            break;
        case 4:
            var bios = [892, 945, 2384, 3546, 5810];
            // biosSprite = [];
            for (var i = 0; i < bios.length; i++) {
                if (i < 2) {
                    biosSprite[i] = game.add.sprite(bios[i], 231, 'spriteBio');
                } else if (i == 2) {
                    biosSprite[i] = game.add.sprite(bios[i], 100, 'spriteBio');
                } else if (i == 3) {
                    biosSprite[i] = game.add.sprite(bios[i], 160, 'spriteBio');
                } else {
                    biosSprite[i] = game.add.sprite(bios[i], 230, 'spriteBio');
                }
                biosSprite[i].animations.add('left', [2, 1, 0], 8, true);
                biosSprite[i].animations.add('right', [0, 1, 2], 8, true);
                game.physics.arcade.enable(biosSprite[i]);
                biosSprite[i].body.bounce.y = 0.2;
                biosSprite[i].body.setCircle(20)
                //biosSprite[i].body.gravity.y = 300;
                biosSprite[i].body.collideWorldBounds = true;
                enemies.add(biosSprite[i]);
            }
            break;
        case 5:
            var bios = [892, 945, 2384, 3546, 5810];
            // biosSprite = [];
            for (var i = 0; i < bios.length; i++) {
                if (i < 2) {
                    biosSprite[i] = game.add.sprite(bios[i], 231, 'spriteBio');
                } else if (i == 2) {
                    biosSprite[i] = game.add.sprite(bios[i], 100, 'spriteBio');
                } else if (i == 3) {
                    biosSprite[i] = game.add.sprite(bios[i], 160, 'spriteBio');
                } else {
                    biosSprite[i] = game.add.sprite(bios[i], 230, 'spriteBio');
                }
                biosSprite[i].animations.add('left', [2, 1, 0], 8, true);
                biosSprite[i].animations.add('right', [0, 1, 2], 8, true);
                game.physics.arcade.enable(biosSprite[i]);
                biosSprite[i].body.bounce.y = 0.2;
                biosSprite[i].body.setCircle(20)
                //biosSprite[i].body.gravity.y = 300;
                biosSprite[i].body.collideWorldBounds = true;
                enemies.add(biosSprite[i]);
            }
            break;
        default:
            break;
    }
}


var animateBio = function (biosSprite) {
    switch (levelState) {
        case 2:
            for (var i = 0; i < biosSprite.length; i++) {
                if (biosSprite[0].position.x > 2500 && isLeft) {
                    isLeft = true;
                    biosSprite[i].animations.play('left');
                    biosSprite[i].body.velocity.setTo(-120, 0);
                } else if (biosSprite[0].position.x < 3200) {
                    isLeft = false;
                    biosSprite[i].animations.play('right');
                    biosSprite[i].body.velocity.setTo(120, 0);
                } else {
                    isLeft = true;
                }
            }
            break;
        case 3:
            for (var i = 0; i < biosSprite.length; i++) {
                if (i < 12) {
                    if (biosSprite[0].position.x > 883 && isLeft) {
                        isLeft = true;
                        biosSprite[i].animations.play('left');
                        biosSprite[i].body.velocity.setTo(-120, 100);
                    } else if (biosSprite[1].position.x < 2100) {
                        isLeft = false;
                        biosSprite[i].animations.play('right');
                        biosSprite[i].body.velocity.setTo(120, 100);
                    } else {
                        isLeft = true;
                    }
                } else {
                    if (biosSprite[12].position.x > 2292 && isLeft12) {
                        isLeft12 = true;
                        biosSprite[i].animations.play('left');
                        biosSprite[i].body.velocity.setTo(-120, 100);
                    } else if (biosSprite[12].position.x < 11720) {
                        isLeft12 = false;
                        biosSprite[i].animations.play('right');
                        biosSprite[i].body.velocity.setTo(120, 100);
                    } else {
                        isLeft12 = true;
                    }
                }
            }
            break;
        case 4:
            for (var i = 0; i < biosSprite.length; i++) {
                if (i < 2) {
                    if (biosSprite[0].position.x > 826 && isLeftBio0) {
                        isLeftBio0 = true;
                        biosSprite[i].animations.play('left');
                        biosSprite[i].body.velocity.setTo(-80, 0);
                    } else if (biosSprite[1].position.x < 1038) {
                        isLeftBio0 = false;
                        biosSprite[i].animations.play('right');
                        biosSprite[i].body.velocity.setTo(80, 0);
                    } else {
                        isLeftBio0 = true;
                    }
                } else {
                    if (biosSprite[2].position.x > 2293 && isLeftBio2) {
                        isLeftBio2 = true;
                        biosSprite[i].animations.play('left');
                        biosSprite[i].body.velocity.setTo(-60, 0);
                    } else if (biosSprite[4].position.x < 5832) {
                        isLeftBio2 = false;
                        biosSprite[i].animations.play('right');
                        biosSprite[i].body.velocity.setTo(60, 0);
                    } else {
                        isLeftBio2 = true;
                    }
                }
            }
            break;
        case 5:
            for (var i = 0; i < biosSprite.length; i++) {
                if (i < 2) {
                    if (biosSprite[0].position.x > 826 && isLeftBio0) {
                        isLeftBio0 = true;
                        biosSprite[i].animations.play('left');
                        biosSprite[i].body.velocity.setTo(-80, 0);
                    } else if (biosSprite[1].position.x < 1038) {
                        isLeftBio0 = false;
                        biosSprite[i].animations.play('right');
                        biosSprite[i].body.velocity.setTo(80, 0);
                    } else {
                        isLeftBio0 = true;
                    }
                } else {
                    if (biosSprite[2].position.x > 2293 && isLeftBio2) {
                        isLeftBio2 = true;
                        biosSprite[i].animations.play('left');
                        biosSprite[i].body.velocity.setTo(-60, 0);
                    } else if (biosSprite[4].position.x < 5832) {
                        isLeftBio2 = false;
                        biosSprite[i].animations.play('right');
                        biosSprite[i].body.velocity.setTo(60, 0);
                    } else {
                        isLeftBio2 = true;
                    }
                }
            }
            break;
        default:
            break;
    }
}


var animateFishJump = function () {
    for (var i = 0; i < fishesSprite.length; i++) {
        if (fishesSprite[i].position.y > 280 && isUp) {
            isUp = true;
            fishesSprite[i].animations.play('up');
            fishesSprite[i].body.velocity.setTo(0, -100);
        } else if (fishesSprite[i].position.y < 680) {
            isUp = false;
            fishesSprite[i].animations.play('down');
            fishesSprite[i].body.velocity.setTo(0, 100);
        } else {
            isUp = true;
        }
    }
}

var setCollectableElements = function () {
    collectables = game.add.group();
    collectables.enableBody = true;
    switch (levelState) {
        case 3:
            var horn = [100, 900, 1300, 4000, 5899, 7021, 8018, 9014, 10100, 11500];
            var smoke = [400, 1500, 2000, 3510, 4899, 6201, 8718, 10114, 11500, 12721];
            var radio = [20, 1000, 2300, 3600, 4349, 5021, 8918, 9600, 10500, 11910];
            var telegraph = [800, 2010, 2700, 3818, 4619, 5735, 7577, 9900, 10803, 11221];
            var vHT = [141, 400, 110, 250, 267, 130, 400, 420, 95, 118];
            var vSR = [380, 120, 157, 350, 121, 333, 86, 144, 212, 103];
            var a = 9;
            for (var h = 0; h < 10; h++) {
                sHorn = collectables.create(horn[h], vHT[h], 'horn');
                sHorn.body.immovable = true;
                sSmoke = collectables.create(smoke[h], vSR[a], 'smoke');
                sSmoke.body.immovable = true;
                sTelegraph = collectables.create(telegraph[h], vHT[a], 'telegraph');
                sTelegraph.body.immovable = true;
                sRadio = collectables.create(radio[h], vSR[h], 'radio');
                sRadio.body.immovable = true;
                a -= 1;
            }
            break;
        case 4:
            countPhone = countRadio = countTv = countWifi = 0;
            for (var i = 0; i < 4; i++) {
                bgGreen[i].visible = false;
            }
            var tv = [1500, 2000, 3510, 4899, 6201];
            var radio = [20, 1300, 2300, 4000, 5231];
            var phone = [148, 2910, 4400, 5776, 6390];
            var wifi = [531, 1038, 2006, 3512, 4688];
            var vT = [530, 430, 70, 200, 340];
            var vP = [340, 187, 180, 121, 530];
            var vR = [530, 350, 50, 120, 80];
            var vW = [290, 120, 80, 530, 80];
            for (var h = 0; h < tv.length; h++) {
                sTV = collectables.create(tv[h], vT[h], 'tv');
                sTV.body.immovable = true;
                sRadio = collectables.create(radio[h], vR[h], 'radio');
                sRadio.body.immovable = true;
                sPhone = collectables.create(phone[h], vP[h], 'phone');
                sPhone.body.immovable = true;
                sWifi = collectables.create(wifi[h], vW[h], 'wifi');
                sWifi.body.immovable = true;
            }
            break;
        case 5:
            countAntennas = 0;
            var tv = [1500, 2000, 3510, 4899, 6201];
            var radio = [20, 1300, 2300, 4000, 5231];
            var phone = [148, 2910, 4400, 5776, 6390];
            var wifi = [531, 1038, 2006, 3512, 4688];
            var vT = [530, 430, 70, 200, 340];
            var vP = [340, 187, 180, 121, 530];
            var vR = [530, 350, 50, 120, 80];
            var vW = [290, 120, 80, 530, 80];
            for (var h = 0; h < tv.length; h++) {
                sTV = collectables.create(tv[h], vT[h], 'antenna');
                sTV.body.immovable = true;
                sRadio = collectables.create(radio[h], vR[h], 'antenna');
                sRadio.body.immovable = true;
                sPhone = collectables.create(phone[h], vP[h], 'antenna');
                sPhone.body.immovable = true;
                sWifi = collectables.create(wifi[h], vW[h], 'antenna');
                sWifi.body.immovable = true;
            }
            break;
        default:
            break;
    }
}

var collectElements = function (player, collectable) {
    if (isSound) {
        document.getElementById("collect").play();
    }
    switch (levelState) {
        case 3:
            switch (collectable.key) {
                case "radio":
                    countRadio += 1;
                    if (countRadio == 1) {
                        game.time.events.add(100, showDescript, this, 'radioInf');
                    }
                    break;
                case "telegraph":
                    countTelegraph += 1;
                    if (countTelegraph == 1) {
                        game.time.events.add(100, showDescript, this, 'telegrafoInf');
                    }
                    break;
                case "smoke":
                    countSmoke += 1;
                    if (countSmoke == 1) {
                        game.time.events.add(100, showDescript, this, 'humoInf');
                    }
                    break;
                case "horn":
                    countHorn += 1;
                    if (countHorn == 1) {
                        game.time.events.add(100, showDescript, this, 'cuernoInf');
                    }
                    break;
                default:
                    break;
            }
            break;
        case 4:
            switch (collectable.key) {
                case "radio":
                    if (countPhone == 0 && countTv == 0 && countWifi == 0) {
                        countRadio += 1;
                    } else {
                        //collectables.kill();
                        game.paused = true;
                        showMessageInfo(game.camera.view.x + 200, 100, 'collectDiferent');
                        //setCollectableElements();
                    }
                    break;
                case "tv":
                    if (countPhone == 0 && countRadio == 0 && countWifi == 0) {
                        countTv += 1;
                    } else {
                        //collectables.kill();
                        game.paused = true;
                        showMessageInfo(game.camera.view.x + 200, 100, 'collectDiferent');
                        //setCollectableElements();
                    }
                    break;
                case "phone":
                    if (countRadio == 0 && countTv == 0 && countWifi == 0) {
                        countPhone += 1;
                    } else {
                        //collectables.kill();
                        game.paused = true;
                        showMessageInfo(game.camera.view.x + 200, 100, 'collectDiferent');
                        //setCollectableElements();
                    }
                    break;
                case "wifi":
                    if (countRadio == 0 && countTv == 0 && countPhone == 0) {
                        countWifi += 1;
                    } else {
                        //collectables.kill();
                        game.paused = true;
                        showMessageInfo(game.camera.view.x + 200, 100, 'collectDiferent');
                        //setCollectableElements();
                    }
                    break;
                default:
                    break;
            }
            break;
        case 5:
            countAntennas += 1;
            if (countAntennas > 4) {
                signal.kill();
                signal = game.add.group();
                signal.enableBody = true;
                signal.create(400, 0, 'ch1').fixedToCamera = true;
            }
            if (countAntennas > 9) {
                signal.kill();
                signal = game.add.group();
                signal.enableBody = true;
                signal.create(400, 0, 'ch2').fixedToCamera = true;
            }
            if (countAntennas > 14) {
                signal.kill();
                signal = game.add.group();
                signal.enableBody = true;
                signal.create(400, 0, 'ch3').fixedToCamera = true;
            }
            if (countAntennas > 19) {
                signal.kill();
                signal = game.add.group();
                signal.enableBody = true;
                signal.create(400, 0, 'ch4').fixedToCamera = true;
            }
            break;
        default:
            break;
    }
    collectable.kill();
}

var showDescript = function (pic) {
    messageR = game.add.sprite(game.camera.view.x + 200, 200, pic);
    game.time.events.add(1500, removeMsg, this, pic);
}

var removeMsg = function (pic) {
    messageR.kill();
}

var initLevel = function () {
    if (isSound) {
        document.getElementById("click").play();
    }
    switch (levelState) {
        case 3:
            initLVl3 = true;
            game.paused = false;
            closeTextInfo();
            startTimer(3, 30);
            break;
        case 4:
            initLVl4 = true;
            game.paused = false;
            closeTextInfo();
            startTimer(2, 30);
            break;
        case 5:
            initLVl5 = true;
            game.paused = false;
            closeTextInfo();
            startTimer(2, 30);
            break;
        default:
            break;
    }
}

var createDialogSelect = function () {
    timerL1.paused = true;
    dialogBg = game.add.image(12336, 100, 'dialogBg');
    if (countHorn == 10) {
        btnHorn = game.add.button(12356, 200, 'btnHorn', this.testSignal, this, 1, 1, 0);
    }
    if (countRadio == 10) {
        btnRadio = game.add.button(12486, 200, 'btnRadio', this.testSignal, this, 1, 1, 0);
    }
    if (countTelegraph == 10) {
        btnTelegraph = game.add.button(12616, 200, 'btnTelegraph', this.testSignal, this, 1, 1, 0);
    }
    if (countSmoke == 10) {
        btnSmoke = game.add.button(12746, 200, 'btnSmoke', this.testSignal, this, 1, 1, 0);
    }
    //    / game.paused = true;
}
var testSignal = function (e) {
    //closeDialog();
    switch (e.key) {
        case 'btnHorn':
            messageInfo = game.add.image(12366, 100, 'messageHorn');
            break;
        case 'btnRadio':
            messageRadio = game.add.image(12366, 100, 'messageRadio');
            break;
        case 'btnTelegraph':
            messageInfo = game.add.image(12366, 100, 'messageTelegraph');
            break;
        case 'btnSmoke':
            messageInfo = game.add.image(12366, 100, 'messageSmoke');
            break;
        default:
            break;
    }
    btncls = game.add.button(12850, 100, 'closeBtn', this.closeDialog, this, 1, 1, 0);
}



var closeDialog = function (e) {
    timerL1.paused = false;
    dialogBg.kill();
    if (messageInfo) {
        messageInfo.kill();
    }
    btncls.kill();
    if (btnHorn) {
        btnHorn.kill();
    }
    if (btnRadio) {
        btnRadio.kill();
        if (messageRadio) {
            levelState = 3;
            countLives += 1;
            biosSprite = [];
            //showLives();
            if (isSound) {
                document.getElementById("changeLevel").play();
            }
            game.state.start('PassLevel');
        }
    }
    if (btnTelegraph) {
        btnTelegraph.kill();
    }
    if (btnSmoke) {
        btnSmoke.kill();
    }

}

//************************************** */
//************************************** */
//***************LEVEL 3**************** */
//************************************** */
//************************************** */
var addLines = function () {
    line = game.add.group();
    line.enableBody = true;
    lineBottom = line.create(0, 599, 'bottomLine');
    lineBottom.body.immovable = true;
    roadLine = line.create(0, 510, 'roadLine');
    roadLine.body.immovable = true;
    roadLine.body.checkCollision.down = false;
}

var addCarSprite = function (enemies) {
    var cars = [1550, 1750, 2984, 4407, 4657, 5334, 5384, 6342, 6892];
    for (var i = 0; i < cars.length; i++) {
        if ((i % 2) == 0) {
            carsSprite[i] = game.add.sprite(cars[i], 450, 'spriteCar');
        } else {
            carsSprite[i] = game.add.sprite(cars[i], 520, 'spriteTruck');
        }
        carsSprite[i].animations.add('left', [2, 1, 0], 10, true);
        carsSprite[i].animations.add('right', [3, 4, 5], 10, true);
        game.physics.arcade.enable(carsSprite[i]);
        carsSprite[i].body.bounce.y = 0.2;
        // carsSprite[i].body.setCircle(20)
        //biosSprite[i].body.gravity.y = 300;
        carsSprite[i].body.collideWorldBounds = true;
        enemies.add(carsSprite[i]);
    }
}

var animateCarsMove = function () {
    for (var i = 0; i < carsSprite.length; i++) {
        if ((i % 2) != 0) {
            if (carsSprite[1].position.x > 20 && isLeftTruck) {
                isLeftTruck = true;
                carsSprite[i].animations.play('left');
                carsSprite[i].body.velocity.setTo(-80, 0);
            } else if (carsSprite[7].position.x < 6800) {
                isLeftTruck = false;
                carsSprite[i].animations.play('right');
                carsSprite[i].body.velocity.setTo(80, 0);
            } else {
                isLeftTruck = true;
            }
        } else {
            if (carsSprite[8].position.x < 6800 && isLeftCar) {
                isLeftCar = true;
                carsSprite[i].animations.play('right');
                carsSprite[i].body.velocity.setTo(100, 0);
            } else if (carsSprite[0].position.x > 20) {
                isLeftCar = false;
                carsSprite[i].animations.play('left');
                carsSprite[i].body.velocity.setTo(-100, 0);
            } else {
                isLeftCar = true;
            }
        }
    }
}

var showMessageInfo = function (x, y, state) {
    //closeDialog();
    switch (state) {
        case 'finish':
            messageInfo = game.add.image(x, y, 'messageInfo0');
            break;
        case 'collectDiferent':
            messageInfo = game.add.image(x, y, 'messageInfo0');
            break;
        case 'radio':
            messageInfo = game.add.image(x, y, 'messageInfo2');
            break;
        case 'phone':
            messageInfo = game.add.image(x, y, 'messageInfo3');
            break;
        case 'tv':
            messageInfo = game.add.image(x, y, 'messageInfo4');
            break;
        default:
            break;
    }
    btncls = game.add.button(x + 460, y, 'closeBtn', this.closeMessageInfo, this, 1, 1, 0);
}

var closeMessageInfo = function () {
    // if (bgGreen) {
    //     bgGreen.kill();
    // }
    messageInfo.kill();
    btncls.kill();
    game.paused = false;
    collectables.kill();
    setCollectableElements();
}

var addRocks = function (signal) {
    rocks = game.add.group();
    rocks.enableBody = true;
    var rocksPhone = [500, 748, 1003, 1370];
    var rocksTv = [500, 736, 1150, 1370];
    var rocksRadio = [548, 903];
    for (var i = 0; i < rocksPhone.length; i++) {
        var rock;
        if (i < 2 && (signal == 2)) {
            rock = rocks.create(rocksRadio[i], 380, 'rock0');
            rock.body.immovable = true;
        }
        if ((i % 2) == 0) {

            if (signal == 1) {
                rock = rocks.create(rocksTv[i], 200, 'rock0');
                rock.body.immovable = true;
            }
            if (signal == 3) {
                rock = rocks.create(rocksPhone[i], 559, 'rock0');
                rock.body.immovable = true;
            }

        } else {
            if (signal == 1 && i != 3) {
                rock = rocks.create(rocksTv[i], 200, 'rock1');
                rock.body.immovable = true;
            }
            if (signal == 3) {
                rock = rocks.create(rocksPhone[i], 559, 'rock1');
                rock.body.immovable = true;
            }
        }
    }
}

var setAntenas = function (number) {
    antenas = game.add.group();
    antenas.enableBody = true;
    var antenna = [7963, 7847, 7827, 7903, 8328, 8402, 8338];
    var antennaV = [350, 360, 230, 230, 350, 330, 200];
    for (var h = 0; h < number; h++) {
        var a = antenas.create(antenna[h], antennaV[h], 'antennaC');
        a.body.immovable = true;
    }
    game.physics.arcade.enable(signal);
    if (number > 0) {
        antenaL = game.add.sprite(8200, 200, 'leftSprite');
        game.physics.arcade.enable(antenaL);
        antenaL.body.collideWorldBounds = true;
        antenaR = game.add.sprite(7975, 200, 'rigthSprite');
        switch (number) {
            case 7:
                antenaL.animations.add('left', [3, 2, 1, 0], 5, true);
                antenaR.animations.add('rigth', [0, 1, 2, 3], 5, true);
                break;
            case 4:
                antenaL.animations.add('left', [2, 1], 5, true);
                antenaR.animations.add('rigth', [1, 2], 5, true);
                break;
            case 2:
                antenaL.animations.add('left', [2], 5, true);
                antenaR.animations.add('rigth', [1], 5, true);
                break;
            default:
                break;
        }
        game.physics.arcade.enable(antenaR);
        antenaR.body.collideWorldBounds = true;
        antenaL.animations.play('left');
        antenaR.animations.play('rigth');
    }
}

var killAntenas = function () {
    antenas.kill();
    antenaL.kill();
    antenaR.kill();
}
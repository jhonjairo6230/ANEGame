var isBgSound = true,
    isSound = true,
    joystickVisible = false,
    isMobile = false;
var gamepad, joystick, button;
var game, bgPaused, soundConfigTxt, controlConfigTxt, levelConfigTxt, titlePauseTxt, bgSoundConfigTxt;
var closePausebtn, bgSoundBtn, soundConfigBtn, levelConfigBtn, controlConfigBtn;
//Total de vidas iniciales del juego
var countLives = 3;
//tiempo para pasar el  nivel 
var minuteConfig = 3,
    secondsConfig = 0;
var timerL1, timerL2, timeRest;
var levelState = 1;
//Level 2
var collectGls = false;
//
var RutaEspectral = {
    selectSprite: function (hairSelected, headSelected, armSelected, footSelected) {
        if (hairSelected == "hair0" && (headSelected == "head0" || headSelected == "head1") && (armSelected == "arm0" || armSelected == "arm1") && (footSelected == "foot0" || footSelected == "foot1")) {
            return 0;
        }
        if (hairSelected == "hair0" && (headSelected == "head2" || headSelected == "head3") && (armSelected == "arm0" || armSelected == "arm1") && (footSelected == "foot0" || footSelected == "foot1")) {
            return 1;
        }
        if (hairSelected == "hair0" && (headSelected == "head0" || headSelected == "head1") && (armSelected == "arm0" || armSelected == "arm1") && (footSelected == "foot2" || footSelected == "foot3")) {
            return 2;
        }
        if (hairSelected == "hair0" && (headSelected == "head2" || headSelected == "head3") && (armSelected == "arm1" || armSelected == "arm0") && (footSelected == "foot2" || footSelected == "foot3")) {
            return 3;
        }
        if (hairSelected == "hair0" && (headSelected == "head0" || headSelected == "head1") && armSelected == "arm1" && footSelected == "foot3") {
            return 4;
        }
        if (hairSelected == "hair0" && (headSelected == "head0" || headSelected == "head1") && armSelected == "arm1" && footSelected == "foot2") {
            return 5;
        }
        if (hairSelected == "hair1" && (headSelected == "head2" || headSelected == "head3") && (armSelected == "arm0" || armSelected == "arm1") && (footSelected == "foot2" || footSelected == "foot3")) {
            return 6;
        }
        if (hairSelected == "hair1" && (headSelected == "head0" || headSelected == "head1") && (armSelected == "arm1" || armSelected == "arm0") && (footSelected == "foot2" || footSelected == "foot3")) {
            return 7;
        }
        if (hairSelected == "hair1" && (headSelected == "head0" || headSelected == "head1") && armSelected == "arm0" && (footSelected == "foot0" || footSelected == "foot1")) {
            return 8;
        }
        if (hairSelected == "hair1" && (headSelected == "head2" || headSelected == "head3") && armSelected == "arm1" && (footSelected == "foot0" || footSelected == "foot1")) {
            return 9;
        }
        if (hairSelected == "hair1" && (headSelected == "head0" || headSelected == "head1") && armSelected == "arm1" && (footSelected == "foot0" || footSelected == "foot1")) {
            return 10;
        }
        if (hairSelected == "hair1" && (headSelected == "head2" || headSelected == "head3") && armSelected == "arm0" && (footSelected == "foot0" || footSelected == "foot1")) {
            return 11;
        }
        if (hairSelected == "hair2" && (headSelected == "head2" || headSelected == "head3") && (armSelected == "arm0" || armSelected == "arm1") && (footSelected == "foot2" || footSelected == "foot3")) {
            return 12;
        }
        if (hairSelected == "hair2" && (headSelected == "head0" || headSelected == "head1") && (armSelected == "arm0" || armSelected == "arm1") && (footSelected == "foot2" || footSelected == "foot3")) {
            return 13;
        }
        if (hairSelected == "hair2" && (headSelected == "head0" || headSelected == "head1") && armSelected == "arm1" && (footSelected == "foot0" || footSelected == "foot1")) {
            return 14;
        }
        if (hairSelected == "hair2" && (headSelected == "head2" || headSelected == "head3") && armSelected == "arm1" && (footSelected == "foot0" || footSelected == "foot1")) {
            return 15;
        }
        if (hairSelected == "hair2" && (headSelected == "head0" || headSelected == "head1") && armSelected == "arm0" && (footSelected == "foot0" || footSelected == "foot1")) {
            return 16;
        }
        if (hairSelected == "hair2" && (headSelected == "head2" || headSelected == "head3") && armSelected == "arm0" && (footSelected == "foot0" || footSelected == "foot1")) {
            return 17;
        }
        if (hairSelected == "hair3" && (headSelected == "head2" || headSelected == "head3") && (armSelected == "arm0" || armSelected == "arm1") && (footSelected == "foot2" || footSelected == "foot3")) {
            return 18;
        }
        if (hairSelected == "hair3" && (headSelected == "head0" || headSelected == "head1") && armSelected == "arm0" && (footSelected == "foot2" || footSelected == "foot3")) {
            return 19;
        }
        if (hairSelected == "hair3" && (headSelected == "head0" || headSelected == "head1") && armSelected == "arm1" && (footSelected == "foot0" || footSelected == "foot1")) {
            return 20;
        }
        if (hairSelected == "hair3" && (headSelected == "head2" || headSelected == "head3") && armSelected == "arm1" && (footSelected == "foot0" || footSelected == "foot1")) {
            return 21;
        }
        if (hairSelected == "hair3" && (headSelected == "head0" || headSelected == "head1") && armSelected == "arm0" && (footSelected == "foot0" || footSelected == "foot1")) {
            return 22;
        }
        if (hairSelected == "hair3" && (headSelected == "head2" || headSelected == "head3") && (armSelected == "arm1" || armSelected == "arm0") && (footSelected == "foot0" || footSelected == "foot1")) {
            return 23;
        }
        if (hairSelected == "hair4" && (headSelected == "head0" || headSelected == "head1") && (armSelected == "arm0" || armSelected == "arm1") && (footSelected == "foot0" || footSelected == "foot1")) {
            return 24;
        }
        if (hairSelected == "hair4" && (headSelected == "head2" || headSelected == "head3") && (armSelected == "arm0" || armSelected == "arm1") && (footSelected == "foot0" || footSelected == "foot1")) {
            return 25;
        }
        if (hairSelected == "hair4" && (headSelected == "head2" || headSelected == "head3") && (armSelected == "arm0" || armSelected == "arm1") && (footSelected == "foot2" || footSelected == "foot3")) {
            return 26;
        }
        if (hairSelected == "hair4" && (headSelected == "head0" || headSelected == "head1") && (armSelected == "arm0" || armSelected == "arm1") && (footSelected == "foot3" || footSelected == "foot2")) {
            return 27;
        }
        if (hairSelected == "hair4" && (headSelected == "head2" || headSelected == "head3") && (armSelected == "arm0" || armSelected == "arm1") && (footSelected == "foot2" || footSelected == "foot3")) {
            return 28;
        }
        if (hairSelected == "hair4" && (headSelected == "head0" || headSelected == "head1") && (armSelected == "arm0" || armSelected == "arm1") && (footSelected == "foot2" || footSelected == "foot3")) {
            return 29;
        }
        if (hairSelected == "hair5" && (headSelected == "head0" || headSelected == "head1") && (armSelected == "arm0" || armSelected == "arm1") && (footSelected == "foot0" || footSelected == "foot1")) {
            return 30;
        }
        if (hairSelected == "hair5" && (headSelected == "head2" || headSelected == "head3") && (armSelected == "arm0" || armSelected == "arm1") && (footSelected == "foot0" || footSelected == "foot1")) {
            return 31;
        }
        if (hairSelected == "hair5" && (headSelected == "head2" || headSelected == "head3") && armSelected == "arm0" && (footSelected == "foot3" || footSelected == "foot2")) {
            return 32;
        }
        if (hairSelected == "hair5" && (headSelected == "head0" || headSelected == "head1") && armSelected == "arm0" && (footSelected == "foot2" || footSelected == "foot3")) {
            return 33;
        }
        if (hairSelected == "hair5" && (headSelected == "head2" || headSelected == "head3") && armSelected == "arm1" && (footSelected == "foot3" || footSelected == "foot2")) {
            return 34;
        }
        if (hairSelected == "hair5" && (headSelected == "head0" || headSelected == "head1") && armSelected == "arm1" && (footSelected == "foot3" || footSelected == "foot2")) {
            return 35;
        }
        return -1;
    },
};
var headSelected, hairSelected, footSelected, armSelected;
var velocityLevel1 = {
    ship: 80,
    suit: 70,
    mobile: 140
};

var velocityLevel2 = {
    moveX: 170,
    firstPart: 280,
    secondPart: 320,
    mobile: 320
};

var spriteSizes = [{
    name: "sprite0",
    widthHS: 234,
    heightHS: 300,
    width: 438,
    height: 60
}, {
    name: "sprite1",
    widthHS: 236,
    heightHS: 300,
    width: 438,
    height: 60
}, {
    name: "sprite2",
    widthHS: 246,
    heightHS: 300,
    width: 469,
    height: 60
}, {
    name: "sprite3",
    widthHS: 249,
    heightHS: 300,
    width: 431,
    height: 60
}, {
    name: "sprite4",
    widthHS: 232,
    heightHS: 300,
    width: 431,
    height: 60
}, {
    name: "sprite5",
    widthHS: 238,
    heightHS: 300,
    width: 438,
    height: 60
}, {
    name: "sprite6",
    widthHS: 241,
    heightHS: 300,
    width: 431,
    height: 61
}, {
    name: "sprite7",
    widthHS: 239,
    heightHS: 300,
    width: 431,
    height: 60
}, {
    name: "sprite8",
    widthHS: 239,
    heightHS: 300,
    width: 431,
    height: 60
}, {
    name: "sprite9",
    widthHS: 233,
    heightHS: 300,
    width: 431,
    height: 60
}, {
    name: "sprite10",
    widthHS: 226,
    heightHS: 300,
    width: 431,
    height: 60
}, {
    name: "sprite11",
    widthHS: 215,
    heightHS: 300,
    width: 431,
    height: 60
}, {
    name: "sprite12",
    widthHS: 236,
    heightHS: 300,
    width: 431,
    height: 60
}, {
    name: "sprite13",
    widthHS: 234,
    heightHS: 300,
    width: 431,
    height: 60
}, {
    name: "sprite14",
    widthHS: 230,
    heightHS: 300,
    width: 439,
    height: 60
}, {
    name: "sprite15",
    widthHS: 233,
    heightHS: 300,
    width: 436,
    height: 60
}, {
    name: "sprite16",
    widthHS: 234,
    heightHS: 300,
    width: 431,
    height: 60
}, {
    name: "sprite17",
    widthHS: 230,
    heightHS: 300,
    width: 472,
    height: 60
}, {
    name: "sprite18",
    widthHS: 247,
    heightHS: 300,
    width: 447,
    height: 60
}, {
    name: "sprite19",
    widthHS: 239,
    heightHS: 300,
    width: 431,
    height: 60
}, {
    name: "sprite20",
    widthHS: 230,
    heightHS: 300,
    width: 439,
    height: 60
}, {
    name: "sprite21",
    widthHS: 225,
    heightHS: 300,
    width: 431,
    height: 60
}, {
    name: "sprite22",
    widthHS: 234,
    heightHS: 300,
    width: 431,
    height: 60
}, {
    name: "sprite23",
    widthHS: 230,
    heightHS: 300,
    width: 431,
    height: 60
}, {
    name: "sprite24",
    widthHS: 233,
    heightHS: 300,
    width: 441,
    height: 60
}, {
    name: "sprite25",
    widthHS: 225,
    heightHS: 300,
    width: 444,
    height: 60
}, {
    name: "sprite26",
    widthHS: 247,
    heightHS: 300,
    width: 472,
    height: 60
}, {
    name: "sprite27",
    widthHS: 238,
    heightHS: 300,
    width: 472,
    height: 60
}, {
    name: "sprite28",
    widthHS: 231,
    heightHS: 300,
    width: 472,
    height: 60
}, {
    name: "sprite29",
    widthHS: 238,
    heightHS: 300,
    width: 472,
    height: 60
}, {
    name: "sprite30",
    widthHS: 216,
    heightHS: 300,
    width: 469,
    height: 60
}, {
    name: "sprite31",
    widthHS: 223,
    heightHS: 300,
    width: 469,
    height: 60
}, {
    name: "sprite32",
    widthHS: 214,
    heightHS: 300,
    width: 434,
    height: 60
}, {
    name: "sprite33",
    widthHS: 212,
    heightHS: 300,
    width: 434,
    height: 60
}, {
    name: "sprite34",
    widthHS: 211,
    heightHS: 300,
    width: 472,
    height: 60
}, {
    name: "sprite35",
    widthHS: 219,
    heightHS: 300,
    width: 472,
    height: 60
}, {
    name: "spriteA",
    widthHS: 219,
    heightHS: 300,
    width: 394,
    height: 60
}];
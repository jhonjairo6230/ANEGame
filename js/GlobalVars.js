var game;
var countLives = 3;
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
        if (hairSelected == "hair0" && (headSelected == "head2" || headSelected == "head3") && armSelected == "arm1" && (footSelected == "foot2" || footSelected == "foot3")) {
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
        if (hairSelected == "hair3" && (headSelected == "head2" || headSelected == "head3") && armSelected == "arm0" && (footSelected == "foot2" || footSelected == "foot3")) {
            return 18;
        }
        if (hairSelected == "hair3" && (headSelected == "head0" || headSelected == "head1") && armSelected == "arm0" && (footSelected == "foot1" || footSelected == "foot0")) {
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
        if (hairSelected == "hair3" && (headSelected == "head2" || headSelected == "head3") && armSelected == "arm1" && (footSelected == "foot0" || footSelected == "foot1")) {
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
        if (hairSelected == "hair5" && (headSelected == "head0" || headSelected == "head1") && armSelected == "arm0" && (footSelected == "foot0" || footSelected == "foot1")) {
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
var velocityLevel1 = 80;
var spriteSizes = [{
    width: 65.18,
    height: 100
}, {
    width: 69.09,
    height: 100
}, {
    width: 70.55,
    height: 100
}, {
    width: 68.18,
    height: 100
}, {
    width: 67.73,
    height: 100
}, {
    width: 71,
    height: 100
}, {
    width: 69.82,
    height: 100
}, {
    width: 67.1,
    height: 100
}, {
    width: 68.91,
    height: 100
}, {
    width: 67.1,
    height: 100
}, {
    width: 67.55,
    height: 100
}, {
    width: 63.82,
    height: 100
}, {
    width: 59.91,
    height: 100
}];

sayHelloSpriteSizes = [{
    name: "sprite0",
    width: 234,
    height: 300
}, {
    name: "sprite1",
    width: 236,
    height: 300
}, {
    name: "sprite2",
    width: 246,
    height: 300
}, {
    name: "sprite3",
    width: 249,
    height: 300
}, {
    name: "sprite4",
    width: 232,
    height: 300
}, {
    name: "sprite5",
    width: 238,
    height: 300
}, {
    name: "sprite6",
    width: 241,
    height: 300
}, {
    name: "sprite7",
    width: 239,
    height: 300
}, {
    name: "sprite8",
    width: 239,
    height: 300
}, {
    name: "sprite9",
    width: 233,
    height: 300
}, {
    name: "sprite10",
    width: 226,
    height: 300
}, {
    name: "sprite11",
    width: 215,
    height: 300
}, {
    name: "sprite12",
    width: 236,
    height: 300
}, {
    name: "sprite13",
    width: 234,
    height: 300
}, {
    name: "sprite14",
    width: 230,
    height: 300
}, {
    name: "sprite15",
    width: 233,
    height: 300
}, {
    name: "sprite16",
    width: 234,
    height: 300
}, {
    name: "sprite17",
    width: 230,
    height: 300
}, {
    name: "sprite18",
    width: 247,
    height: 300
}, {
    name: "sprite19",
    width: 239,
    height: 300
}, {
    name: "sprite20",
    width: 230,
    height: 300
}, {
    name: "sprite21",
    width: 225,
    height: 300
}, {
    name: "sprite22",
    width: 234,
    height: 300
}, {
    name: "sprite23",
    width: 230,
    height: 300
}, {
    name: "sprite24",
    width: 233,
    height: 300
}, {
    name: "sprite25",
    width: 225,
    height: 300
}, {
    name: "sprite26",
    width: 247,
    height: 300
}, {
    name: "sprite27",
    width: 238,
    height: 300
}, {
    name: "sprite28",
    width: 231,
    height: 300
}, {
    name: "sprite29",
    width: 238,
    height: 300
}, {
    name: "sprite30",
    width: 216,
    height: 300
}, {
    name: "sprite31",
    width: 223,
    height: 300
}, {
    name: "sprite32",
    width: 214,
    height: 300
}, {
    name: "sprite33",
    width: 212,
    height: 300
}, {
    name: "sprite34",
    width: 211,
    height: 300
}, {
    name: "sprite35",
    width: 219,
    height: 300
}];
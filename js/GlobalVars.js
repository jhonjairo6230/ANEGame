var game;
var countLives = 3;
var RutaEspectral = {
    selectSprite: function (hairSelected, headSelected, armSelected, footSelected) {
        if (hairSelected == "hair0" && headSelected.key == "head0" && armSelected.key == "arm0" && footSelected.key == "foot2") {
            return 0
        }
        if (hairSelected == "hair3" && headSelected == "head3" && armSelected == "arm1" && footSelected == "foot3") {
            return 1
        }
        if (hairSelected == "hair2" && headSelected == "head3" && armSelected == "arm1" && footSelected == "foot3") {
            return 2
        }
        if (hairSelected == "hair1" && headSelected == "head1" && armSelected == "arm0" && footSelected == "foot2") {
            return 3
        }
        if (hairSelected == "hair3" && headSelected == "head1" && armSelected == "arm0" && footSelected == "foot2") {
            return 4
        }
        if (hairSelected == "hair2" && headSelected == "head1" && armSelected == "arm0" && footSelected == "foot2") {
            return 5
        }
        if (hairSelected == "hair0" && headSelected == "head0" && armSelected == "arm0" && footSelected == "foot0") {
            return 6
        }
        if (hairSelected == "hair4" && headSelected == "head0" && armSelected == "arm0" && footSelected == "foot0") {
            return 7
        }
        if (hairSelected == "hair5" && headSelected == "head0" && armSelected == "arm0" && footSelected == "foot0") {
            return 8
        }
        if (hairSelected == "hair0" && headSelected == "head2" && armSelected == "arm0" && footSelected == "foot0") {
            return 9
        }
        if (hairSelected == "hair4" && headSelected == "head2" && armSelected == "arm0" && footSelected == "foot0") {
            return 10
        }
        if (hairSelected == "hair5" && headSelected == "head2" && armSelected == "arm0" && footSelected == "foot0") {
            return 11
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

var sayHelloSpriteSizes = [{
    width: 241,
    height: 300
}, {
    width: 247,
    height: 300
}, {
    width: 236,
    height: 300
}, {
    width: 242,
    height: 300
}, {
    width: 239,
    height: 300
}, {
    width: 234,
    height: 300
}, {
    width: 234,
    height: 300
}, {
    width: 233,
    height: 300
}, {
    width: 216,
    height: 300
}, {
    width: 236,
    height: 300
}, {
    width: 225,
    height: 300
}, {
    width: 223,
    height: 300
}, {
    width: 224,
    height: 300
}];
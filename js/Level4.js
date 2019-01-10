var player, bioHSprite, platforms, elements, cursors, enemies, enemiesBio;
var fishesSprite = [],
    biosSprite = [];
var initLVl4 = false,
    isUp = true,
    isLeft = true,
    isLeft12 = true;
var collectables, messageInfo, messageRadio;
var countSmoke = 0,
    countHorn = 0,
    countTelegraph = 0,
    countRadio = 0;
var increment = -120;
var btnRadio, btnHorn, btnSmoke, btnTelegraph;
RutaEspectral.Level4 = function (game) {};
RutaEspectral.Level4.prototype = {
    preload: function () {
        game.load.image('background', 'assets/level4/backgroundLVL4.png');
        //game.load.spritesheet('spritePlayer', 'assets/sprites/sprite' + selectedSprite + '.png', spriteSizes[selectedSprite].width / 11, spriteSizes[selectedSprite].height);
        game.load.spritesheet('spritePlayer', 'assets/sprites/sprite' + 14 + '.png', spriteSizes[14].width / 11, spriteSizes[14].height);
        game.load.spritesheet('spriteBio', 'assets/level3/bioSprite.png', (120 / 3), 40);
        game.load.spritesheet('spriteCar', 'assets/level4/carSprite.png', (689 / 6), 60);
        game.load.spritesheet('spriteCar', 'assets/level4/carSprite.png', (10391 / 6), 80);
    },
    create() {
        levelState = 4;
        game.add.tileSprite(0, 0, 7056, 600, 'background');
        game.world.setBounds(0, 0, 7056, 600);
        game.renderer.roundPixels = true;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        setPlayer();
    },
    update() {},
    render() {}
}
var selectedSprite, player, barG, elements, rockS;
var isInitG = false;
var video;
var sprite;
RutaEspectral.Videos = function (game) {

};
RutaEspectral.Videos.prototype = {
    preload: function () {
        if (!isMobile) {
            switch (levelState) {
                case 1:
                    game.load.video('video', 'assets/videos/nave.mp4');
                    break;
                case 2:
                    game.load.video('video', 'assets/videos/astronauta.mp4');
                    break;
                case 6:
                    game.load.video('video', 'assets/videos/creditos.mp4');
                    break;
                default:
                    break;
            }
        } else {
            switch (levelState) {
                case 1:
                    game.load.image('image', 'assets/level1/nave.png');
                    break;
                case 2:
                    game.load.video('image', 'assets/level1/astronauta.png');
                    break;
                case 6:
                    game.load.video('video', 'assets/videos/creditos.mp4');
                    break;
                default:
                    break;
            }
        }
    },
    create: function () {
        timerL1 = game.time.create(false);
        timerEvent = timerL1.add(Phaser.Timer.MINUTE * 0 + Phaser.Timer.SECOND * 10, this.endTimer, this);
        timerL1.start();
        if (!isMobile || levelState == 6) {
            video = game.add.video('video');
            sprite = video.addToWorld(800, 600, 1, 1, 1, 1);
            video.play();
        } else {
            game.add.image(0, 0, 'image');
        }
    },
    render: function () {
        // If our timer is running, show the time in a nicely formatted way, else show 'Done!'
        if (timerL1.running) {
            timeRest = this.formatTime(Math.round((timerEvent.delay - timerL1.ms) / 1000));
            // game.debug.text(elementsCollected + "-" + this.formatTime(Math.round((timerEvent.delay - timerL1.ms) / 1000)), 15, 18, "#2565e5");
        } else {
            //game.debug.text("Done!", 2, 14, "#0f0");
            isInit = false;
            spaceSuitPhysics = false;
            switch (levelState) {
                case 1:
                    game.state.start('Level1');
                    break;
                case 2:
                    game.state.start('Level2');
                    break;
                default:
                    break;
            }

        }
    },
    endTimer: function () {
        // Stop the timer when the delayed event triggers
        timerL1.stop();
    },
    formatTime: function (s) {
        // Convert seconds (s) to a nicely formatted and padded time string
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);
    }
};
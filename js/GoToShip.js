var selectedSprite, player, barG, elements, rockS;
var isInitG = false;
var video;
var sprite;
RutaEspectral.GoToShip = function (game) {

};
RutaEspectral.GoToShip.prototype = {
    preload: function () {
        game.load.video('nave', 'assets/videos/nave.mp4');
    },
    create: function () {
        timerL1 = game.time.create(false);
        timerEvent = timerL1.add(Phaser.Timer.MINUTE * 0 + Phaser.Timer.SECOND * 10, this.endTimer, this);
        timerL1.start();
        video = game.add.video('nave');
        sprite = video.addToWorld(800, 600, 1, 1, .7, .85);
        video.play();
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
            game.state.start('Level1');
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
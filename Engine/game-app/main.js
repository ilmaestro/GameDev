var canvas = document.getElementById("canvas");

var game = new Engine.GameObject(canvas);
game.contentPath = "game-media/";

var mainScene = new game1.MainScene();

game.assetsLoaded = function () {
    (function animloop() {
        requestAnimFrame(animloop);
        game.mainLoop();
    })();
};

game.setScene(mainScene);

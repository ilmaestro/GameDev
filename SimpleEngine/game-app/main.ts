/// <reference path="Game/SimpleGame.ts" />
/// <reference path="Engine/ContentManager.ts" />
/// <reference path="Engine/GameController.ts" />
(function () {
    var logger = function (message) {
        console.log(message);
    }
    var canvas = document.getElementById("canvas");
    var gc = new Engine.GameController(canvas);
    gc.contentManager.root = "game-media/";
    gc.setWorld(new Game.SimpleGame());

} ());
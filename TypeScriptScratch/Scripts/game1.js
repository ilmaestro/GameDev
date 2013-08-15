/// <reference path="Player.ts" />
/// <reference path="typeings/jaws.d.ts" />
var Game;
(function (Game) {
    var gameState = (function () {
        function gameState() {
        }
        gameState.prototype.setup = function () {
            this.player = new Game.Classes.Player();
        };

        gameState.prototype.update = function () {
        };

        gameState.prototype.draw = function () {
            jaws.clear();
            this.player.draw();
        };
        return gameState;
    })();
    Game.gameState = gameState;
})(Game || (Game = {}));
jaws.start(Game.gameState);

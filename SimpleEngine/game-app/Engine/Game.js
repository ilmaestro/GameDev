/// <reference path="Graphics/SpriteCollection.ts" />
/// <reference path="Graphics/Sprite.ts" />
/// <reference path="Graphics/SpriteManager.ts" />
// Module
var Engine;
(function (Engine) {
    // Class
    var Game = (function () {
        // Constructor
        function Game() {
        }
        Game.prototype.update = function () {
        };
        Game.prototype.draw = function () {
        };
        return Game;
    })();
    Engine.Game = Game;
})(Engine || (Engine = {}));

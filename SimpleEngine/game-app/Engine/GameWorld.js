/// <reference path="Graphics/SpriteRenderer.ts" />
/// <reference path="GameController.ts" />
// Module
var Engine;
(function (Engine) {
    // Class
    var GameWorld = (function () {
        function GameWorld() {
        }
        GameWorld.prototype.setup = function (game) {
        };
        GameWorld.prototype.update = function (game) {
        };
        GameWorld.prototype.draw = function (spriteRenderer) {
        };
        GameWorld.prototype.ready = function () {
        };
        return GameWorld;
    })();
    Engine.GameWorld = GameWorld;
})(Engine || (Engine = {}));

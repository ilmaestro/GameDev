var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../Engine/Graphics/Sprite.ts" />
var Game;
(function (Game) {
    // Class
    var AlientShip = (function (_super) {
        __extends(AlientShip, _super);
        // Constructor
        function AlientShip(textureName, x, y, width, height) {
            _super.call(this, textureName, x, y, width, height);
            this.width = width;
            this.height = height;
        }
        AlientShip.prototype.update = function (game) {
            this.position.x += 1 / 1000.0;
            _super.prototype.update.call(this, game);
        };

        AlientShip.prototype.draw = function (spriteManager) {
            _super.prototype.draw.call(this, spriteManager);
        };
        return AlientShip;
    })(Engine.Graphics.Sprite);
    Game.AlientShip = AlientShip;
})(Game || (Game = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../Engine/GameController.ts" />
/// <reference path="../Engine/Graphics/SpriteRenderer.ts" />
/// <reference path="../Engine/Graphics/Sprite.ts" />
var Game;
(function (Game) {
    // Class
    var AlientShip = (function (_super) {
        __extends(AlientShip, _super);
        // Constructor
        function AlientShip(name, x, y, width, height) {
            _super.call(this, name, x, y, width, height);
            this.width = width;
            this.height = height;
        }
        AlientShip.prototype.update = function (gc) {
            gc.logger("updating Alien Ship");
            this.position.x += 1 / 1000.0;
            _super.prototype.update.call(this, gc);
        };

        AlientShip.prototype.draw = function (spriteRenderer) {
            //spriteRenderer.context.fillStyle = "#000";
            //spriteRenderer.context.fillRect(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
            _super.prototype.draw.call(this, spriteRenderer);
        };
        return AlientShip;
    })(Engine.Graphics.Sprite);
    Game.AlientShip = AlientShip;
})(Game || (Game = {}));

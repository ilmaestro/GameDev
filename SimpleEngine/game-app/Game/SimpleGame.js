var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="AlienShip.ts" />
/// <reference path="../Engine/Graphics/Sprite.ts" />
/// <reference path="../Engine/Graphics/SpriteManager.ts" />
/// <reference path="../Engine/Game.ts" />
var Game;
(function (Game) {
    // Class
    var SimpleGame = (function (_super) {
        __extends(SimpleGame, _super);
        // Constructor
        function SimpleGame(canvas) {
            _super.call(this);
            this.canvas = canvas;
            this.graphicsContext = this.canvas.getContext('2d');
            this.screenWidth = this.canvas.width;
            this.screenHeight = this.canvas.height;
            this.spriteManager = new Engine.Graphics.SpriteManager(this.graphicsContext);
            this.alienShip = new Game.AlientShip("AlienShip", 0, 0, 10, 10);
            this.spriteCollection.add(this.alienShip);
        }
        SimpleGame.prototype.update = function () {
            this.spriteCollection.updateAll(this);
            _super.prototype.update.call(this);
        };

        SimpleGame.prototype.draw = function () {
            this.spriteCollection.drawAll(this.spriteManager);
            _super.prototype.draw.call(this);
        };
        return SimpleGame;
    })(Engine.Game);
    Game.SimpleGame = SimpleGame;
})(Game || (Game = {}));

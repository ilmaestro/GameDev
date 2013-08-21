var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../Engine/Graphics/SpriteSheet.ts" />
/// <reference path="AlienShip.ts" />
/// <reference path="../Engine/Graphics/Sprite.ts" />
/// <reference path="../Engine/Graphics/SpriteRenderer.ts" />
/// <reference path="../Engine/GameWorld.ts" />
var Game;
(function (Game) {
    // Class
    var SimpleGame = (function (_super) {
        __extends(SimpleGame, _super);
        // Constructor
        function SimpleGame() {
            _super.call(this);
            this.alienShip_offsetX = 79;
            this.alienShip_offsetY = 0;
            this.alienShip_startX = 10;
            this.alienShip_startY = 10;
            this.alienShip_width = 37;
            this.alienShip_height = 43;
        }
        SimpleGame.prototype.setup = function (game) {
            var self = this;
            this.spriteCollection = new Engine.Graphics.SpriteCollection();
            self.alienShip = new Game.AlientShip("AlienShip", self.alienShip_startX, self.alienShip_startY, self.alienShip_width, self.alienShip_height);
            self.spriteCollection.add(self.alienShip);
            var alientRect = new Engine.Graphics.Rectangle(self.alienShip_offsetX, self.alienShip_offsetY, self.alienShip_width, self.alienShip_height);

            game.contentManager.root = "game-media/";
            game.contentManager.loadImage("sprites.png").then(function (image) {
                game.logger("spriteSheet loaded from: " + image.src);
                var spriteSheet = new Engine.Graphics.SpriteSheet(image);
                game.spriteRenderer.setSpriteSheet(spriteSheet);
                game.spriteRenderer.spriteSheet.addFrame("AlienShip", alientRect, 1);
                self.ready();
            });
        };

        SimpleGame.prototype.update = function (game) {
            this.spriteCollection.updateAll(game);
            _super.prototype.update.call(this, game);
        };

        SimpleGame.prototype.draw = function (spriteRenderer) {
            this.spriteCollection.drawAll(spriteRenderer);
            _super.prototype.draw.call(this, spriteRenderer);
        };

        SimpleGame.prototype.ready = function () {
        };
        return SimpleGame;
    })(Engine.GameWorld);
    Game.SimpleGame = SimpleGame;
})(Game || (Game = {}));

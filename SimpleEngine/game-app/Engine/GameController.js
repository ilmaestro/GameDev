/// <reference path="GameWorld.ts" />
/// <reference path="ContentManager.ts" />
/// <reference path="Graphics/SpriteCollection.ts" />
/// <reference path="Graphics/Sprite.ts" />
/// <reference path="Graphics/SpriteRenderer.ts" />
// Module
var Engine;
(function (Engine) {
    // Class
    var GameController = (function () {
        // Constructor
        function GameController(canvas) {
            this.canvas = canvas;
            this.contentManager = new Engine.ContentManager();
            this.graphicsContext = this.canvas.getContext('2d');
            this.screenWidth = this.canvas.width;
            this.screenHeight = this.canvas.height;
            this.spriteRenderer = new Engine.Graphics.SpriteRenderer(this.graphicsContext);
        }
        GameController.prototype.startGame = function () {
            this.logger("starting game...");
            this.world.update(this);
            this.world.draw(this.spriteRenderer);
        };

        GameController.prototype.setWorld = function (world) {
            var self = this;
            self.logger("creating world...");
            self.world = world;
            self.world.setup(this);
            self.world.ready = function () {
                self.startGame();
            };
        };

        GameController.prototype.logger = function (message) {
            console.log(message);
        };
        return GameController;
    })();
    Engine.GameController = GameController;
})(Engine || (Engine = {}));

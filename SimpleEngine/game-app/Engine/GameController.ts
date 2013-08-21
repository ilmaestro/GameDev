/// <reference path="GameWorld.ts" />
/// <reference path="ContentManager.ts" />
/// <reference path="Graphics/SpriteCollection.ts" />
/// <reference path="Graphics/Sprite.ts" />
/// <reference path="Graphics/SpriteRenderer.ts" />
// Module
module Engine {
    // Class
    export class GameController {
        graphicsContext: CanvasRenderingContext2D;
        spriteRenderer: Graphics.SpriteRenderer;
        contentManager: Engine.ContentManager;
        world: Engine.GameWorld;

        screenWidth: number;
        screenHeight: number;

        // Constructor
        constructor(public canvas) {
            this.contentManager = new Engine.ContentManager();
            this.graphicsContext = this.canvas.getContext('2d');
            this.screenWidth = this.canvas.width;
            this.screenHeight = this.canvas.height;
            this.spriteRenderer = new Engine.Graphics.SpriteRenderer(this.graphicsContext);
        }
        
        startGame() {
            this.logger("starting game...");
            this.world.update(this);
            this.world.draw(this.spriteRenderer);
        }

        setWorld(world: Engine.GameWorld) {
            var self = this;
            self.logger("creating world...");
            self.world = world;
            self.world.setup(this);
            self.world.ready = function () {
                self.startGame();
            }
        }

        logger(message: string) {
            console.log(message);
        }
    }

}


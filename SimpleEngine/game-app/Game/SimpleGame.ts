/// <reference path="AlienShip.ts" />
/// <reference path="../Engine/Graphics/Sprite.ts" />
/// <reference path="../Engine/Graphics/SpriteManager.ts" />
/// <reference path="../Engine/Game.ts" />
module Game {

    // Class
    export class SimpleGame extends Engine.Game {
        alienShip: AlientShip;

        // Constructor
        constructor(public canvas: HTMLCanvasElement) {
            super();
            this.graphicsContext = this.canvas.getContext('2d');
            this.screenWidth = this.canvas.width;
            this.screenHeight = this.canvas.height;
            this.spriteManager = new Engine.Graphics.SpriteManager(this.graphicsContext);
            this.alienShip = new AlientShip("AlienShip", 0, 0, 10, 10);
            this.spriteCollection.add(this.alienShip);
        }

        update() {
            this.spriteCollection.updateAll(this);
            super.update();
        }

        draw() {
            this.spriteCollection.drawAll(this.spriteManager);
            super.draw();
        }

    }

}

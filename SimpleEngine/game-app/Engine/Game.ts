/// <reference path="Graphics/SpriteCollection.ts" />
/// <reference path="Graphics/Sprite.ts" />
/// <reference path="Graphics/SpriteManager.ts" />
// Module
module Engine {

    // Class
    export class Game {
        graphicsContext: CanvasRenderingContext2D;
        spriteManager: Graphics.SpriteManager;
        //contentManager;
        spriteCollection: Graphics.SpriteCollection;

        screenWidth: number;
        screenHeight: number;

        // Constructor
        constructor () { }

        update() { }
        draw() { }
    }

}


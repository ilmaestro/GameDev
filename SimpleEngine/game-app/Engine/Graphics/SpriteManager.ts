/// <reference path="Rectangle.ts" />
/// <reference path="Texture2d.ts" />
/// <reference path="Point.ts" />
/*
Sprite manager 

used by game to load images and manage sprite collections

*/


// Module
module Engine.Graphics {

    // Class
    export class SpriteManager {
        context: CanvasRenderingContext2D;        

        // Constructor
        constructor(context) {
            this.context = context;
        }

        draw(texture: Texture2d, position: Point, sourceBounds: Rectangle, destBounds: Rectangle) {
            this.context.drawImage(texture.image, sourceBounds.x, sourceBounds.y, destBounds.width, destBounds.height, destBounds.x, destBounds.y, destBounds.width, destBounds.height);
        }

    }

}


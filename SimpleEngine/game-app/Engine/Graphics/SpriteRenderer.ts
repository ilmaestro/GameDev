/// <reference path="SpriteSheet.ts" />
/// <reference path="Rectangle.ts" />
/// <reference path="Texture2d.ts" />
/// <reference path="Point.ts" />
/*
Sprite renderer
used by game to render images
*/
// Module
module Engine.Graphics {

    // Class
    export class SpriteRenderer {
        context: CanvasRenderingContext2D;        
        spriteSheet: Engine.Graphics.SpriteSheet;
        // Constructor
        constructor(context) {
            this.context = context;
        }

        setSpriteSheet(spriteSheet: Engine.Graphics.SpriteSheet) {
            this.spriteSheet = spriteSheet;
        }

        //draw(texture: Texture2d, position: Point, sourceBounds: Rectangle, destBounds: Rectangle) {
        //    this.context.drawImage(texture.image, sourceBounds.x, sourceBounds.y, destBounds.width, destBounds.height, destBounds.x, destBounds.y, destBounds.width, destBounds.height);
        //}

        draw(sprite: string, frame: number, position: Point) {
            var s = this.spriteSheet.getFrame(sprite, frame);
            this.context.drawImage(this.spriteSheet.image, s.x, s.y, s.width, s.height, position.x, position.y, s.width, s.height);
        }
    }

}


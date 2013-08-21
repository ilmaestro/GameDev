/// <reference path="../GameController.ts" />
/// <reference path="SpriteRenderer.ts" />
/// <reference path="Point.ts" />
/// <reference path="Texture2d.ts" />
/// <reference path="Rectangle.ts" />
interface ISprite {
    //position: Engine.Graphics.Point;
    rectangle: Engine.Graphics.Rectangle;
    //texture: Engine.Graphics.Texture2d;
    name: string;
    isAlive: boolean;
    update(game: Engine.GameController): void;
    draw(spriteRenderer: Engine.Graphics.SpriteRenderer): void;
}

// Module
module Engine.Graphics {
    export class Sprite implements ISprite {
        //public texture: Texture2d;
        public rectangle: Rectangle;
        public isAlive: boolean;

        constructor(public name: string, x: number, y: number, public width: number, public height: number) {
            this.rectangle = new Rectangle(x, y, this.width, this.height);
            this.isAlive = true;
        }

        draw(spriteRenderer: SpriteRenderer): void{
            if (this.isAlive) {
                //TODO: need a way to pass in the source Bounds, in case the image source is a sprite sheet.
                //TODO: frames support?
                //spriteRenderer.draw(this.texture, this.position, this.rectangle, this.rectangle);
                spriteRenderer.draw(this.name, 1, this.position);
            }
        }

        update(game: Engine.GameController): void{
            //check if we've fallen off the screen, if so, we're no longer alive.
            if(this.rectangle.right > game.screenWidth ||
                this.rectangle.left < 0 ||
                this.rectangle.top < 0 ||
                this.rectangle.bottom > game.screenHeight) {
                    this.isAlive = false;
            }
        }

        get position(): Point {
            return new Point(this.rectangle.x, this.rectangle.y);
        }

        set position(point: Point) {
            this.rectangle.x = point.x;
            this.rectangle.y = point.y;
        }
    }

}
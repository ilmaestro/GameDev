/// <reference path="../Engine/GameController.ts" />
/// <reference path="../Engine/Graphics/SpriteRenderer.ts" />
/// <reference path="../Engine/Graphics/Sprite.ts" />
module Game {

    // Class
    export class AlientShip extends Engine.Graphics.Sprite {
        // Constructor
        constructor(name: string,x: number, y: number, public width: number, public height: number) {
            super(name, x, y, width, height);
        }

        update(gc: Engine.GameController) {
            gc.logger("updating Alien Ship");
            this.position.x += 1 / 1000.0;
            super.update(gc);
        }

        draw(spriteRenderer: Engine.Graphics.SpriteRenderer): void {
            //spriteRenderer.context.fillStyle = "#000";
            //spriteRenderer.context.fillRect(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
            super.draw(spriteRenderer);
        }
    }

}

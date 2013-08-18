/// <reference path="../Engine/Graphics/Sprite.ts" />
module Game {

    // Class
    export class AlientShip extends Engine.Graphics.Sprite {
        // Constructor
        constructor(textureName: string, x: number, y: number, public width: number, public height: number) {
            super(textureName, x, y, width, height);
        }

        update(game) {
            this.position.x += 1 / 1000.0;
            super.update(game);
        }

        draw(spriteManager): void {

            super.draw(spriteManager);
        }
    }

}

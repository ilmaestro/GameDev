/// <reference path="../GameController.ts" />
/// <reference path="SpriteRenderer.ts" />
/// <reference path="Sprite.ts" />
// Module
module Engine.Graphics {

    // Class
    export class SpriteCollection {
        public sprites: Sprite[];

        // Constructor
        constructor() {
            this.sprites = [];
        }

        add(sprite: Sprite) {
            this.sprites.push(sprite);
        }

        remove(sprite: Sprite) {
            var index = this.sprites.indexOf(sprite);
            if (index > -1) {
                this.sprites.splice(index, 1);
            }
        }

        updateAll(game: Engine.GameController) {
            var i = 0,
                max = this.sprites.length;

            for (; i < max; i++) {
                this.sprites[i].update(game);

                //remove if no longer alive.
                if (!this.sprites[i].isAlive) {                    
                    this.remove(this.sprites[i]);
                }
            }
        }

        drawAll(spriteRenderer: SpriteRenderer) {
            var i = 0,
                max = this.sprites.length;

            for (; i < max; i++) {
                this.sprites[i].draw(spriteRenderer);
            }
        }
    }
}
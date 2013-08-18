/// <reference path="SpriteSet.ts" />
/// <reference path="Component.ts" />
// Module
module Engine.Component {
    // Class
    export class Sprite extends ComponentObject {
        container: Container;
        spriteSet: SpriteSet;

        // Constructor
        constructor(public spriteKey: string, public x: number, public y: number, public width: number, public height: number, public rotation: number, public zIndex: number, public opacity: number) {
            super(x, y, width, height, rotation, zIndex, opacity);
        }

        update(): void { }

        render(): void { //frame: number
            var frame: number = 0;
            this.spriteSet.render(this.game.context, this.spriteKey, this.x, this.y, frame);
        }

    }

}

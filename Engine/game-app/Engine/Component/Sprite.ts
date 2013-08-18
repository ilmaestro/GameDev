/// <reference path="SpriteSet.ts" />
/// <reference path="Component.ts" />
// Module
module Engine.Component {
    // Class
    export class Sprite extends ComponentObject {
        public container: Container;
        public spriteSet: SpriteSet;
        public spriteKey: string;

        // Constructor
        constructor() {
            super();
        }

        update(): void { }

        render(): void { //frame: number
            var frame: number = 0;
            this.spriteSet.render(this.game.context, this.spriteKey, this.x, this.y, frame);
        }

    }

}


// Module
module Engine.Component {
    export interface ISpriteData {
        sx: number;
        sy: number;
        w: number;
        h: number;
        frame: number;
    }

    // Class
    export class SpriteSet {
        spriteMap:ISpriteData[] = [];
        image: HTMLImageElement;

        // Constructor
        //public name: string, public frameWidth: number, public frameHeight: number, public frames: number
        constructor(public src: string) {
        }

        load(callback): void {
            this.image = new Image();
            this.image.onload = callback;
            this.image.src = this.src;
        }

        addSpriteMap(spriteKey: string, spriteData: ISpriteData) {
            this.spriteMap[spriteKey] = spriteData;
        }

        render(ctx: CanvasRenderingContext2D, spriteKey: string, x: number, y: number, frame: number) {
            var s = this.spriteMap[spriteKey];
            var xOffset = s.sx + frame * s.w;
            var yOffset = s.sy;
            ctx.drawImage(this.image, xOffset, yOffset, s.w, s.h, x, y, s.w, s.h);
        }
    }
}
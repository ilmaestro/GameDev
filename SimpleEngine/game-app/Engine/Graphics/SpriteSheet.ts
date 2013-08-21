/// <reference path="SpriteRenderer.ts" />
/// <reference path="Rectangle.ts" />

// Module
module Engine.Graphics {
    // Class
    export class SpriteSheet {
        public frames = {};
        // Constructor
        constructor(public image: HTMLImageElement) {
            
        }

        addFrame(frameName: string, rect: Engine.Graphics.Rectangle, frames: number) {
            this.frames[frameName] = {
                frame: rect,
                frames: frames
            }
        }

        getFrame(frameName: string, frameNumber: number): Engine.Graphics.Rectangle {
            var f = this.frames[frameName];
            var rect: Rectangle = f.frame;
            rect.x = rect.x * frameNumber;            
            return rect;
        }        
    }
}
/// <reference path="Point.ts" />
// Interface
interface IRectangle {
    x: number;
    y: number;
    width: number;
    height: number;
    //bottom(): number;
    //center(): Engine.Graphics.Point;
    //left(): number;
    //top(): number;
}

// Module
module Engine.Graphics {

    // Class
    export class Rectangle implements IRectangle {
        // Constructor
        constructor(public x: number, public y: number, public width: number, public height: number) { }

        // Instance member
        get bottom() {
            return this.y + this.height - 1;
        }
        get center(): Point {
            return new Point(
                this.x + (this.width / 2),
                this.y + (this.height / 2)
                );
        }
        get left() {
            return this.x;
        }
        get right() {
            return this.x + this.width - 1;
        }
        get top() {
            return this.y;
        }
    }
}
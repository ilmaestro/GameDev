/// <reference path="../Game.ts" />
// Module
module Engine.Component {
    export class ComponentObject {
        parent: ComponentObject;
        game: GameObject;

        constructor(public x: number, public y: number, public width: number, public height: number, public rotation: number, public zIndex: number, public opacity: number) {
            this.parent = null;
        }

        update():void { }
        render():void { }

        left():number {
            return this.x;
        }
        top(): number {
            return this.y;
        }
        right(): number {
            return this.x + this.width - 1;
        }
        bottom(): number {
            return this.y + this.height - 1;
        }
    }
}
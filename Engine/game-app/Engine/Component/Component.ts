/// <reference path="../Game.ts" />
// Module
module Engine.Component {
    export class ComponentObject {
        public parent: ComponentObject;
        public game: GameObject;
        public x: number = 0; 
        public y: number = 0; 
        public width: number = 0;
        public height: number = 0;
        public rotation: number = 0;
        public zIndex: number = 0;
        public opacity: number = 1;

        constructor() {
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
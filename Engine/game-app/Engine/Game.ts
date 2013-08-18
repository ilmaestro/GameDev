/// <reference path="../jquery.d.ts" />
/// <reference path="Component/Scene.ts" />
declare var requestAnimFrame;

// Module
module Engine {

    // Class
    export class GameObject {
        public context: CanvasRenderingContext2D;
        public contentPath = "game-media/";
        private currentScene: Engine.Component.Scene;
        
        // Constructor
        constructor(public canvas: any) {
            this.context = canvas.getContext('2d');
        }

        // Instance member
        assetsLoaded(): void {
            
        }

        setScene(scene: Engine.Component.Scene) {
            this.currentScene = scene;
            this.currentScene.attachToGame(this);
        }
        startLoop() {
            this.log("starting " + this.currentScene.sceneName);
            
        }

        mainLoop(): void{
            //requestAnimFrame(this.mainLoop);
            this.context.clearRect(0, 0, this.width, this.height);
            if (this.currentScene) {
                this.currentScene.update();
                this.currentScene.render();
            }
        }

        log(message: string): void{
            console.log(message);
        }

        get height():number {
            return this.canvas.clientHeight;
        }

        get width():number {
            return this.canvas.clientWidth;
        }
    }
}
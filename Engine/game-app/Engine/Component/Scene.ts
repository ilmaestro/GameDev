/// <reference path="Container.ts" />
// Module
module Engine.Component {
    // Class
    export class Scene {
        game: GameObject;
        // Constructor
        constructor(public sceneName: string) {
            
        }
        attachToGame(gameObject: Engine.GameObject) {
            this.game = gameObject;
        }
        // Instance members
        update() {
            //this.game.log("Scene update");
            
        }
        render() {
        }   
    }

}

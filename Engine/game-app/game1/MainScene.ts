/// <reference path="../Engine/Game.ts" />
/// <reference path="EnemyShips.ts" />
/// <reference path="EnemyShip.ts" />
/// <reference path="../Engine/Component/SpriteSet.ts" />
/// <reference path="../Engine/Component/Sprite.ts" />
/// <reference path="../Engine/Component/Container.ts" />
/// <reference path="../Engine/Component/Scene.ts" />

module game1 {

    // Class
    export class MainScene extends Engine.Component.Scene {
        enemyShips: game1.EnemyShips;
        enemySpriteSet: Engine.Component.SpriteSet;

        // Constructor
        constructor() {
            super("Main Scene");
            
        }

        attachToGame(gameObject: Engine.GameObject) {
            this.game = gameObject;            
            this.enemySpriteSet = new Engine.Component.SpriteSet(this.game.contentPath + "sprites.png");
            this.enemyShips = new EnemyShips(gameObject, this.enemySpriteSet);
            this.enemySpriteSet.load(this.game.assetsLoaded);
        }

        update() {
            this.enemyShips.update();
        }

        render() {
            this.enemyShips.render();
        }

    }

}


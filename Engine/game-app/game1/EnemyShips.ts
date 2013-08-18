/// <reference path="EnemyShip.ts" />
/// <reference path="../Engine/Component/SpriteSet.ts" />
/// <reference path="../Engine/Component/Sprite.ts" />
/// <reference path="../Engine/Component/Container.ts" />

// Module
module game1 {

    // Class
    export class EnemyShips extends Engine.Component.Container {        
        static shipCount = 5;
        static shipSpeed = 2;

        // Constructor
        constructor(gameObject: Engine.GameObject, public shipSpriteSet: Engine.Component.SpriteSet) {
            super([]);
            this.spawnShips(gameObject);
        }

        spawnShips(gameObject: Engine.GameObject): void {
            var ship = new EnemyShip(10, 10);
            ship.container = this;
            ship.game = gameObject;
            ship.spriteSet = this.shipSpriteSet;
            this.shipSpriteSet.addSpriteMap(ship.EnemyShipSpriteKey, ship.EnemyShipSpriteData);
            this.addComponent(ship);
            
        }
    }
}
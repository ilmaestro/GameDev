/// <reference path="Level1.ts" />
/// <reference path="EnemyShip.ts" />
/// <reference path="../Engine/Component/SpriteSet.ts" />
/// <reference path="../Engine/Component/Sprite.ts" />
/// <reference path="../Engine/Component/Container.ts" />

// Module
module game1 {

    // Class
    export class EnemyShips extends Engine.Component.Container {        
        // Constructor
        constructor(gameObject: Engine.GameObject, public shipSpriteSet: Engine.Component.SpriteSet) {
            super([]);
            this.spawnShips(gameObject);
        }

        spawnShips(gameObject: Engine.GameObject): void {
            var self = this;
            var count = 0;
            for (var map in game1.enemyShipMap) {
                var spriteData = game1.enemyShipMap[map];
                self.shipSpriteSet.addSpriteMap(map, spriteData);
                var ship = new EnemyShip(map, 10, 10 + (100 * count++), spriteData.w, spriteData.h);
                ship.container = self;
                ship.game = gameObject;
                ship.spriteSet = self.shipSpriteSet;

                setTimeout(function (ship) {
                    self.addComponent(ship);
                }, 100 + (100 * count++), ship);                
            }
        }

        
    }
}
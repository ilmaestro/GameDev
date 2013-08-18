/// <reference path="Level1.ts" />
/// <reference path="EnemyShip.ts" />
/// <reference path="../Engine/Component/SpriteSet.ts" />
/// <reference path="../Engine/Component/Sprite.ts" />
/// <reference path="../Engine/Component/Container.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// Module
var game1;
(function (game1) {
    // Class
    var EnemyShips = (function (_super) {
        __extends(EnemyShips, _super);
        // Constructor
        function EnemyShips(gameObject, shipSpriteSet) {
            _super.call(this, []);
            this.shipSpriteSet = shipSpriteSet;
            this.spawnShips(gameObject);
        }
        EnemyShips.prototype.spawnShips = function (gameObject) {
            var self = this;
            var count = 0;
            for (var map in game1.enemyShipMap) {
                var spriteData = game1.enemyShipMap[map];
                self.shipSpriteSet.addSpriteMap(map, spriteData);
                var ship = new game1.EnemyShip(map, 10, 10 + (100 * count++), spriteData.w, spriteData.h);
                ship.container = self;
                ship.game = gameObject;
                ship.spriteSet = self.shipSpriteSet;

                setTimeout(function (ship) {
                    self.addComponent(ship);
                }, 100 + (100 * count++), ship);
            }
        };
        return EnemyShips;
    })(Engine.Component.Container);
    game1.EnemyShips = EnemyShips;
})(game1 || (game1 = {}));

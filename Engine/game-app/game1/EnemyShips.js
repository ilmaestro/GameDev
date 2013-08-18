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
            var ship = new game1.EnemyShip(10, 10);
            ship.container = this;
            ship.game = gameObject;
            ship.spriteSet = this.shipSpriteSet;
            this.shipSpriteSet.addSpriteMap(ship.EnemyShipSpriteKey, ship.EnemyShipSpriteData);
            this.addComponent(ship);
        };
        EnemyShips.shipCount = 5;
        EnemyShips.shipSpeed = 2;
        return EnemyShips;
    })(Engine.Component.Container);
    game1.EnemyShips = EnemyShips;
})(game1 || (game1 = {}));

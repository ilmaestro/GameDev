/// <reference path="../Engine/Game.ts" />
/// <reference path="EnemyShips.ts" />
/// <reference path="EnemyShip.ts" />
/// <reference path="../Engine/Component/SpriteSet.ts" />
/// <reference path="../Engine/Component/Sprite.ts" />
/// <reference path="../Engine/Component/Container.ts" />
/// <reference path="../Engine/Component/Scene.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var game1;
(function (game1) {
    // Class
    var MainScene = (function (_super) {
        __extends(MainScene, _super);
        // Constructor
        function MainScene() {
            _super.call(this, "Main Scene");
        }
        MainScene.prototype.attachToGame = function (gameObject) {
            this.game = gameObject;
            this.enemySpriteSet = new Engine.Component.SpriteSet(this.game.contentPath + "sprites.png");
            this.enemyShips = new game1.EnemyShips(gameObject, this.enemySpriteSet);
            this.enemySpriteSet.load(this.game.assetsLoaded);
        };

        MainScene.prototype.update = function () {
            this.enemyShips.update();
        };

        MainScene.prototype.render = function () {
            this.enemyShips.render();
        };
        return MainScene;
    })(Engine.Component.Scene);
    game1.MainScene = MainScene;
})(game1 || (game1 = {}));

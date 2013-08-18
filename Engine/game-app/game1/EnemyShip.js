/// <reference path="../Engine/Component/SpriteSet.ts" />
/// <reference path="../Engine/Component/Sprite.ts" />
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
    var EnemyShip = (function (_super) {
        __extends(EnemyShip, _super);
        // Constructor
        function EnemyShip(spriteKey, x, y, w, h) {
            _super.call(this);
            this.reloadSpeed = 5;
            this.xParams = { A: 0, B: 1, C: 1, D: 0 };
            this.yParams = { A: 0, B: 1, C: 5, D: 0 };
            this.vx = 0;
            this.vy = 0;
            this.t = 0;
            this.spriteKey = spriteKey;
            this.x = x;
            this.y = y;
            this.width = w;
            this.height = h;
        }
        EnemyShip.prototype.update = function () {
            var mx = this.xParams;
            var my = this.yParams;
            var dt = this.t / 100.00;
            this.vx = mx.A + mx.B * Math.sin(mx.C * dt + mx.D);
            this.vy = my.A + my.B * Math.sin(my.C * dt + my.D);
            this.x += this.vx;
            this.y += this.vy;

            if (this.y > this.game.height || this.x < -this.width || this.x > this.game.width) {
                //remove myself because I've gone off screen
                this.container.removeComponent(this);
            }

            this.t++;
        };

        EnemyShip.prototype.render = function () {
            var frame = 0;
            this.spriteSet.render(this.game.context, this.spriteKey, this.x, this.y, frame);
        };
        return EnemyShip;
    })(Engine.Component.Sprite);
    game1.EnemyShip = EnemyShip;
})(game1 || (game1 = {}));

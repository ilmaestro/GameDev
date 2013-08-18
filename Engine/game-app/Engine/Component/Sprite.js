var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Engine;
(function (Engine) {
    /// <reference path="SpriteSet.ts" />
    /// <reference path="Component.ts" />
    // Module
    (function (Component) {
        // Class
        var Sprite = (function (_super) {
            __extends(Sprite, _super);
            // Constructor
            function Sprite(spriteKey, x, y, width, height, rotation, zIndex, opacity) {
                _super.call(this, x, y, width, height, rotation, zIndex, opacity);
                this.spriteKey = spriteKey;
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
                this.rotation = rotation;
                this.zIndex = zIndex;
                this.opacity = opacity;
            }
            Sprite.prototype.update = function () {
            };

            Sprite.prototype.render = function () {
                var frame = 0;
                this.spriteSet.render(this.game.context, this.spriteKey, this.x, this.y, frame);
            };
            return Sprite;
        })(Component.ComponentObject);
        Component.Sprite = Sprite;
    })(Engine.Component || (Engine.Component = {}));
    var Component = Engine.Component;
})(Engine || (Engine = {}));

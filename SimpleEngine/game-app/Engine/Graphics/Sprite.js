var Engine;
(function (Engine) {
    // Module
    (function (Graphics) {
        var Sprite = (function () {
            function Sprite(textureName, x, y, width, height) {
                this.width = width;
                this.height = height;
                this.texture = new Graphics.Texture2d(textureName, new HTMLImageElement());
                this.rectangle = new Graphics.Rectangle(x, y, this.width, this.height);
                this.isAlive = true;
            }
            Sprite.prototype.draw = function (spriteManager) {
                if (this.isAlive) {
                    //TODO: need a way to pass in the source Bounds, in case the image source is a sprite sheet.
                    //TODO: frames support?
                    spriteManager.draw(this.texture, this.position, this.rectangle, this.rectangle);
                }
            };

            Sprite.prototype.update = function (game) {
                if (this.rectangle.right > game.screenWidth || this.rectangle.left < 0 || this.rectangle.top < 0 || this.rectangle.bottom > game.screenHeight) {
                    this.isAlive = false;
                }
            };

            Object.defineProperty(Sprite.prototype, "position", {
                get: function () {
                    return new Graphics.Point(this.rectangle.x, this.rectangle.y);
                },
                set: function (point) {
                    this.rectangle.x = point.x;
                    this.rectangle.y = point.y;
                },
                enumerable: true,
                configurable: true
            });

            return Sprite;
        })();
        Graphics.Sprite = Sprite;
    })(Engine.Graphics || (Engine.Graphics = {}));
    var Graphics = Engine.Graphics;
})(Engine || (Engine = {}));

var Engine;
(function (Engine) {
    /// <reference path="SpriteManager.ts" />
    /// <reference path="Sprite.ts" />
    // Module
    (function (Graphics) {
        // Class
        var SpriteCollection = (function () {
            // Constructor
            function SpriteCollection() {
                this.sprites = [];
            }
            SpriteCollection.prototype.add = function (sprite) {
                this.sprites.push(sprite);
            };

            SpriteCollection.prototype.remove = function (sprite) {
                var index = this.sprites.indexOf(sprite);
                if (index > -1) {
                    this.sprites.splice(index, 1);
                }
            };

            SpriteCollection.prototype.updateAll = function (game) {
                var i = 0, max = this.sprites.length;

                for (; i < max; i++) {
                    this.sprites[i].update(game);

                    if (!this.sprites[i].isAlive) {
                        this.remove(this.sprites[i]);
                    }
                }
            };

            SpriteCollection.prototype.drawAll = function (spriteManager) {
                var i = 0, max = this.sprites.length;

                for (; i < max; i++) {
                    this.sprites[i].draw(spriteManager);
                }
            };
            return SpriteCollection;
        })();
        Graphics.SpriteCollection = SpriteCollection;
    })(Engine.Graphics || (Engine.Graphics = {}));
    var Graphics = Engine.Graphics;
})(Engine || (Engine = {}));

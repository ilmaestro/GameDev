var Engine;
(function (Engine) {
    // Module
    (function (Component) {
        // Class
        var SpriteSet = (function () {
            // Constructor
            //public name: string, public frameWidth: number, public frameHeight: number, public frames: number
            function SpriteSet(src) {
                this.src = src;
                this.spriteMap = {};
            }
            SpriteSet.prototype.load = function (callback) {
                this.image = new Image();
                this.image.onload = callback;
                this.image.src = this.src;
            };

            SpriteSet.prototype.addSpriteMap = function (spriteKey, spriteData) {
                this.spriteMap[spriteKey] = spriteData;
            };

            SpriteSet.prototype.render = function (ctx, spriteKey, x, y, frame) {
                var s = this.spriteMap[spriteKey];
                var xOffset = s.sx + frame * s.w;
                var yOffset = s.sy;
                ctx.drawImage(this.image, xOffset, yOffset, s.w, s.h, x, y, s.w, s.h);
            };
            return SpriteSet;
        })();
        Component.SpriteSet = SpriteSet;
    })(Engine.Component || (Engine.Component = {}));
    var Component = Engine.Component;
})(Engine || (Engine = {}));

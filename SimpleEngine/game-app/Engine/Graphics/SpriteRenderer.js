var Engine;
(function (Engine) {
    /// <reference path="SpriteSheet.ts" />
    /// <reference path="Rectangle.ts" />
    /// <reference path="Texture2d.ts" />
    /// <reference path="Point.ts" />
    /*
    Sprite renderer
    used by game to render images
    */
    // Module
    (function (Graphics) {
        // Class
        var SpriteRenderer = (function () {
            // Constructor
            function SpriteRenderer(context) {
                this.context = context;
            }
            SpriteRenderer.prototype.setSpriteSheet = function (spriteSheet) {
                this.spriteSheet = spriteSheet;
            };

            //draw(texture: Texture2d, position: Point, sourceBounds: Rectangle, destBounds: Rectangle) {
            //    this.context.drawImage(texture.image, sourceBounds.x, sourceBounds.y, destBounds.width, destBounds.height, destBounds.x, destBounds.y, destBounds.width, destBounds.height);
            //}
            SpriteRenderer.prototype.draw = function (sprite, frame, position) {
                var s = this.spriteSheet.getFrame(sprite, frame);
                this.context.drawImage(this.spriteSheet.image, s.x, s.y, s.width, s.height, position.x, position.y, s.width, s.height);
            };
            return SpriteRenderer;
        })();
        Graphics.SpriteRenderer = SpriteRenderer;
    })(Engine.Graphics || (Engine.Graphics = {}));
    var Graphics = Engine.Graphics;
})(Engine || (Engine = {}));

var Engine;
(function (Engine) {
    /// <reference path="Rectangle.ts" />
    /// <reference path="Texture2d.ts" />
    /// <reference path="Point.ts" />
    /*
    Sprite manager
    
    used by game to load images and manage sprite collections
    
    */
    // Module
    (function (Graphics) {
        // Class
        var SpriteManager = (function () {
            // Constructor
            function SpriteManager(context) {
                this.context = context;
            }
            SpriteManager.prototype.draw = function (texture, position, sourceBounds, destBounds) {
                this.context.drawImage(texture.image, sourceBounds.x, sourceBounds.y, destBounds.width, destBounds.height, destBounds.x, destBounds.y, destBounds.width, destBounds.height);
            };
            return SpriteManager;
        })();
        Graphics.SpriteManager = SpriteManager;
    })(Engine.Graphics || (Engine.Graphics = {}));
    var Graphics = Engine.Graphics;
})(Engine || (Engine = {}));

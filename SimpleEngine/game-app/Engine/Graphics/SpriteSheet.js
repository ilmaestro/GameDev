var Engine;
(function (Engine) {
    /// <reference path="SpriteRenderer.ts" />
    /// <reference path="Rectangle.ts" />
    // Module
    (function (Graphics) {
        // Class
        var SpriteSheet = (function () {
            // Constructor
            function SpriteSheet(image) {
                this.image = image;
                this.frames = {};
            }
            SpriteSheet.prototype.addFrame = function (frameName, rect, frames) {
                this.frames[frameName] = {
                    frame: rect,
                    frames: frames
                };
            };

            SpriteSheet.prototype.getFrame = function (frameName, frameNumber) {
                var f = this.frames[frameName];
                var rect = f.frame;
                rect.x = rect.x * frameNumber;
                return rect;
            };
            return SpriteSheet;
        })();
        Graphics.SpriteSheet = SpriteSheet;
    })(Engine.Graphics || (Engine.Graphics = {}));
    var Graphics = Engine.Graphics;
})(Engine || (Engine = {}));

/// <reference path="../jquery.d.ts" />
// Module
var Engine;
(function (Engine) {
    // Class
    var ContentManager = (function () {
        // Constructor
        function ContentManager() {
        }
        ContentManager.prototype.loadImage = function (imageSrc) {
            var def = $.Deferred();
            var image = new Image();

            image.onload = function (e) {
                def.resolve(this);
            };
            image.onerror = function (e) {
                def.reject(e);
            };

            image.src = this.root + imageSrc;

            return def;
        };
        return ContentManager;
    })();
    Engine.ContentManager = ContentManager;
})(Engine || (Engine = {}));

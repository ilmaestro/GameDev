var Engine;
(function (Engine) {
    /// <reference path="../Game.ts" />
    // Module
    (function (Component) {
        var ComponentObject = (function () {
            function ComponentObject(x, y, width, height, rotation, zIndex, opacity) {
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
                this.rotation = rotation;
                this.zIndex = zIndex;
                this.opacity = opacity;
                this.parent = null;
            }
            ComponentObject.prototype.update = function () {
            };
            ComponentObject.prototype.render = function () {
            };

            ComponentObject.prototype.left = function () {
                return this.x;
            };
            ComponentObject.prototype.top = function () {
                return this.y;
            };
            ComponentObject.prototype.right = function () {
                return this.x + this.width - 1;
            };
            ComponentObject.prototype.bottom = function () {
                return this.y + this.height - 1;
            };
            return ComponentObject;
        })();
        Component.ComponentObject = ComponentObject;
    })(Engine.Component || (Engine.Component = {}));
    var Component = Engine.Component;
})(Engine || (Engine = {}));

var Engine;
(function (Engine) {
    /// <reference path="../Game.ts" />
    // Module
    (function (Component) {
        var ComponentObject = (function () {
            function ComponentObject() {
                this.x = 0;
                this.y = 0;
                this.width = 0;
                this.height = 0;
                this.rotation = 0;
                this.zIndex = 0;
                this.opacity = 1;
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

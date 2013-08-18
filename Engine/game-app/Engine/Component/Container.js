var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Engine;
(function (Engine) {
    /// <reference path="Component.ts" />
    // Module
    (function (Component) {
        // Class
        var Container = (function (_super) {
            __extends(Container, _super);
            function Container(components) {
                _super.call(this, 0, 0, 0, 0, 0, 0, 1);
                this.components = components;
            }
            Container.prototype.update = function () {
                this.updateComponents();
            };
            Container.prototype.render = function () {
                this.renderComponents();
            };
            Container.prototype.updateComponents = function () {
                for (var i = 0; i < this.components.length; i++) {
                    var component = this.components[i];
                    component.update();
                }
            };
            Container.prototype.renderComponents = function () {
                for (var i = 0; i < this.components.length; i++) {
                    var component = this.components[i];
                    component.render();
                }
            };
            Container.prototype.addComponent = function (component) {
                if (component.parent !== this) {
                    var index = this.components.indexOf(component);
                    if (index < 0) {
                        this.components.push(component);
                        component.parent = this;
                    }
                }
            };
            Container.prototype.removeComponent = function (component) {
                var index = this.components.indexOf(component);
                if (index > -1) {
                    this.components.splice(index, 1);
                    component.parent = null;
                }
            };
            return Container;
        })(Component.ComponentObject);
        Component.Container = Container;
    })(Engine.Component || (Engine.Component = {}));
    var Component = Engine.Component;
})(Engine || (Engine = {}));

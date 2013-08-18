var Engine;
(function (Engine) {
    /// <reference path="Container.ts" />
    // Module
    (function (Component) {
        // Class
        var Scene = (function () {
            // Constructor
            function Scene(sceneName) {
                this.sceneName = sceneName;
            }
            Scene.prototype.attachToGame = function (gameObject) {
                this.game = gameObject;
            };

            // Instance members
            Scene.prototype.update = function () {
                //this.game.log("Scene update");
            };
            Scene.prototype.render = function () {
            };
            return Scene;
        })();
        Component.Scene = Scene;
    })(Engine.Component || (Engine.Component = {}));
    var Component = Engine.Component;
})(Engine || (Engine = {}));

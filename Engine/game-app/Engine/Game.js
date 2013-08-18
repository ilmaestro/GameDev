// Module
var Engine;
(function (Engine) {
    // Class
    var GameObject = (function () {
        // Constructor
        function GameObject(canvas) {
            this.canvas = canvas;
            this.contentPath = "game-media/";
            this.context = canvas.getContext('2d');
        }
        // Instance member
        GameObject.prototype.assetsLoaded = function () {
        };

        GameObject.prototype.setScene = function (scene) {
            this.currentScene = scene;
            this.currentScene.attachToGame(this);
        };
        GameObject.prototype.startLoop = function () {
            this.log("starting " + this.currentScene.sceneName);
        };

        GameObject.prototype.mainLoop = function () {
            //requestAnimFrame(this.mainLoop);
            this.context.clearRect(0, 0, this.width, this.height);
            if (this.currentScene) {
                this.currentScene.update();
                this.currentScene.render();
            }
        };

        GameObject.prototype.log = function (message) {
            console.log(message);
        };

        Object.defineProperty(GameObject.prototype, "height", {
            get: function () {
                return this.canvas.clientHeight;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(GameObject.prototype, "width", {
            get: function () {
                return this.canvas.clientWidth;
            },
            enumerable: true,
            configurable: true
        });
        return GameObject;
    })();
    Engine.GameObject = GameObject;
})(Engine || (Engine = {}));

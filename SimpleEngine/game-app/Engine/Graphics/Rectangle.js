var Engine;
(function (Engine) {
    // Module
    (function (Graphics) {
        // Class
        var Rectangle = (function () {
            // Constructor
            function Rectangle(x, y, width, height) {
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
            }
            Object.defineProperty(Rectangle.prototype, "bottom", {
                get: // Instance member
                function () {
                    return this.y + this.height - 1;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "center", {
                get: function () {
                    return new Graphics.Point(this.x + (this.width / 2), this.y + (this.height / 2));
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "left", {
                get: function () {
                    return this.x;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "right", {
                get: function () {
                    return this.x + this.width - 1;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "top", {
                get: function () {
                    return this.y;
                },
                enumerable: true,
                configurable: true
            });
            return Rectangle;
        })();
        Graphics.Rectangle = Rectangle;
    })(Engine.Graphics || (Engine.Graphics = {}));
    var Graphics = Engine.Graphics;
})(Engine || (Engine = {}));

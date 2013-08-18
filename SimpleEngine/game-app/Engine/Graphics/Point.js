var Engine;
(function (Engine) {
    // Module
    (function (Graphics) {
        // Class
        var Point = (function () {
            // Constructor
            function Point(x, y) {
                this.x = x;
                this.y = y;
            }
            // Instance member
            Point.prototype.getDist = function () {
                return Math.sqrt(this.x * this.x + this.y * this.y);
            };

            Point.origin = new Point(0, 0);
            return Point;
        })();
        Graphics.Point = Point;
    })(Engine.Graphics || (Engine.Graphics = {}));
    var Graphics = Engine.Graphics;
})(Engine || (Engine = {}));

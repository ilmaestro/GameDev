var Engine;
(function (Engine) {
    // Module
    (function (Graphics) {
        // Class
        var Texture2d = (function () {
            // Constructor
            function Texture2d(name, image) {
                this.name = name;
                this.image = image;
            }
            return Texture2d;
        })();
        Graphics.Texture2d = Texture2d;
    })(Engine.Graphics || (Engine.Graphics = {}));
    var Graphics = Engine.Graphics;
})(Engine || (Engine = {}));

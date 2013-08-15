/// <reference path="../Interfaces/GameLayer.ts" />
/// <reference path="../typings/jaws.d.ts" />
var Starfield = (function () {
    function Starfield(numberStars, width, height, alpha, speed, drawBackground) {
        this.numberStars = numberStars;
        this.width = width;
        this.height = height;
        this.alpha = alpha;
        this.speed = speed;
        this.drawBackground = drawBackground;
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext('2d');
        this.offsetX = 0;
        this.offsetY = 0;
        this.generateStars();
        console.log("width: " + this.width);
    }
    Starfield.prototype.generateStars = function () {
        if (this.drawBackground) {
            this.context.fillStyle = "#000";
            this.context.fillRect(0, 0, this.width, this.height);
        }

        this.context.fillStyle = "#FFF";
        this.context.globalAlpha = this.alpha;

        for (var i = 0; i < this.numberStars; i++) {
            var x = Math.floor(this.width * Math.random());
            var y = Math.floor(this.height * Math.random());
            this.context.fillRect(x, y, 1, 1);
        }
    };

    Starfield.prototype.update = function () {
        this.offsetY += this.speed;
        this.offsetY = this.offsetY % this.height;
    };

    Starfield.prototype.draw = function () {
        var intOffsetY = Math.floor(this.offsetY);
        var intOffsetX = Math.floor(this.offsetX);
        var remainingY = this.height - intOffsetY;
        var remainingX = this.width - intOffsetX;

        if (intOffsetY > 0) {
            jaws.context.drawImage(this.canvas, 0, remainingY, this.width, intOffsetY, 0, 0, this.width, intOffsetY);
        }
        if (remainingY > 0) {
            jaws.context.drawImage(this.canvas, 0, 0, this.width, remainingY, 0, intOffsetY, this.width, remainingY);
        }
    };
    return Starfield;
})();
//# sourceMappingURL=Starfield.js.map

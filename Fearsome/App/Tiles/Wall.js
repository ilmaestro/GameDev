var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Wall = (function (_super) {
    __extends(Wall, _super);
    function Wall(x, y, width, height, rotation, newId, text) {
        _super.call(this, x, y, width, height, newId);
        this.rotation = rotation;
        this.isPassable = false;
        this.color = "blue";
        this.element.innerText = text;
        this.element.className = "wall";
        this.setCssText(this.getCssText());
    }
    Wall.prototype.getCssText = function () {
        var css = "position: absolute; text-align: center; color: #fff;";

        css += "-webkit-transform: translate(" + this.location.x + "px, " + this.location.y + "px) rotate(" + this.rotation + "deg); -webkit-transform-origin: left bottom 0;";
        css += "-moz-transform: translate(" + this.location.x + "px, " + this.location.y + "px) rotate(" + this.rotation + "deg); -moz-transform-origin: left bottom 0;";
        css += "-o-transform: translate(" + this.location.x + "px, " + this.location.y + "px) rotate(" + this.rotation + "deg); -o-transform-origin: left bottom 0;";
        css += "-ms-transform: translate(" + this.location.x + "px, " + this.location.y + "px) rotate(" + this.rotation + "deg); -ms-transform-origin: left bottom 0;";
        css += " width: " + this.size.width + "px; height: " + this.size.height + "px; background-color: " + this.color + ";";

        return css;
    };
    return Wall;
})(Tile);

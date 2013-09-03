/// <reference path="../Interfaces/ISize.ts" />
/// <reference path="../Interfaces/IPoint.ts" />
/// <reference path="../Interfaces/ITile.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Tile = (function (_super) {
    __extends(Tile, _super);
    function Tile(x, y, width, height, newId, color, isPassable) {
        _super.call(this);
        this.location = {
            x: x,
            y: y
        };
        this.size = { width: width, height: height };
        this.name = "Tile";
        this.id = newId;
        this.gridID = { row: 0, column: 0 };
        this.gridRevID = { row: 0, column: 0 };

        this.color = color || "#999";
        this.isPassable = isPassable || false;

        this.element.id = this.id;
        this.element.className = "tile";
        this.setCssText(this.getCssText());
    }
    Tile.prototype.setText = function (text) {
        this.element.innerText = text;
    };

    Tile.prototype.getCssText = function () {
        var css = "";
        var css = "position: absolute; top: " + this.location.y + "px; left: " + this.location.x + "px; width: " + this.size.width + "px; height: " + this.size.height + "px; ";

        return css;
    };
    return Tile;
})(DivElement);
//# sourceMappingURL=Tile.js.map

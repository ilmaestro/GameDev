/// <reference path="../Utils.ts" />
/// <reference path="../Board/Board.ts" />
/// <reference path="../Constants.ts" />
/// <reference path="../Tiles/Tile.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(x, y, width, height, newId, color) {
        _super.call(this);
        this.moveCounter = 0;
        this.moveType = 4;
        this.playerSideA = true;
        this.location = { x: x, y: y };
        this.rotation = 0;
        this.size = { width: width, height: height };
        this.name = "Player";
        this.id = newId;

        this.color = color || "#444";
        this.element.id = this.id;
        this.element.className = "player";

        this.moveCounter += this.moveType;
        this.update();
    }
    Player.prototype.flip = function () {
        this.playerSideA = !this.playerSideA;
        if (this.playerSideA) {
            this.color = "yellow";
            this.moveCounter += 4;
        } else {
            this.color = "black";
            this.moveCounter += 3;
        }
        this.update();
    };

    Player.prototype.move = function (direction) {
        var playerGrid = this.currentTile.gridID, playerGridRev = this.currentTile.gridRevID, nextTile = null;

        if (this.moveCounter > 0) {
            switch (direction) {
                case Constants.Direction.Left:
                    nextTile = this.board.getTile(playerGrid.column - 1, playerGrid.row);
                    break;
                case Constants.Direction.Up:
                    nextTile = this.board.getTile(playerGrid.column, playerGrid.row - 1);
                    break;
                case Constants.Direction.Right:
                    nextTile = this.board.getTile(playerGrid.column + 1, playerGrid.row);
                    break;
                case Constants.Direction.Down:
                    nextTile = this.board.getTile(playerGrid.column, playerGrid.row + 1);
                    break;
                default:
                    nextTile = this.currentTile;
                    break;
            }

            if (nextTile.isPassable) {
                this.moveCounter--;
                this.currentTile = nextTile;
                this.location = nextTile.location;
            }
            this.update();
        }
    };

    Player.prototype.getCssText = function () {
        var css = "position: absolute; text-align: center; color: #333;";

        css += "-webkit-transform: translate(" + this.location.x + "px, " + this.location.y + "px) rotate(" + this.rotation + "deg); -webkit-transform-origin: left bottom 0;";
        css += "-moz-transform: translate(" + this.location.x + "px, " + this.location.y + "px) rotate(" + this.rotation + "deg); -moz-transform-origin: left bottom 0;";
        css += "-o-transform: translate(" + this.location.x + "px, " + this.location.y + "px) rotate(" + this.rotation + "deg); -o-transform-origin: left bottom 0;";
        css += "-ms-transform: translate(" + this.location.x + "px, " + this.location.y + "px) rotate(" + this.rotation + "deg); -ms-transform-origin: left bottom 0;";
        css += " width: " + this.size.width + "px; height: " + this.size.height + "px; background-color: " + this.color + ";";

        return css;
    };

    Player.prototype.update = function () {
        this.setCssText(this.getCssText());
        //if (this.currentTile) {
        //    this.element.innerText = "C-" + this.currentTile.gridID.column + " R-" + this.currentTile.gridID.row;
        //}
    };
    return Player;
})(DivElement);
//# sourceMappingURL=Player.js.map

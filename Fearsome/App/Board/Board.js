/// <reference path="../Utils.ts" />
/// <reference path="../Tiles/Tile.ts" />
/// <reference path="../Tiles/Wall.ts" />
/// <reference path="../Tiles/DivElement.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var board = (function (_super) {
    __extends(board, _super);
    function board(parent) {
        _super.call(this);
        this.tileSize = 75;
        this.tileSpacing = 1;
        this.gridCols = 16;
        this.gridRows = 11;
        this.totalTiles = 16 * 11;
        this.alphabet = [];
        this.idCount = 0;
        this.boardPaddingX = 10;
        this.boardPaddingY = 10;
        this.tileOffsetX = 30;
        this.tileOffsetY = 30;
        this.tiles = [];
        this.walls = [];
        this.alphabet = Utils.GetAtoZ();
        this.element.id = "board";
        this.element.className = "board";
        this.setupTiles(this.gridCols, this.gridRows);

        //this.setupWalls(13);
        var startingPlayerTile = this.tiles[this.tiles.length - 1];
        this.player = new Player(startingPlayerTile.location.x, startingPlayerTile.location.y, this.tileSize, this.tileSize, this.getNewId().toString(), "yellow");
        this.player.currentTile = startingPlayerTile;
        this.player.board = this;
        this.player.appendTo(this.element);

        this.appendTo(parent);
        this.update();
        var self = this;
        Utils.AddEvent(window, "keyup", function (e) {
            self.player.playerMoved(e.keyCode);
        });
    }
    board.prototype.update = function () {
        this.setCssText(this.getCssText());
        this.player.update();
    };

    board.prototype.setupTiles = function (columns, rows) {
        var r, c, size = this.tileSize + this.tileSpacing, tileCount = 0, minCols = 0, maxCols = 11;

        for (r = 0; r < rows; r++) {
            if (r < 6) {
                maxCols++;
            }
            if (r > 6) {
                minCols++;
            }
            for (c = 0; c < columns; c++) {
                var tile;

                if (minCols <= c && c < maxCols) {
                    tile = new Tile(this.tileOffsetX + (c * size), this.tileOffsetY + (r * size), this.tileSize, this.tileSize, this.getNewId().toString(), "#999", true);
                    tile.name = "Floor";
                } else {
                    tile = new Tile(this.tileOffsetX + (c * size), this.tileOffsetY + (r * size), this.tileSize, this.tileSize, this.getNewId().toString(), "green", false);
                    tile.name = "Outside";
                }

                tile.gridID.column = c;
                tile.gridID.row = r;
                tile.gridRevID.column = columns - c - 1;
                tile.gridRevID.row = rows - r - 1;

                //tile.setText(tileCount.toString());
                tile.appendTo(this.element);
                this.tiles.push(tile);
                tileCount++;
            }
        }
    };

    board.prototype.getTile = function (column, row) {
        var tileNum = (row * this.gridCols) + column;

        return this.tiles[tileNum];
    };

    //getTile(column: number, row: number): Tile {
    //    var retVal: Tile = null
    //        ,i;
    //    for (i = 0; i < this.tiles.length; i++) {
    //        if (this.tiles[i].gridID.column == column && this.tiles[i].gridID.row == row) {
    //            retVal = this.tiles[i];
    //        }
    //    }
    //    return retVal;
    //}
    board.prototype.setupWalls = function (length) {
        var c, s, sides = 4, wallCount = 0, width = this.tileSize, height = this.tileSize / 2, tWidth = width + this.tileSpacing, tHeight = (height) + this.tileSpacing, curX = 0, curY = 0, xIncrement = 0, yIncrement = 0;

        for (s = 0; s < sides; s++) {
            var rotation = s * 90;
            if (rotation == 0) {
                xIncrement = tWidth;
                yIncrement = 0;
                curX = this.tileOffsetX - tWidth;
                curY = 0;
            } else if (rotation == 90) {
                xIncrement = 0;
                yIncrement = tWidth;
                curX += tWidth;
                curY += this.tileSpacing - tWidth;
            } else if (rotation == 180) {
                xIncrement = -tWidth;
                yIncrement = 0;
                curX -= this.tileSpacing - tWidth;
                curY += tWidth;
            } else if (rotation == 270) {
                xIncrement = 0;
                yIncrement = -tWidth;
                curX -= tWidth;
                curY -= this.tileSpacing - tWidth;
            }
            for (c = 0; c < length; c++) {
                curX += xIncrement;
                curY += yIncrement;

                var wall = new Wall(curX, curY, width, height, rotation, this.getNewId().toString(), this.alphabet[wallCount % 26]);
                wall.appendTo(this.element);
                this.walls.push(wall);
                wallCount++;
            }
        }
    };

    board.prototype.getNewId = function () {
        return ++this.idCount;
    };

    board.prototype.getCssText = function () {
        var view = Utils.GetViewportSize(), top = this.boardPaddingY, left = this.boardPaddingX, w = view.width - (this.boardPaddingX * 2), h = view.height - (this.boardPaddingY * 2);

        var css = "position: absolute; top: " + top + "px; left: " + left + "px; width: " + w + "px; height: " + h + "px; background-color: #efefef;";

        return css;
    };
    return board;
})(DivElement);
//# sourceMappingURL=Board.js.map

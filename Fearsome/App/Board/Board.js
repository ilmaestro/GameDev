/// <reference path="../Utils.ts" />
/// <reference path="../Actors/Player.ts" />
/// <reference path="../Actors/Monster.ts" />
/// <reference path="../Actors/MonsterMover.ts" />
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
    function board(parent, log) {
        _super.call(this);
        this.tileSize = 75;
        this.tileSpacing = 0;
        this.gridCols = 16;
        this.gridRows = 11;
        this.totalTiles = 16 * 11;
        this.alphabet = [];
        this.idCount = 0;
        this.boardPaddingX = 10;
        this.boardPaddingY = 10;
        this.tileOffsetX = 10;
        this.tileOffsetY = 10;

        this.tiles = [];
        this.walls = [];
        this.alphabet = Utils.GetAtoZ();
        this.element.id = "board";
        this.element.className = "board";
        this.appendTo(parent);
        this.logger = new logger(this.element);

        this.setup();
        this.update();
        this.addEvents();
    }
    board.prototype.sizeToView = function () {
        var view = Utils.GetViewportSize();

        this.boardSize = {
            width: 1020,
            height: 480
        };

        var tileHeight = ((this.boardSize.height - (this.boardPaddingY * 2)) / this.gridRows) - this.tileSpacing, tileWidth = ((this.boardSize.width - (this.boardPaddingX * 2)) / this.gridCols) - this.tileSpacing;

        if (tileHeight < tileWidth) {
            this.tileSize = tileHeight;
        } else {
            this.tileSize = tileWidth;
        }
    };

    board.prototype.setup = function () {
        this.sizeToView();
        this.setupTiles(this.gridCols, this.gridRows);

        //this.setupWalls(13);
        //player
        var startingPlayerTile = this.tiles[this.tiles.length - 1];
        this.player = new Player(startingPlayerTile.location.x, startingPlayerTile.location.y, this.tileSize, this.tileSize, this.getNewId().toString(), "yellow");
        this.player.currentTile = startingPlayerTile;
        this.player.board = this;
        this.player.appendTo(this.element);

        //monster
        var startingMonsterTile = this.tiles[0];
        this.monster = new Monster(startingMonsterTile.location.x, startingMonsterTile.location.y, this.tileSize, this.tileSize, this.getNewId().toString(), "purple");
        this.monster.currentTile = startingMonsterTile;
        this.monster.setBoard(this);
        this.monster.appendTo(this.element);
    };

    board.prototype.addEvents = function () {
        //add events
        var self = this;
        Utils.AddEvent(window, "keyup", function (e) {
            if (!self.monster.mover.isMoving()) {
                switch (e.keyCode) {
                    case Constants.KeyCode.Left:
                        self.player.move(Constants.Direction.Left);
                        break;
                    case Constants.KeyCode.Up:
                        self.player.move(Constants.Direction.Up);
                        break;
                    case Constants.KeyCode.Right:
                        self.player.move(Constants.Direction.Right);
                        break;
                    case Constants.KeyCode.Down:
                        self.player.move(Constants.Direction.Down);
                        break;
                    case Constants.KeyCode.M:
                        self.monster.beginMove();
                        break;
                }
            }
            if (self.player.moveCounter <= 0) {
                self.monster.beginMove();
                self.player.flip();
            }
        });
    };

    board.prototype.playerEaten = function () {
        var startTile = this.tiles[this.tiles.length - 1];
        this.player.currentTile = startTile;
        this.player.location = startTile.location;
        this.update();
        this.log("player eaten!");
    };

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
                    if (Math.random() < .8 || tile.id == "1" || tile.id == "176") {
                        tile.name = "Floor";
                        if (tile.id == "1") {
                            tile.element.className = "Goal";
                        } else if (tile.id == "176") {
                            tile.element.className = "Start";
                        } else {
                            tile.element.className = "Floor";
                        }
                    } else {
                        tile.name = "Column";
                        tile.element.className = "Column";
                        tile.isPassable = false;
                    }
                } else {
                    tile = new Tile(this.tileOffsetX + (c * size), this.tileOffsetY + (r * size), this.tileSize, this.tileSize, this.getNewId().toString(), "green", false);
                    tile.name = "Outside";
                    tile.element.className = "Outside";
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
    board.prototype.isRowPathPassable = function (fromRow, toRow, column) {
        var row, f, t, retVal = true;

        if (fromRow < toRow) {
            f = fromRow;
            t = toRow;
        } else {
            f = toRow;
            t = fromRow;
        }

        for (row = f; row <= t; row++) {
            var tile = this.getTile(column, row);
            if (!tile.isPassable) {
                retVal = false;
                break;
            }
        }

        return retVal;
    };

    board.prototype.isColumnPathPassable = function (fromCol, toCol, row) {
        var col, f, t, retVal = true;

        if (fromCol < toCol) {
            f = fromCol;
            t = toCol;
        } else {
            f = toCol;
            t = fromCol;
        }

        for (col = f; col <= t; col++) {
            var tile = this.getTile(col, row);
            if (!tile.isPassable) {
                retVal = false;
                break;
            }
        }

        return retVal;
    };

    board.prototype.getTile = function (column, row) {
        var tileNum = -1;
        if (column >= 0 && column < this.gridCols) {
            tileNum = (row * this.gridCols) + column;
        }

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
        //var view: ISize = Utils.GetViewportSize()
        //    , top = this.boardPaddingY, left = this.boardPaddingX
        //    , w = view.width - (this.boardPaddingX * 2)
        //    , h = view.height - (this.boardPaddingY * 2);
        var css = "position: relative; width: " + this.boardSize.width + "px; height: " + this.boardSize.height + "px; background-color: #efefef;";

        //var css = "position: absolute; top: " + top + "px; left: " + left + "px; width: " + w + "px; height: " + h + "px; background-color: #efefef;";
        return css;
    };

    board.prototype.log = function (message) {
        this.logger.log(message);
    };
    return board;
})(DivElement);
//# sourceMappingURL=Board.js.map

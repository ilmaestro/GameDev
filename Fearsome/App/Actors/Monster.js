/// <reference path="../Utils.ts" />
/// <reference path="../Board/Board.ts" />
/// <reference path="../Constants.ts" />
/// <reference path="../Tiles/Tile.ts" />
/// <reference path="MonsterMover.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Monster = (function (_super) {
    __extends(Monster, _super);
    function Monster(x, y, width, height, newId, color) {
        _super.call(this);
        this.location = { x: x, y: y };
        this.rotation = 0;
        this.size = { width: width, height: height };
        this.name = "Monster";
        this.id = newId;
        this.color = color || "#000";
        this.element.id = this.id;
        this.element.className = "Monster";

        this.setupMover();
        this.update();
    }
    Monster.prototype.beginMove = function () {
        this.board.log("Monster moving...");
        this.mover.nextCard();
        this.moving();
    };

    Monster.prototype.moving = function () {
        var self = this;
        self.setDirection();
        if (self.mover.moveMonster(self)) {
            //keep moving
            self.update();
            setTimeout(function () {
                self.moving();
            }, 500);
        } else {
            //stopped
            self.setDirection();
            self.update();
        }
    };

    Monster.prototype.setBoard = function (board) {
        this.board = board;
        this.mover.board = board;
    };

    Monster.prototype.setupMover = function () {
        this.mover = new MonsterMover();
        this.setDirection(Constants.Direction.Right);
    };

    Monster.prototype.setDirection = function (direction) {
        if (!direction) {
            var pGrid = this.board.player.currentTile.gridID, mGrid = this.currentTile.gridID;

            if (pGrid.column == mGrid.column && pGrid.row == mGrid.row) {
                // monster EATS player
                this.mover.eatPlayer();
                this.board.playerEaten();
            } else if (pGrid.column == mGrid.column) {
                if (pGrid.row < mGrid.row) {
                    direction = Constants.Direction.Up;
                } else {
                    direction = Constants.Direction.Down;
                }
            } else if (pGrid.row == mGrid.row) {
                if (pGrid.column < mGrid.column) {
                    direction = Constants.Direction.Left;
                } else {
                    direction = Constants.Direction.Right;
                }
            } else {
                direction = null;
            }
        }

        if (direction != null) {
            this.mover.moveDirection = direction;
            this.rotation = Utils.GetDirectionInDegrees(this.mover.moveDirection);
        }
    };

    Monster.prototype.move = function (direction) {
        var grid = this.currentTile.gridID, gridRev = this.currentTile.gridRevID, nextTile = null;

        switch (direction) {
            case Constants.Direction.Left:
                nextTile = this.board.getTile(grid.column - 1, grid.row);
                break;
            case Constants.Direction.Up:
                nextTile = this.board.getTile(grid.column, grid.row - 1);
                break;
            case Constants.Direction.Right:
                nextTile = this.board.getTile(grid.column + 1, grid.row);
                break;
            case Constants.Direction.Down:
                nextTile = this.board.getTile(grid.column, grid.row + 1);
                break;
            default:
                nextTile = this.currentTile;
                break;
        }

        if (!nextTile || nextTile.name == "Outside") {
            nextTile = this.board.getTile(gridRev.column, gridRev.row);
        }

        if (nextTile.isPassable) {
            this.currentTile = nextTile;
            this.location = nextTile.location;
        }
        this.update();
    };

    Monster.prototype.getCssText = function () {
        var css = "position: absolute; text-align: center; color: #fff; text-align: center; ";

        css += "-webkit-transform: translate(" + this.location.x + "px, " + this.location.y + "px) rotate(" + this.rotation + "deg); -webkit-transform-origin: center center 0;";
        css += "-moz-transform: translate(" + this.location.x + "px, " + this.location.y + "px) rotate(" + this.rotation + "deg); -moz-transform-origin: center center 0;";
        css += "-o-transform: translate(" + this.location.x + "px, " + this.location.y + "px) rotate(" + this.rotation + "deg); -o-transform-origin: center center 0;";
        css += "-ms-transform: translate(" + this.location.x + "px, " + this.location.y + "px) rotate(" + this.rotation + "deg); -ms-transform-origin: center center 0;";
        css += " width: " + this.size.width + "px; height: " + this.size.height + "px; background-color: " + this.color + ";";

        return css;
    };

    Monster.prototype.update = function () {
        this.setCssText(this.getCssText());

        //left is 0 degrees.
        this.element.innerText = "<---";
        //if (this.currentTile) {
        //    this.element.innerText = "C-" + this.currentTile.gridID.column + " R-" + this.currentTile.gridID.row;
        //}
    };
    return Monster;
})(DivElement);
//# sourceMappingURL=Monster.js.map

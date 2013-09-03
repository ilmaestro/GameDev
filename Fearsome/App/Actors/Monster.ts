/// <reference path="../Utils.ts" />
/// <reference path="../Board/Board.ts" />
/// <reference path="../Constants.ts" />
/// <reference path="../Tiles/Tile.ts" />
/// <reference path="MonsterMover.ts" />

class Monster extends DivElement implements IPlayer {
    size: ISize;
    location: IPoint;
    rotation: number;
    color: string;
    currentTile: Tile;
    board: board;
    mover: MonsterMover;

    constructor(x: number, y: number, width: number, height: number, newId: string, color?: string) {
        super();
        this.location = { x: x, y: y };
        this.rotation = 0;
        this.size = { width: width, height: height };
        this.name = "monster";
        this.id = newId;        
        this.color = color || "#000";
        this.element.id = this.id;
        this.element.className = "monster";

        this.setupMover();
        this.update();
    }

    beginMove() {
        this.board.log("Monster moving...");
        this.mover.nextCard();
        this.moving();        
    }

    private moving() {
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
    }

    setBoard(board: board) {
        this.board = board;
        this.mover.board = board;
    }

    private setupMover() {
        this.mover = new MonsterMover(); //setup mover
        this.setDirection(Constants.Direction.Right); //initially start moving to the right
    }

    private setDirection(direction?: Constants.Direction): void {
        if (!direction) {
            var pGrid = this.board.player.currentTile.gridID
                , mGrid = this.currentTile.gridID;

            if (pGrid.column == mGrid.column && pGrid.row == mGrid.row) {
                // monster EATS player
                this.mover.eatPlayer();
                this.board.playerEaten();
            } else if (pGrid.column == mGrid.column) {
                if (this.board.isRowPathPassable(pGrid.row, mGrid.row, mGrid.column)) {
                    //same column, check for up vs. down
                    if (pGrid.row < mGrid.row && this.mover.moveDirection != Constants.Direction.Down) {
                        direction = Constants.Direction.Up;
                    } else if(this.mover.moveDirection != Constants.Direction.Up) {
                        direction = Constants.Direction.Down;
                    }
                }
            } else if (pGrid.row == mGrid.row) {
                if (this.board.isColumnPathPassable(pGrid.column, mGrid.column, mGrid.row)) {
                    //same row, check for left vs. right
                    if (pGrid.column < mGrid.column && this.mover.moveDirection != Constants.Direction.Right) {
                        direction = Constants.Direction.Left;
                    } else if(this.mover.moveDirection != Constants.Direction.Left) {
                        direction = Constants.Direction.Right;
                    }
                }
            } else {
                direction = null;
            }
        }

        if (direction != null) {
            this.mover.moveDirection = direction;
            this.rotation = Utils.GetDirectionInDegrees(this.mover.moveDirection);
        }
    }

    move(direction: Constants.Direction): void {
        var grid = this.currentTile.gridID
            , gridRev = this.currentTile.gridRevID
            , nextTile: Tile = null;

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

        this.currentTile = nextTile;
        this.location = nextTile.location;
        this.update();
    }

    getCssText(): string {
        var css = "position: absolute; ";

        css += "-webkit-transform: translate(" + this.location.x + "px, " + this.location.y + "px) rotate(" + this.rotation + "deg); -webkit-transform-origin: center center 0;"
        css += "-moz-transform: translate(" + this.location.x + "px, " + this.location.y + "px) rotate(" + this.rotation + "deg); -moz-transform-origin: center center 0;"
        css += "-o-transform: translate(" + this.location.x + "px, " + this.location.y + "px) rotate(" + this.rotation + "deg); -o-transform-origin: center center 0;"
        css += "-ms-transform: translate(" + this.location.x + "px, " + this.location.y + "px) rotate(" + this.rotation + "deg); -ms-transform-origin: center center 0;"
        css += " width: " + this.size.width + "px; height: " + this.size.height + "px; ";

        return css;
    }

    update(): void {
        this.setCssText(this.getCssText());
        //left is 0 degrees.
        this.element.innerText = "<---";
        //if (this.currentTile) {
        //    this.element.innerText = "C-" + this.currentTile.gridID.column + " R-" + this.currentTile.gridID.row;
        //}
    }
}

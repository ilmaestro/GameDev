/// <reference path="../Utils.ts" />
/// <reference path="../Board/Board.ts" />
/// <reference path="../Constants.ts" />
/// <reference path="../Tiles/Tile.ts" />

class Player extends DivElement implements IPlayer {
    size: ISize;
    location: IPoint;
    rotation: number;
    color: string;
    currentTile: Tile;
    board: board;
    moveCounter = 0;
    moveType = 4;

    constructor(x: number, y: number, width: number, height: number, newId: string, color?: string) {
        super();
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

    flip() {
        this.moveCounter += this.moveType;
    }

    move(direction: Constants.Direction): void {
        var playerGrid = this.currentTile.gridID
            , playerGridRev = this.currentTile.gridRevID
            , nextTile: Tile = null;        

        if (this.moveCounter > 0) {
            switch (direction) {
                case Constants.Direction.Left: //LEFT
                    nextTile = this.board.getTile(playerGrid.column - 1, playerGrid.row);
                    break;
                case Constants.Direction.Up: //UP
                    nextTile = this.board.getTile(playerGrid.column, playerGrid.row - 1);
                    break;
                case Constants.Direction.Right: //RIGHT
                    nextTile = this.board.getTile(playerGrid.column + 1, playerGrid.row);
                    break;
                case Constants.Direction.Down: //DOWN
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
    }

    getCssText(): string {
        var css = "position: absolute; text-align: center; color: #333;";

        css += "-webkit-transform: translate(" + this.location.x + "px, " + this.location.y + "px) rotate(" + this.rotation + "deg); -webkit-transform-origin: left bottom 0;"
        css += "-moz-transform: translate(" + this.location.x + "px, " + this.location.y + "px) rotate(" + this.rotation + "deg); -moz-transform-origin: left bottom 0;"
        css += "-o-transform: translate(" + this.location.x + "px, " + this.location.y + "px) rotate(" + this.rotation + "deg); -o-transform-origin: left bottom 0;"
        css += "-ms-transform: translate(" + this.location.x + "px, " + this.location.y + "px) rotate(" + this.rotation + "deg); -ms-transform-origin: left bottom 0;"
        css += " width: " + this.size.width + "px; height: " + this.size.height + "px; background-color: " + this.color + ";";

        return css;
    }

    update(): void {
        this.setCssText(this.getCssText());
        //if (this.currentTile) {
        //    this.element.innerText = "C-" + this.currentTile.gridID.column + " R-" + this.currentTile.gridID.row;
        //}
    }
}

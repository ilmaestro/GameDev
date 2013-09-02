/// <reference path="../Utils.ts" />
/// <reference path="../Actors/Player.ts" />
/// <reference path="../Actors/Monster.ts" />
/// <reference path="../Actors/MonsterMover.ts" />
/// <reference path="../Tiles/Tile.ts" />
/// <reference path="../Tiles/Wall.ts" />
/// <reference path="../Tiles/DivElement.ts" />

class board extends DivElement {
    tiles: Tile[];
    tileSize = 75;
    tileSpacing = 1;
    gridCols = 16;
    gridRows = 11;
    totalTiles = 16 * 11;

    walls: Wall[];
    alphabet = [];

    idCount = 0;
    player: Player;
    monster: Monster;

    boardPaddingX: number = 10;
    boardPaddingY: number = 10;

    tileOffsetX: number = 10;
    tileOffsetY: number = 10;

    logger: logger;
    boardSize: ISize;

    constructor(parent: HTMLElement, log: HTMLElement) {
        super();
        
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

    sizeToView() {
        var view: ISize = Utils.GetViewportSize();

        this.boardSize = {
            width: (view.width - (this.boardPaddingX * 4)),
            height: (view.height - 100 - (this.boardPaddingY * 4))
        };

        var tileHeight = ((this.boardSize.height - (this.boardPaddingY * 2)) / this.gridRows) - this.tileSpacing
            , tileWidth = ((this.boardSize.width - (this.boardPaddingX * 2)) / this.gridCols) - this.tileSpacing;

        if (tileHeight < tileWidth) {
            this.tileSize = tileHeight;
        } else {
            this.tileSize = tileWidth;
        }
    }

    setup(): void {
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
    }

    addEvents(): void {
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
    }

    playerEaten(): void {
        var startTile = this.tiles[this.tiles.length - 1];
        this.player.currentTile = startTile;
        this.player.location = startTile.location
        this.update();
        this.log("player eaten!");
    }


    update(): void {
        this.setCssText(this.getCssText());
        this.player.update();
    }


    setupTiles(columns: number, rows: number): void {
        var r, c, size = this.tileSize + this.tileSpacing, tileCount = 0
            , minCols = 0
            , maxCols = 11;

        for (r = 0; r < rows; r++) {
            if (r < 6) {
                maxCols++;
            }
            if (r > 6) {
                minCols++;
            }
            for (c = 0; c < columns; c++) {
                var tile: Tile;

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
    }

    getTile(column: number, row: number): Tile {
        var tileNum = -1;
        if (column >= 0 && column < this.gridCols) {
            tileNum = (row * this.gridCols) + column;
        }
        
        return this.tiles[tileNum];
    }

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

    setupWalls(length: number): void {
        var c, s, sides = 4, wallCount = 0
            , width = this.tileSize
            , height = this.tileSize / 2
            , tWidth = width + this.tileSpacing
            , tHeight = (height) + this.tileSpacing
            , curX = 0, curY = 0
            , xIncrement = 0, yIncrement = 0;

        for (s = 0; s < sides; s++) {
            var rotation = s * 90
            if (rotation == 0) {
                xIncrement = tWidth;
                yIncrement = 0;
                curX = this.tileOffsetX - tWidth;
                curY = 0;
            }
            else if (rotation == 90) {
                xIncrement = 0;
                yIncrement = tWidth;
                curX += tWidth;
                curY += this.tileSpacing - tWidth;
            }
            else if (rotation == 180) {
                xIncrement = -tWidth;
                yIncrement = 0;
                curX -= this.tileSpacing - tWidth;
                curY += tWidth;
            }
            else if (rotation == 270) {
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
    }

    getNewId(): number {
        return ++this.idCount;
    }

    getCssText(): string {
        //var view: ISize = Utils.GetViewportSize()
        //    , top = this.boardPaddingY, left = this.boardPaddingX
        //    , w = view.width - (this.boardPaddingX * 2)
        //    , h = view.height - (this.boardPaddingY * 2);
        
        var css = "position: relative; width: " + this.boardSize.width + "px; height: " + this.boardSize.height + "px; background-color: #efefef;";
        //var css = "position: absolute; top: " + top + "px; left: " + left + "px; width: " + w + "px; height: " + h + "px; background-color: #efefef;";

        return css;
    }

    log(message: string) {
        this.logger.log(message);
    }
}

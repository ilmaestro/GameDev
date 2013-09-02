/// <reference path="../Interfaces/ISize.ts" />
/// <reference path="../Interfaces/IPoint.ts" />
/// <reference path="../Interfaces/ITile.ts" />

class Tile extends DivElement implements ITile {
    size: ISize;
    location: IPoint;
    color: string;
    isPassable: boolean;
    gridID: IGrid;
    gridRevID: IGrid;

    constructor(x: number, y: number, width: number, height: number, newId: string, color?: string, isPassable?: boolean) {
        super();
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

    setText(text: string): void {
        this.element.innerText = text;
    }

    getCssText(): string {
        var css: string = "";
        var css = "position: absolute; top: "+ this.location.y +"px; left: "+ this.location.x +"px; width: " + this.size.width + "px; height: " + this.size.height + "px; background-color: "+ this.color +";";

        return css;
    }
}
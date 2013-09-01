/// <reference path="../Interfaces/ISize.ts" />
/// <reference path="../Interfaces/IPoint.ts" />
/// <reference path="../Interfaces/ITile.ts" />
/// <reference path="../Interfaces/IElement.ts" />

class Wall extends Tile {
    rotation: number;

    constructor(x: number, y: number, width: number, height: number, rotation: number, newId: string, text: string) {
        super(x, y, width, height, newId);
        this.rotation = rotation;
        this.isPassable = false;
        this.color = "blue";
        this.element.innerText = text;
        this.element.className = "wall";
        this.setCssText(this.getCssText());
    }

    getCssText(): string {
        var css = "position: absolute; text-align: center; color: #fff;";
        
        css += "-webkit-transform: translate(" + this.location.x + "px, " + this.location.y + "px) rotate(" + this.rotation + "deg); -webkit-transform-origin: left bottom 0;"
        css += "-moz-transform: translate(" + this.location.x + "px, " + this.location.y + "px) rotate(" + this.rotation + "deg); -moz-transform-origin: left bottom 0;"
        css += "-o-transform: translate(" + this.location.x + "px, " + this.location.y + "px) rotate(" + this.rotation + "deg); -o-transform-origin: left bottom 0;"
        css += "-ms-transform: translate(" + this.location.x + "px, " + this.location.y + "px) rotate(" + this.rotation + "deg); -ms-transform-origin: left bottom 0;"
        css += " width: " + this.size.width + "px; height: " + this.size.height + "px; background-color: " + this.color + ";";

        return css;
    }
}
/// <reference path="../Interfaces/IElement.ts" />
class DivElement implements IElement {
    name: string;
    id: string;
    element: HTMLElement;

    constructor() {
        this.element = document.createElement("div");
    }

    appendTo(parent: HTMLElement) {
        parent.appendChild(this.element);
    }

    getCssText(): string {
        var css: string = "";
        

        return css;
    }

    setCssText(cssText: string): void {
        this.element.style.cssText = cssText;
    }
}
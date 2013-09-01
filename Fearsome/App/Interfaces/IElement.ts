interface IElement {
    name: string;
    id: string;
    element: HTMLElement;
    getCssText(): string;
    setCssText(cssText: string): void;
}
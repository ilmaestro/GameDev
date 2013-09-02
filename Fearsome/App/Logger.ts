class logger {
    element: HTMLTextAreaElement;
    name: string;

    constructor(parent: HTMLElement) {
        this.element = document.createElement("textarea");
        this.element.name = "logger";
        this.element.id = "logger";
        this.element.style.cssText = "float: right; width: 250px; height: 400px; margin-top: 20px; margin-right: 20px;";
        parent.appendChild(this.element);  
    }

    log(message: string): void {
        this.element.textContent += message + "\n";
    }

    clear(): void {
        this.element.textContent = "";
    }
}
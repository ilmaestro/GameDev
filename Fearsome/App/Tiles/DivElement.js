var DivElement = (function () {
    function DivElement() {
        this.element = document.createElement("div");
    }
    DivElement.prototype.appendTo = function (parent) {
        parent.appendChild(this.element);
    };

    DivElement.prototype.getCssText = function () {
        var css = "";

        return css;
    };

    DivElement.prototype.setCssText = function (cssText) {
        this.element.style.cssText = cssText;
    };
    return DivElement;
})();

var logger = (function () {
    function logger(parent) {
        this.element = document.createElement("textarea");
        this.element.name = "logger";
        this.element.id = "logger";
        this.element.style.cssText = "position: relative; width: 350px; height: 200px;";
        parent.appendChild(this.element);
    }
    logger.prototype.log = function (message) {
        this.element.textContent += message + "\n";
    };

    logger.prototype.clear = function () {
        this.element.textContent = "";
    };
    return logger;
})();
//# sourceMappingURL=Logger.js.map

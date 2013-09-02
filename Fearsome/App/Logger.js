var logger = (function () {
    function logger(parent) {
        this.element = document.createElement("textarea");
        this.element.name = "logger";
        this.element.id = "logger";
        this.element.style.cssText = "float: right; width: 250px; height: 400px; margin-top: 20px; margin-right: 20px;";
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

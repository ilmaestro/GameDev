var Constants;
(function (Constants) {
    (function (Direction) {
        Direction[Direction["Left"] = 0] = "Left";
        Direction[Direction["Up"] = 1] = "Up";
        Direction[Direction["Right"] = 2] = "Right";
        Direction[Direction["Down"] = 0] = "Down";
    })(Constants.Direction || (Constants.Direction = {}));
    var Direction = Constants.Direction;

    (function (KeyCode) {
        KeyCode[KeyCode["Left"] = 37] = "Left";
        KeyCode[KeyCode["Up"] = 38] = "Up";
        KeyCode[KeyCode["Right"] = 39] = "Right";
        KeyCode[KeyCode["Down"] = 40] = "Down";
    })(Constants.KeyCode || (Constants.KeyCode = {}));
    var KeyCode = Constants.KeyCode;
})(Constants || (Constants = {}));
//# sourceMappingURL=Constants.js.map

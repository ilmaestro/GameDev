var Game;
(function (Game) {
    (function (Classes) {
        Classes.PlayerType = {
            Hero: 1,
            Enemy: 2
        };

        var Player = (function () {
            function Player(position, playerType) {
                if (typeof position === "undefined") { position = { x: 0, y: 0 }; }
                if (typeof playerType === "undefined") { playerType = Classes.PlayerType.Enemy; }
                this.position = position;
                this.playerType = playerType;
            }
            Player.prototype.draw = function () {
            };
            return Player;
        })();
        Classes.Player = Player;
    })(Game.Classes || (Game.Classes = {}));
    var Classes = Game.Classes;
})(Game || (Game = {}));

var Game = Game || {};
Game.JoinGameViewModel = (function (Game) {
    function JoinGameViewModel(options) {
        this.container = $(options.container);
        this.gameTable = $(options.gameTable);
        this.gameTableBody = $(options.gameTable + " tbody");
        this.cancelBtn = $(options.cancelBtn);
        this.games = {};
        
        this.onJoin = options.onJoin;
        this.cancelBtn.click(function (e) {
            options.onCancel();
            e.preventDefault();
        });

        this.setSizePosition(options.width || 400, options.height || 400, options.x || 50, options.y || 50);
        this.updateRows();
    }

    JoinGameViewModel.prototype.addGame = function (id, name) {
        this.games[id] = name;
        this.updateRows();
    };

    JoinGameViewModel.prototype.addGames = function (gameList) {
        this.removeRows();
        var i = 0, id = "";
        this.games = {};

        for (var i in gameList) {
            id = "g_" + i;
            this.games[id] = gameList[i];
        };
        this.updateRows();
    };

    JoinGameViewModel.prototype.updateRows = function () {
        var self = this, count = 1;
        this.removeRows();
        for (var game in this.games) {
            var gameName = this.games[game];
            this.gameTableBody.append("<tr id='" + game + "'><td>" + (count++) + "</td><td>" + gameName + "</td></tr>");
            $("#" + game).click(function () {
                self.onJoin(self.games[this.id])
            });
        }
    };
    JoinGameViewModel.prototype.removeRows = function () {
        for (var game in this.games) {
            if ($("#" + game)) {
                $("#" + game).remove();
            }
        }
    };

    JoinGameViewModel.prototype.setSizePosition = function (width, height, x, y) {
        this.container.css({
            top: x,
            left: y,
            width: width,
            height: height
        });
    };
    
    JoinGameViewModel.prototype.show = function () {
        this.container.show();
    };

    JoinGameViewModel.prototype.hide = function () {
        this.container.hide();
    };

    return JoinGameViewModel;
}(Game));
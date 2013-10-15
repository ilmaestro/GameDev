var Game = Game || {};
Game.LaunchGameViewModel = (function (Game) {
    function LaunchGameViewModel(options) {
        this.container = $(options.container);
        this.playerTable = $(options.playerTable);
        this.playerTableBody = $(options.playerTable + " tbody");
        this.gameNameSpan = $(options.gameNameSpan);
        this.readyBtn = $(options.readyBtn);
        this.cancelBtn = $(options.cancelBtn);

        this.players = {};
        this.game = {};

        var self = this;
        this.readyBtn.click(function (e) {
            e.preventDefault();
            options.onReady(self.game.name);
        });
        this.cancelBtn.click(function (e) {
            e.preventDefault();
            options.onCancel();
        });

        this.setSizePosition(options.width || 400, options.height || 400, options.x || 50, options.y || 50);
        this.updateRows();
    }

    LaunchGameViewModel.prototype.setGame = function (name) {
        this.game.name = name;
        this.gameNameSpan.html(name);
    };

    LaunchGameViewModel.prototype.addPlayer = function (player) {
        var playerId = "Player_" + player.id;
        this.players[playerId] = player;
        this.updateRows();
    };

    LaunchGameViewModel.prototype.addPlayers = function (playerList) {
        this.removeRows();
        this.players = {};

        for (var key in playerList) {
            var playerId = "Player_" + key;
            this.players[playerId] = playerList[key];
        }
        this.updateRows();
    };

    LaunchGameViewModel.prototype.updateRows = function () {
        var self = this, count = 1;
        this.removeRows();
        for (var key in this.players) {
            var name = this.players[key].name, 
                row = "<tr id='" + key + "'> <td>" + (count++) + "</td> <td>" + name + "</td> <td><div id='" + key + "_color'>&nbsp;</div></td> </tr>";
            this.playerTableBody.append(row);

            //set player color
            var playerColor = $("#" + key + "_color");
            if (playerColor) {
                playerColor.css({
                    width: 25,
                    height: 25,
                    "background-color": this.players[key].color
                });
            }
            
        }
    };

    LaunchGameViewModel.prototype.removeRows = function () {
        for (var key in this.players) {
            if ($("#" + key)) {
                $("#" + key).remove();
            }
        }
    };

    LaunchGameViewModel.prototype.setSizePosition = function (width, height, x, y) {
        this.container.css({
            top: x,
            left: y,
            width: width,
            height: height
        });
    };
    
    LaunchGameViewModel.prototype.show = function () {
        this.container.show();
    };

    LaunchGameViewModel.prototype.hide = function () {
        this.container.hide();
    };

    return LaunchGameViewModel;
}(Game));
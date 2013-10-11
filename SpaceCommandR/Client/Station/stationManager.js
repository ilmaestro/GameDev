var Game = Game || {};
Game.StationManager = (function(Game){
	function StationManager(options){
	    this.bounds = options.bounds || new jaws.Rect({});
	    this.bounds.shrink(10, 10);
	    this.bounds.moveTo(30, 30);

	    this.stations = [];
	    this.stationCount = 0;
	}

	StationManager.prototype.spawn = function(options){
	    options.x = options.x || 0;
	    options.y = options.y || 0;
	    options.isAlive = options.isAlive || false;
	    options.radius = options.radius || 8;
	    options.bounds = options.bounds || new jaws.Rect({});
	    options.mass = options.mass || 100;
	    options.parentStation = options.parentStation || "";
	    options.ancor = "center";

	    this.stations.push(new Game.Projectile(options));
	    this.stationCount++;
	}

	StationManager.prototype.remove = function (index) {
	    this.stationCount--;
	    this.stations.splice(index, 1);
	};

    StationManager.prototype.update = function(viewport, stations, planets, onCollisionCallback) {
        var i = 0, self = this;
        for (i = 0; i < this.stations.length; i++) {
            if (this.stations[i].isAlive) {
                
                if (!this.stations[i].isAlive) {
                    self.remove(i);
                }
            } else {
                this.remove(i);
                return;
            }
        }
    };

    StationManager.prototype.draw = function (viewport) {
        var i = 0;
        for (i = 0; i < this.stations.length; i++) {
            if (this.stations[i].isAlive) {
                viewport.draw(this.stations[i]);
            }
        }
    };

    StationManager.prototype.destroyStation = function (stationId) { };
    StationManager.prototype.getPlayerStations = function (playerId) { this.stations.filter(function(station){return station.playerId == playerId;}) };
    StationManager.prototype.getOthersStations = function (playerId) { this.stations.filter(function (station) { return station.playerId != playerId; }) };
    StationManager.prototype.getChildStations = function (stationId) { };
    StationManager.prototype.getParentStation = function (stationId) { };
    //StationManager.prototype.draw = function () { };
        

	return StationManager;
}(Game));
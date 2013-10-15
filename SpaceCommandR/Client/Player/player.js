var Game = Game || {};
Game.Player = (function(Game){

	/*
	*
	* constructor
	*
	*/

	function Player (options){
	    this.id = options.id;
	    this.name = options.name;
	    this.color = options.color || "green";
	    this.isAlive = options.isAlive || false;
	    this.isActive = options.isActive || false;
	    this.score = 0;
	    this.energy = 0;

	    this.lastSelectedStation = 0;
	}

	Player.prototype.destroy = function () {
	    this.isAlive = false;
	    toastr.info(this.name + " destroyed.");
	};

	Player.prototype.getPosition = function (max_x, max_y) {
	    var coords = {};
	    switch (this.id) {
	        case 1:
	            coords = { x: 100, y: 100 };
	            break;
	        case 2:
	            coords = { x: max_x - 100, y: max_y - 100 };
	            break;
	        case 3:
	            coords = { x: max_x - 100, y: 100 };
	            break;
	        case 4:
	            coords = { x: 100, y: max_y - 100 };
	            break;
	        default:
	            coords = { x: 100, y: 100 };
	            break;
	    }
	    return coords;
	};

	return Player;
}(Game));
var Game = Game || {};
Game.Multiplayer = (function(Game){

	/*
	*
	* constructor
	*
	*/

	function Multiplayer (world, viewport){
		this.world = world;
		this.viewport = viewport;

	    // player
		this.players = [];
		this.currentPlayer;

		// vectors
		this.velocity = new Game.Vector();
		this.friction = new Game.Vector();
		this.touch = new Game.Vector();

		// sprites
		this.background;
		this.grid;
		this.explosion;
		this.stations = [];
		this.projectiles = [];
		this.projectileManager;
		this.planets = [];

		// game state
		this.isLaunching = false;
		this.isDragging = false;
		this.canLaunch = false;
		this.currentStation = 0;

		// constants
		this.viewportSpeed = 5;
		this.viewportMaxSpeed = 20;
		this.launchMaxPower = 150;
		this.launchMaxSpeed = 20;
		this.gridSize = 100;
		this.gridOffset = 10;

		// styles
		this.backgroundStyle = "#000";
		this.lineStyle = "#fff";

		// timing
		this.currentTime = Date.now();
		this.lastTime = this.currentTime;
		this.viewChangeDelay = 2000; //ms
	}

	/*
	*
	* events
	*
	*/

	Multiplayer.prototype.onResize = function(){
		Game.Log("resizing title state");
		if (this.viewport) this.viewport.width = jaws.canvas.width;
        if (this.viewport) this.viewport.height = jaws.canvas.height;
	};

	Multiplayer.prototype.onMouseMove = function(){
		var self = this;
		if (jaws.pressed("left_mouse_button") && !this.isDragging && this.projectileManager.projectileCount == 0) { //!this.isProjectileAlive()) {
			this.touch.x = this.viewport.x + jaws.mouse_x;
			this.touch.y = this.viewport.y + jaws.mouse_y;

		    //check if touched station
			doIfCollidePoint(this.stations, this.touch, function (station) {
			    //check station player, allow launch if it belongs to the current player.
			    var stationPlayer = self.players[station.playerId - 1];
			    if (stationPlayer.name == self.world.userName) {
			        station.isLaunching = true;
			        self.isDragging = true;
			    }
			});
		}

		if(!jaws.pressed("left_mouse_button")) {
			this.isDragging = false;
		}

		if(this.isDragging){
			this.touch.x = this.viewport.x + jaws.mouse_x;
			this.touch.y = this.viewport.y + jaws.mouse_y;
		}
	};

	Multiplayer.prototype.onMouseUp = function () {
	    //detect if launch
	    if (this.isDragging) {
	        Game.Log("station launch!");
	        this.stations[this.currentStation].isLaunching = false;
	        this.isDragging = false;
	        this.launchFrom(this.stations[this.currentStation], this.touch);
	    }
	};

	Multiplayer.prototype.onSpawnProjectile = function (station,x,y,vx,vy) {
	    this.projectileManager.spawn({
	        x: x,
	        y: y,
	        isAlive: true,
            parentStation: station,
	        velocity: new Game.Vector(vx, vy)
	    });
	};

	Multiplayer.prototype.onStartTurn = function (player) {
	    this.currentStation = player.lastSelectedStation;
	    this.currentPlayer = this.players[player.id - 1];
	    if (this.currentPlayer.name == this.world.userName) {
	        //it's MY turn, make sure i have controls
	        toastr.info("Your turn.");
	    } else {
	        toastr.info(this.currentPlayer.name + " turn.");
        }
	    this.viewport.centerAround(this.stations[this.currentStation]);
	};

	Multiplayer.prototype.onNewPlayer = function (player) {
	    this.players.push(player);
	    this.addNewPlayerStation(player);
	};

	Multiplayer.prototype.onUpdatePlayers = function (playerList) {
	    var self = this;
	    this.players = [];
	    this.stations = [];

	    playerList.forEach(function (player) {
	        var p = new Game.Player(player);
	        self.players.push(p);
            // add stations if the viewport exists.
	        if (self.viewport) {
	            self.addNewPlayerStation(p);
	        }
	    });
	    if (!this.currentPlayer) {
	        this.currentPlayer = this.players[0];
	    }
	    this.viewport.centerAround(this.stations[this.currentStation]);
	};

	/*
	*
	* setup sequence
	*
	*/

	Multiplayer.prototype.setup = function(){
	    var self = this;
	    if (this.players.length > 0) {
            //bypass setup, cuz we're already setup.
	        return;
	    }
		this.stations = [];
		this.players = [];
		this.currentPlayer = null;
		this.planets = [];
        
		// set up the chase camera view
        this.viewport = new jaws.Viewport({ max_x: this.world.viewport_max_x, max_y: this.world.viewport_max_y });
        jaws.activeviewport = this.viewport; // resize events need this in global scope
		
		//setup parallax background
        this.background = new Game.Background({});

		// explosion animation		
		this.explosion = new Game.Explosion({});
		
		// create grid
		this.grid = new Game.Grid({
			x: 20,
			y: 20,
			width: this.viewport.max_x - 40,
			height: this.viewport.max_y - 40,
			gridSize: this.gridSize,
			offset: this.gridOffset
		});

	    //add stations from player list
		//this.players.forEach(function (player) {
		//    self.addNewPlayerStation(player);
		//});
		//this.currentPlayer = this.players[0];

		//create station 1
		//this.stations.push(new Game.Station({
		//	x: 100,
		//	y: 100,
		//	anchor: "center",
		//	bounds: this.grid.rect(),
		//	isAlive: true,
		//	color: "#BAA600",
		//	name: "p1"
		//}));

		//// station 2
		//this.stations.push(new Game.Station({
		//	x: this.viewport.max_x - 100,
		//	y: this.viewport.max_y - 100,
		//	anchor: "center",
		//	bounds: this.grid.rect(),
		//	isAlive: true,
		//	color: "#BA0071",
		//	name: "p2"
		//}));

		// the projectile
		this.projectileManager = new Game.ProjectileManager({
		    bounds: this.grid.rect().clone()
		});

		//the planets
		// this.planets.push(new Game.Planetoid({
		// 	x: this.viewport.max_x / 2,
		// 	y: this.viewport.max_y / 2,
		// 	radius: 250,
		// 	width: 500,
		// 	height: 500,
		// 	mass: -3000,
		// 	anchor: "center"
		// }));
		this.planets.push(new Game.Planetoid({
			x: this.viewport.max_x / 4,
			y: this.viewport.max_y / 3,
			radius: 100,
			width: 200,
			height: 200,
			mass: 4000,
			anchor: "center"
		}));

		this.planets.push(new Game.Planetoid({
			x: 3 * this.viewport.max_x / 4,
			y: this.viewport.max_y / 3,
			radius: 100,
			width: 200,
			height: 200,
			mass: 4000,
			anchor: "center"
		}));

		this.planets.push(new Game.Planetoid({
			x: 3 * this.viewport.max_x / 4,
			y: 2 * this.viewport.max_y / 3,
			radius: 100,
			width: 200,
			height: 200,
			mass: 4000,
			anchor: "center"
		}));

		this.planets.push(new Game.Planetoid({
			x: this.viewport.max_x / 4,
			y: 2 * this.viewport.max_y / 3,
			radius: 100,
			width: 200,
			height: 200,
			mass: 4000,
			anchor: "center"
		}));

		jaws.preventDefaultKeys(["up", "down", "left", "right", "space"]);
	};

	/*
	*
	* update sequence
	* 
	*/

	Multiplayer.prototype.update = function(){
		this.currentTime = Date.now();
		var i = 0, projectileAlive = false, self = this; //, elapsedTime = this.currentTime - this.lastTime;

	    //check if user let go of the drag
		if (this.isDragging && !jaws.pressed("left_mouse_button")) {
		    this.onMouseUp();
		}

		this.world.update();
        this.explosion.update();

		updateAll(this.stations);
		updateAll(this.planets);

		this.projectileManager.update(this.viewport, this.stations, this.planets, function (collisionType, projectile, collisionObject) {
		    var parentStation = getStationByName(self.stations, projectile.parentStation);

            //update explosion
		    self.explosion.beginAnim(projectile.x, projectile.y);
		    self.world.sfxhit();

		    //check if station
		    if (collisionType == "station") {
		        collisionObject.damaged();
		        parentStation.scored();
		        if (!collisionObject.isAlive) {
		            self.players[collisionObject.playerId - 1].destroy();
		        }
		    }
            //check that the current player is this world's user AND that the launching station is that same user.
		    if (self.currentPlayer.name == self.world.userName && self.currentPlayer.name == self.players[parentStation.playerId - 1].name) {
		        setTimeout(function () {
		            self.world.commandHub.server.endTurn(self.world.gameName, self.players, self.currentPlayer);
		        }, 2000);
		    } else {
		        self.viewport.centerAround(self.stations[self.currentStation]);
		    }
		});

        this.background.update(this.viewport);
	};

	/*
	*
	* draw sequence
	*
	*/

	Multiplayer.prototype.draw = function(){
		var self = this, i = 0;
		jaws.clear();
		this.background.draw();
		this.viewport.draw(this.grid);
		this.viewport.apply(function(){
			for(i = 0; i < self.stations.length; i++) {
				if(self.stations[i].isAlive){
					self.stations[i].draw();
				}
			}
			for(i = 0; i < self.planets.length; i++) {
				self.planets[i].draw();
			}
			doIfLaunching(self.stations, function(station){
	        	Game.Helper.drawLauncherArrow(jaws.context, station, self.touch, self.launchMaxPower);        		
			});
		});

		this.projectileManager.draw(this.viewport);
		this.explosion.drawFrame(this.viewport);
	};

	//Multiplayer.prototype.launch = function(object, point1, point2) {
	//	var diff = point2.clone().sub(point1).limit(this.launchMaxPower),
 	//		velocity = (diff.mag() / this.launchMaxPower) * object.SPEED,
    //    	theta = Math.atan2(diff.y, diff.x);

    //    object.moveTo(point1.x, point1.y);
	//	object.velocity.x = Math.cos(theta) * velocity;
	//	object.velocity.y = Math.sin(theta) * velocity;
	//	object.isAlive = true;
	//};

	Multiplayer.prototype.addNewPlayerStation = function(player){
	    var coords = player.getPosition(this.viewport.max_x, this.viewport.max_y);
        //add station
	    this.stations.push(new Game.Station({
	        x: coords.x,
	        y: coords.y,
	        anchor: "center",
	        isAlive: true,
	        color: player.color,
	        name: "S" + this.stations.length,
            playerId: player.id
	    }));
	    player.lastSelectedStation = this.stations.length - 1;
	}

	Multiplayer.prototype.launchFrom = function (station, toPoint) {
	    var diff = toPoint.clone().sub(station).limit(this.launchMaxPower),
 			velocity = (diff.mag() / this.launchMaxPower) * this.launchMaxSpeed,
        	theta = Math.atan2(diff.y, diff.x);

	    var vx = Math.cos(theta) * velocity,
	        vy = Math.sin(theta) * velocity;

	    this.world.commandHub.server.launchProjectile(this.world.gameName, station.name, station.x, station.y, vx, vy);
	};

	Multiplayer.prototype.launchProjectile = function (station, x, y, vx, vy) {}; // placeholder

	Multiplayer.prototype.isProjectileAlive = function () {
	    var projectileAlive = false;
	    doIfAlive(this.projectiles, function (projectile) {
	        projectileAlive = true;
	    });

	    return projectileAlive;
	};

	Multiplayer.prototype.nextStation = function () {
	    this.currentStation++;

	    if (this.currentStation >= this.stations.length) {
	        this.currentStation = 0;
	    }
	    return this.currentStation;
	};

	function updateAll(objects) {
		var i = 0;
		for(i = 0; i < objects.length; i ++) {
			objects[i].update();
		}
	}

	function drawAll(objects) {
		var i = 0;
		for(i = 0; i < object.length; i ++) {
			objects[i].update();
		}
	}

	function doIfAlive(objects, callback) {
		var i = 0;
		for(i = 0; i < objects.length; i ++) {
			if(objects[i].isAlive) {
				callback.call(this, objects[i]);
			}
		}
	}

	function doIfLaunching(objects, callback) {
		var i = 0;
		for(i = 0; i < objects.length; i ++) {
			if(objects[i].isLaunching) {
				callback.call(this, objects[i]);
			}
		}
	}

	function doIfCollidePoint(objects, point, callback) {
		var i = 0;
		for(i = 0; i < objects.length; i ++) {
			if(objects[i].rect().collidePoint(point.x, point.y)) {
				callback.call(this, objects[i]);
			}
		}
	}

	function doIfCollideCircles(obj1, objects, callback) {
		var i = 0;
		for(i = 0; i < objects.length; i ++) {
			if(jaws.collideCircles(obj1, objects[i])) {
				callback.call(this, objects[i]);
			}
		}
	}

	function getStationByName(stations, name) {
	    var i = 0;
	    for (i = 0; i < stations.length; i++){
	        if (stations[i].name == name){
	            return stations[i];
	        }
	    }
	    return null;
	}

	return Multiplayer;
}(Game));
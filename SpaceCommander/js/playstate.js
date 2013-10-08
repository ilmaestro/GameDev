var Game = Game || {};
Game.PlayState = (function(Game){

	/*
	*
	* constructor
	*
	*/

	function PlayState (world, viewport, fpsElement){
		this.world = world;
		this.viewport = viewport;

		// vectors
		this.velocity = new Game.Vector();
		this.friction = new Game.Vector();
		this.touch = new Game.Vector();

		// sprites
		this.parallax;
		this.grid;
		this.stations = [];
		this.projectiles = [];
		this.planets = [];

		// game state
		this.isLaunching = false;
		this.isDragging = false;
		this.currentStation = 0;

		// constants
		this.viewportSpeed = 5;
		this.viewportMaxSpeed = 20;
		this.launchMaxPower = 150;
		this.gridSize = 100;
		this.gridOffset = 10;

		// styles
		this.backgroundStyle = "#000";
		this.lineStyle = "#fff";
	}

	/*
	*
	* events
	*
	*/

	PlayState.prototype.onResize = function(){
		Game.Log("resizing title state");
		if (this.viewport) this.viewport.width = jaws.canvas.width;
        if (this.viewport) this.viewport.height = jaws.canvas.height;
	};

	PlayState.prototype.onMouseMove = function(){
		var self = this;
		if(jaws.pressed("left_mouse_button") && !this.isDragging && !this.isProjectileAlive()) {
			this.touch.x = this.viewport.x + jaws.mouse_x;
			this.touch.y = this.viewport.y + jaws.mouse_y;

			//check if touched station
			doIfCollidePoint(this.stations, this.touch, function(station){
				station.isLaunching = true;
				self.isDragging = true;
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

	/*
	*
	* setup sequence
	*
	*/

	PlayState.prototype.isProjectileAlive = function(){
		var projectileAlive = false;
		doIfAlive(this.projectiles, function(projectile){
			projectileAlive = true;
		});

		return projectileAlive;
	};

	PlayState.prototype.nextStation = function(){
		this.currentStation++;

		if(this.currentStation >= this.stations.length){
			this.currentStation = 0;
		}

		return ;
	};

	PlayState.prototype.setup = function(){
		jaws.clear();

		// set up the chase camera view
        this.viewport = new jaws.Viewport({ max_x: this.world.viewport_max_x, max_y: this.world.viewport_max_y });
        jaws.activeviewport = this.viewport; // resize events need this in global scope
		
		//setup parallax background
		this.parallax = new jaws.Parallax({repeat_x: true, repeat_y: true});
		this.parallax.addLayer({image: "starfield_1.png", damping: 100});
		this.parallax.addLayer({image: "starfield_2.png", damping: 20});
		this.parallax.addLayer({image: "starfield_3.png", damping: 15});
		this.parallax.addLayer({image: "starfield_4.png", damping: 10});
		this.parallax.addLayer({image: "starfield_5.png", damping: 5});

		//sprites
		this.grid = new Game.Grid({
			x: 0,
			y: 0,
			width: this.viewport.max_x,
			height: this.viewport.max_y,
			gridSize: this.gridSize,
			offset: this.gridOffset
		});
		this.stations.push(new Game.Station({
			x: 100,
			y: 100,
			anchor: "center",
			bounds: this.grid.rect(),
			isAlive: true,
			color: "#BAA600",
			name: "p1"
		}));
		this.stations.push(new Game.Station({
			x: this.viewport.max_x - 100,
			y: this.viewport.max_y - 100,
			anchor: "center",
			bounds: this.grid.rect(),
			isAlive: true,
			color: "#BA0071",
			name: "p2"
		}));
		this.projectiles.push(new Game.Projectile({
			x: 0,
			y: 0,
			anchor: "center",
			bounds: this.grid.rect()
		}));
		this.planets.push(new Game.Planetoid({
			x: this.viewport.max_x / 2,
			y: this.viewport.max_y / 2,
			radius: 250,
			width: 500,
			height: 500,
			mass: -3000,
			anchor: "center"
		}));
		this.planets.push(new Game.Planetoid({
			x: this.viewport.max_x / 4,
			y: this.viewport.max_y / 3,
			radius: 100,
			width: 200,
			height: 200,
			mass: 8000,
			anchor: "center"
		}));

		this.planets.push(new Game.Planetoid({
			x: 3 * this.viewport.max_x / 4,
			y: 2 * this.viewport.max_y / 3,
			radius: 100,
			width: 200,
			height: 200,
			mass: 8000,
			anchor: "center"
		}));

		jaws.preventDefaultKeys(["up", "down", "left", "right", "space"]);
	};

	/*
	*
	* update sequence
	* - loop the station across the map if it goes out of the viewport bounds
	*/

	PlayState.prototype.update = function(){
		var i = 0, projectileAlive = false, self = this;

		this.world.update();

        //check if user let go of the drag
        if(this.isDragging && !jaws.pressed("left_mouse_button")){
			doIfLaunching(this.stations, function(station){
				Game.Log("station launch!");
				station.isLaunching = false;
				self.projectiles[0].parentStation = station.name;
	        	self.launch(self.projectiles[0], station, self.touch);
	        	self.world.sfxattack();
			});
        	this.isDragging = false;
		}

		updateAll(this.stations);
		updateAll(this.planets);

		doIfAlive(this.projectiles, function(projectile){
			var force = Game.Helper.totalForces(projectile, self.planets);
			projectile.velocity.add(force);
			projectile.update();

			doIfCollideCircles(projectile, self.planets, function(planet){
				projectile.isAlive = false;
	        	self.world.sfxhit();

			})
			// jaws.collideOneWithMany(projectile, self.planets, function(projectile, planet){
			// 	projectile.isAlive = false;
			// });

			jaws.collideOneWithMany(projectile, self.stations, function(projectile, station){
				if(projectile.parentStation != station.name) {
					projectile.isAlive = false;
					projectile.parentStation = "";
					station.damaged();
					self.stations[self.currentStation].scored();
	        		self.world.sfxhit();
				}
			});
			if(projectile.isAlive){
				self.viewport.centerAround(projectile);
				projectileAlive = true;
			} else {
	        	self.nextStation();
	        	self.world.sfxswish();
			}
	
		});

        if (!projectileAlive) {
        	this.viewport.centerAround(this.stations[this.currentStation]);
        }
        
        this.parallax.camera_x = this.viewport.x;
        this.parallax.camera_y = this.viewport.y;
	};

	/*
	*
	* draw sequence
	*
	*/

	PlayState.prototype.draw = function(){
		var self = this;
		jaws.clear();
		this.parallax.draw();
		this.viewport.draw(this.grid);

		this.viewport.draw(this.stations);
		this.viewport.draw(this.planets);

		doIfAlive(this.projectiles, function(projectile){
			self.viewport.draw(projectile);
		});

		//draw launcher
		this.viewport.apply(function(){
			doIfLaunching(self.stations, function(station){
	        	Game.Helper.drawLauncherArrow(jaws.context, station, self.touch, self.launchMaxPower);        		
			});
		});
	};

	PlayState.prototype.launch = function(object, point1, point2) {
		var diff = point2.clone().sub(point1).limit(this.launchMaxPower),
 			velocity = (diff.mag() / this.launchMaxPower) * object.SPEED,
        	theta = Math.atan2(diff.y, diff.x);

        object.moveTo(point1.x, point1.y);
		object.velocity.x = Math.cos(theta) * velocity;
		object.velocity.y = Math.sin(theta) * velocity;
		object.isAlive = true;
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

	return PlayState;
}(Game));
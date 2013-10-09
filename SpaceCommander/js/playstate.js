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
		this.explosion;
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

		// timing
		this.currentTime = Date.now();
		this.lastTime = this.currentTime;
		this.viewChangeDelay = 0; //ms
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
		var self = this;

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

		//create station 1
		this.stations.push(new Game.Station({
			x: 100,
			y: 100,
			anchor: "center",
			bounds: this.grid.rect(),
			isAlive: true,
			color: "#BAA600",
			name: "p1"
		}));

		// station 2
		this.stations.push(new Game.Station({
			x: this.viewport.max_x - 100,
			y: this.viewport.max_y - 100,
			anchor: "center",
			bounds: this.grid.rect(),
			isAlive: true,
			color: "#BA0071",
			name: "p2"
		}));

		// the projectile
		var bounds = this.grid.rect().clone();
		bounds.shrink(10,10);
		bounds.moveTo(30,30);
		this.projectiles.push(new Game.Projectile({
			x: 0,
			y: 0,
			anchor: "center",
			bounds: bounds
		}));

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
	* - loop the station across the map if it goes out of the viewport bounds
	*/

	PlayState.prototype.update = function(){
		this.currentTime = Date.now();
		var i = 0, projectileAlive = false, self = this, elapsedTime = this.currentTime - this.lastTime;

		this.world.update();
        this.explosion.update();

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
			var result = projectile.update();
			if (result.justDied === true){
				//update explosion
				self.explosion.beginAnim(projectile.x, projectile.y);

				//update view change delay
				self.viewChangeDelay = 2000; //2 seconds
        		self.lastTime = self.currentTime;
        		elapsedTime = 0;
			}

			//detect if project collides with planets
			doIfCollideCircles(projectile, self.planets, function(planet){
				planet.updateProjectile(projectile);
				self.world.sfxhit();

				self.explosion.beginAnim(projectile.x, projectile.y);

				//update view change delay
				self.viewChangeDelay = 2000; //2 seconds
        		self.lastTime = self.currentTime;
        		elapsedTime = 0;
			});

			// jaws.collideOneWithMany(projectile, self.planets, function(projectile, planet){
			// 	projectile.isAlive = false;
			// });

			jaws.collideOneWithMany(projectile, self.stations, function(projectile, station){
				if(projectile.parentStation != station.name) {
					projectile.isAlive = false;
					projectile.parentStation = "";
					station.damaged();
					self.stations[self.currentStation].scored();

					self.explosion.beginAnim(projectile.x, projectile.y);
	        		self.world.sfxhit();

	        		//update view change delay
					self.viewChangeDelay = 2000; //2 seconds
        			self.lastTime = self.currentTime;
        			elapsedTime = 0;
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

        if (!projectileAlive && elapsedTime >= this.viewChangeDelay) {
        	this.viewport.centerAround(this.stations[this.currentStation]);
        	this.viewChangeDelay = 0;
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
		var self = this, i = 0;
		jaws.clear();
		this.parallax.draw();
		this.viewport.draw(this.grid);

		this.viewport.draw(this.stations);
		
		//draw launcher
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

		doIfAlive(this.projectiles, function(projectile){
			self.viewport.draw(projectile);
		});

		this.explosion.drawFrame(this.viewport);
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
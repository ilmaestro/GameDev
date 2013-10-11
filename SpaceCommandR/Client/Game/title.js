var Game = Game || {};
Game.Title = (function(Game){

	/*
	*
	* constructor
	*
	*/

	function Title (world, viewport, fpsElement){
		this.world = world;
		this.viewport = viewport;

		// sprites
		this.background;

		// game state
		this.isDragging = false;

		// constants
		this.viewportSpeed = 5;
		this.viewportMaxSpeed = 20;
	}

	/*
	*
	* events
	*
	*/

	Title.prototype.onResize = function(){
		Game.Log("resizing title state");
		if (this.viewport) this.viewport.width = jaws.canvas.width;
        if (this.viewport) this.viewport.height = jaws.canvas.height;
	};

	Title.prototype.onMouseMove = function(){
	    var self = this;
        //detect drag
		if (jaws.pressed("left_mouse_button") && !this.isDragging) {
			this.touch.x = this.viewport.x + jaws.mouse_x;
			this.touch.y = this.viewport.y + jaws.mouse_y;

			////check if touched station
			//doIfCollidePoint(this.stations, this.touch, function(station){
			//	station.isLaunching = true;
			//	self.isDragging = true;
			//});
		}

		if(!jaws.pressed("left_mouse_button")) {
			this.isDragging = false;
		}

		if(this.isDragging){
			this.touch.x = this.viewport.x + jaws.mouse_x;
			this.touch.y = this.viewport.y + jaws.mouse_y;
		}
	};


	Title.prototype.onMouseUp = function () {

	};
    

	/*
	*
	* setup sequence
	*
	*/

	Title.prototype.setup = function(){
		jaws.clear();
		var self = this;

		// set up the chase camera view
        this.viewport = new jaws.Viewport({ max_x: this.world.viewport_max_x, max_y: this.world.viewport_max_y });
        jaws.activeviewport = this.viewport; // resize events need this in global scope
		
		//setup parallax background
        this.background = new Game.Background({});

		jaws.preventDefaultKeys(["up", "down", "left", "right", "space"]);
	};

	/*
	*
	* update sequence
	* 
	*/

	Title.prototype.update = function(){
		this.currentTime = Date.now();
		var i = 0, self = this; //, elapsedTime = this.currentTime - this.lastTime;

        this.background.update(this.viewport);
	};

	/*
	*
	* draw sequence
	*
	*/

	Title.prototype.draw = function(){
		var self = this, i = 0;
		jaws.clear();
		this.background.draw();
		
	};

	return Title;
}(Game));
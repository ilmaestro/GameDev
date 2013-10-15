var Game = Game || {};
Game.Title = (function(Game){

	/*
	*
	* constructor
	*
	*/

	function Title (world, viewport, fpsElement){
	    this.world = world;

	    this.menuItems = ["Multiplayer"];
	    this.menuIndex = 0;

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
		if (this.world.viewport) this.world.viewport.width = jaws.canvas.width;
        if (this.world.viewport) this.world.viewport.height = jaws.canvas.height;
	};

	Title.prototype.onMouseMove = function(){
	    var self = this;
        //detect drag
		if (jaws.pressed("left_mouse_button") && !this.isDragging) {
			this.touch.x = this.world.viewport.x + jaws.mouse_x;
			this.touch.y = this.world.viewport.y + jaws.mouse_y;

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
			this.touch.x = this.world.viewport.x + jaws.mouse_x;
			this.touch.y = this.world.viewport.y + jaws.mouse_y;
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
        //this.viewport = new jaws.Viewport({ max_x: 1000, max_y: 1000 });
		this.world.viewport = new jaws.Viewport({ max_x: this.world.viewport_max_x, max_y: this.world.viewport_max_y });
		jaws.activeviewport = this.world.viewport; // resize events need this in global scope
		
		//setup parallax background
        this.background = new Game.Background({});

        jaws.preventDefaultKeys(["up", "down", "left", "right", "space"]);
        jaws.on_keydown(["down"], function () { self.menuIndex++; if (self.menuIndex >= self.menuItems.length) { self.menuIndex = self.menuItems.length - 1; } });
        jaws.on_keydown(["up"], function () { self.menuIndex--; if (self.menuIndex < 0) { self.menuIndex = 0; } });
        jaws.on_keydown(["enter", "space"], function () {
            if (self.menuItems[self.menuIndex] == "Multiplayer") {
                self.world.enterLobby();
            } else if (self.menuItems[self.menuIndex] == "Testing") {
                toastr.info("testing!");
            }
        });
	};

	/*
	*
	* update sequence
	* 
	*/

	Title.prototype.update = function(){
		this.background.parallax.camera_x += 3;
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
		this.world.viewport.apply(function(){
		    self.drawGameTitle();
		    self.drawGameMenu();
		});
	};


	Title.prototype.drawGameTitle = function(){
	    var ctx = jaws.context,
	        titleText = "Space Commander";

	    ctx.beginPath();
	    ctx.font = "80px Georgia";
	    ctx.fillStyle = "green";
	    ctx.shadowBlur = 20;
        ctx.shadowColor = "green"
        var textWidth = ctx.measureText(titleText).width;
        ctx.fillText(titleText, this.world.viewport.width / 2 - textWidth / 2, this.world.viewport.height / 2 - 100);
	};

	Title.prototype.drawGameMenu = function () {
	    var ctx = jaws.context, i = 0, color = "green", selected = "yellow";

	    ctx.beginPath();
	    ctx.font = "40px Georgia";
	    ctx.shadowBlur = 10;
	    for (i = 0; i < this.menuItems.length; i++) {
	        var textWidth = ctx.measureText(this.menuItems[i]).width;
	        ctx.fillStyle = this.menuIndex == i ? selected : color;
	        ctx.shadowColor = this.menuIndex == i ? selected : color;

	        ctx.fillText(this.menuItems[i], this.world.viewport.width / 2 - textWidth / 2, this.world.viewport.height / 2 + i * 50);

	    }
	};

	return Title;
}(Game));
var Game = Game || {};
Game.Background = (function(Game){
	function Background(options){
	    //setup parallax background
	    options.repeat_x = options.repeat_x || true;
	    options.repeat_y = options.repeat_y || true;

	    this.parallax = new jaws.Parallax(options);
	    this.parallax.addLayer({ image: "starfield_1.png", damping: 100 });
	    this.parallax.addLayer({ image: "starfield_2.png", damping: 20 });
	    this.parallax.addLayer({ image: "starfield_3.png", damping: 15 });
	    this.parallax.addLayer({ image: "starfield_4.png", damping: 10 });
	    this.parallax.addLayer({ image: "starfield_5.png", damping: 5 });
	}

	Background.prototype.update = function (viewport) {
	    this.parallax.camera_x = viewport.x;
	    this.parallax.camera_y = viewport.y;
	};

	Background.prototype.draw = function () {
	    this.parallax.draw();
	};

	return Background;
}(Game));
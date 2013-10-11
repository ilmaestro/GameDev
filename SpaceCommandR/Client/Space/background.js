var Game = Game || {};
Game.Background = (function(Game){
	function Background(options){
	    //setup parallax background
	    options.repeat_x = options.repeat_x || true;
	    options.repeat_y = options.repeat_y || true;

	    jaws.Parallax.call(this, options);
	    this.addLayer({ image: "starfield_1.png", damping: 100 });
	    this.addLayer({ image: "starfield_2.png", damping: 20 });
	    this.addLayer({ image: "starfield_3.png", damping: 15 });
	    this.addLayer({ image: "starfield_4.png", damping: 10 });
	    this.addLayer({ image: "starfield_5.png", damping: 5 });
	}

	Background.prototype = new jaws.Parallax({ repeat_x: true, repeat_y: true });

	Background.prototype.update = function (viewport) {
	    this.camera_x = viewport.x;
	    this.camera_y = viewport.y;
	}  

	return Background;
}(Game));
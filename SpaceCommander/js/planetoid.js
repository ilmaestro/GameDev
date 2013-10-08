var Game = Game || {};
Game.Planetoid = (function(Game){
	function Planetoid(options){
		options.width = options.width || 100;
		options.height = options.height || 100;
		options.radius = options.radius || 50;
		options.mass = options.mass || 10000;
		options.image = getImage(options.radius);

		jaws.Sprite.call(this, options);

        this.mass = options.mass; 
		this.radius = options.radius;
		// state
		this.isAlive = false;
		this.isSelected = false;

		// constants
        this.POWER = 5;
	}

	Planetoid.prototype = new jaws.Sprite({});

    Planetoid.prototype.update = function(){
    	// make variations in mass, scale, and image
    };

	function getImage(radius) {
		var canvas = document.createElement("canvas");
	    canvas.width = radius * 2 + 8;
	    canvas.height = radius * 2 + 8;
	    var ctx = canvas.getContext('2d');
	    ctx.strokeStyle = "green";
        ctx.lineWidth = 4;
    	ctx.fillStyle = "#000";

       	ctx.beginPath();
    	ctx.arc(radius+2, radius+2, radius, 0, 2 * Math.PI, true);
    	ctx.closePath();

    	ctx.fill();
    	ctx.stroke();
	    return canvas;
	}

	return Planetoid;
}(Game));
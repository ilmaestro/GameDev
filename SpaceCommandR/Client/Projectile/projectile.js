var Game = Game || {};
Game.Projectile = (function(Game){
	function Projectile(options){
		options.radius = options.radius || 8;
		options.bounds = options.bounds || new jaws.Rect({});
		options.mass = options.mass || 100;
		options.parentStation = options.parentStation || "";
		options.isAlive = options.isAlive || false;
		options.isSelected = options.isSelected || false;
		options.image = getImage();
		options.velocity = options.velocity || new Game.Vector();


		this.radius = options.radius;
		this.bounds = options.bounds;
		this.mass = options.mass;
		this.parentStation = options.parentStation;

		// state
		this.isAlive = options.isAlive;
		this.isSelected = options.isSelected;

		// motion
		this.velocity = options.velocity;

		// constants
        this.BOUNCE = 0.4;
        this.FRICTION = 0.000;
        this.POWER = 5; 
        this.SPEED = 25; // pixels per frame


        jaws.Sprite.call(this, options);
	}

	Projectile.prototype = new jaws.Sprite({});

    Projectile.prototype.getPoint = function() {
    	return new Game.Vector(this.x, this.y);
    };

    Projectile.prototype.update = function() {
    	if(this.velocity.mag() > .1) {
    		this.velocity.limit(this.SPEED);
	        //Game.Helper.moveSpriteWithBounds(this.velocity, this, this.bounds, true);
	        this.move(this.velocity.x, this.velocity.y);
	        //subtract friction
        	this.velocity.mult(1 - this.FRICTION);
        }
    };

	function getImage() {
		//create an offscreen canvas
		var canvas = document.createElement("canvas");
	    // liquid layout: stretch to fill
	    canvas.width = 16;
	    canvas.height = 16;
	    var ctx = canvas.getContext('2d');
       	ctx.beginPath();
    	ctx.arc(8, 8, 8, 0, 2 * Math.PI, true);
    	ctx.closePath();
    	ctx.strokeStyle = "green";
        ctx.lineWidth = 4;
    	ctx.fillStyle = "green";
    	ctx.fill();
    	//ctx.stroke();
	    return canvas;
	}

	return Projectile;
}(Game));
var Game = Game || {};
Game.Projectile = (function(Game){
	function Projectile(options){
		options.radius = options.radius || 8;
		options.bounds = options.bounds || new jaws.Rect({});
		options.mass = options.mass || 100;
		options.image = getImage();

		jaws.Sprite.call(this, options);

		this.radius = options.radius;
		this.bounds = options.bounds;
		this.mass = options.mass;
		this.parentStation;

		// state
		this.isAlive = false;
		this.isSelected = false;

		// motion
		this.velocity = new Game.Vector();

		// constants
        this.BOUNCE = 0.4;
        this.FRICTION = 0.000;
        this.POWER = 5; 
        this.SPEED = 25; // pixels per frame
	}

	Projectile.prototype = new jaws.Sprite({});

    Projectile.prototype.getPoint = function() {
    	return new Game.Vector(this.x, this.y);
    };

    Projectile.prototype.update = function() {
    	if(!this.isAlive) {
    		return;
    	}

    	if(this.velocity.mag() > .1 && this.rect().collideRect(this.bounds)) {
    		this.velocity.limit(this.SPEED);
	        //Game.Helper.moveSpriteWithBounds(this.velocity, this, this.bounds, true);
	        this.move(this.velocity.x, this.velocity.y);
        } else {
        	this.isAlive = false;
        }

        //subtract friction
        this.velocity.mult(1 - this.FRICTION);
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
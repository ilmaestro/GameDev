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
		this.radius = 10; //options.radius;
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

    Planetoid.prototype.updateProjectile = function(projectile){
    	projectile.isAlive = false;
    	//test if the center of the projectile is inside the inner radius.
    	// if(projectile.x < this.x + this.radius && projectile.x > this.x - this.radius && 
    	// 	projectile.y < this.y + this.radius && projectile.y > this.y - this.radius ) {
    	// 	projectile.isAlive = false;
    	// } else {
    	// 	projectile.velocity.mult(-.8);
    	// }
    };

	function getImage(radius) {
		var canvas = document.createElement("canvas");
	    canvas.width = radius * 2 + 8;
	    canvas.height = radius * 2 + 8;
	    var ctx = canvas.getContext('2d');
	    ctx.strokeStyle = "rgba(0,255,8,.8)";
        ctx.lineWidth = 4;
    	ctx.fillStyle = "rgba(0,255,8,.5)";

		Game.Helper.dottedArc(ctx,radius+2, radius+2, radius, 0, 2 * Math.PI, false, 32);

       	ctx.beginPath();
    	ctx.arc(radius+2, radius+2, 20, 0, 2 * Math.PI, true);
    	ctx.fill();

	    return canvas;
	}

	return Planetoid;
}(Game));
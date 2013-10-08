var Game = Game || {};
Game.Station = (function(Game){
	function Station(options){
		options.isAlive = options.isAlive || false;
		options.color = options.color || "#000";
		options.image = getPlayerImage(0, options.color);

		jaws.Sprite.call(this, options);

		// bounds
		this.bounds = options.bounds || new jaws.Rect({});
		this.color = options.color;
		this.name = options.name || "";
		// motion
		this.velocity = new Game.Vector();

		// state
		this.isAlive = options.isAlive;
		this.isLaunching = false;
		this.isSelected = false;
		this.score = 0;
		this.alpha = 1;

		// constants
        this.BOUNCE = 0.4;
        this.FRICTION = 0.03;
        this.POWER = 5; 
        this.SPEED = 20; // pixels per frame
	}

	Station.prototype = new jaws.Sprite({});

    Station.prototype.update = function(){
    	if(!this.isAlive) {
    		return;
    	}
    	
    	if(this.velocity.mag() > .1) {
    		this.velocity.limit(this.SPEED);
	        //Game.Helper.moveSpriteWithBounds(this.velocity, this, this.bounds, true);
	        Game.Helper.moveSpriteWithBounce(this.velocity, this, this.bounds, this.BOUNCE, 50);
        }

        //subtract friction
        this.velocity.mult(1 - this.FRICTION);
    };

    Station.prototype.scored = function(){
    	this.score++;
    	this.setImage(getPlayerImage(this.score, this.color, this.alpha));
    };

    Station.prototype.damaged = function(){
    	this.alpha -= .2;
    	this.setImage(getPlayerImage(this.score, this.color, this.alpha));
    	if(this.alpha < .2) {
    		this.isAlive = false;
    	}
    };

	function getPlayerImage(score, color, alpha) {
		//create an offscreen canvas
		var canvas = document.createElement("canvas");
	    // liquid layout: stretch to fill
	    canvas.width = 100;
	    canvas.height = 100;
	    var ctx = canvas.getContext('2d');
       	ctx.strokeStyle = "green";
	    ctx.lineWidth = 4;
		ctx.fillStyle = color;

	   	ctx.beginPath();
		ctx.arc(50, 50, 44, 0, 2 * Math.PI, true);
		ctx.fill();
		ctx.stroke();

		ctx.fillStyle = "#000";
		ctx.beginPath();
		ctx.moveTo(0,75);
		ctx.lineTo(50, 0);
		ctx.lineTo(100, 75);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();

		ctx.beginPath();
		ctx.rect(40,40, 20, 20);
		ctx.lineWidth = 2;
		ctx.stroke();

		ctx.beginPath();
		ctx.font = "20px Georgia";
		ctx.fillStyle = "green";
		ctx.fillText(score,0,20);

	    return canvas;
	}

	return Station;
}(Game));
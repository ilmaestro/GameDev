var Game = Game || {};
Game.Station = (function(Game){
	function Station(options){
		options.isAlive = options.isAlive || false;
		options.color = options.color || "#000";

	    // owner
		this.playerId = 0;

	    // children stations
		this.children = [];
		this.childrenCount = 0;

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
		this.currentHealth = 3;
		this.health = 3;

		// constants
        this.BOUNCE = 0.4;
        this.FRICTION = 0.03;
        this.POWER = 5; 
        this.SPEED = 20; // pixels per frame

        //initialize image
        options.image = getStationCanvas(this.score, this.health, this.currentHealth, this.color, this.alpha);
		jaws.Sprite.call(this, options);
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
    	this.setImage(getStationCanvas(this.score, this.health, this.currentHealth, this.color, this.alpha));
    };

    Station.prototype.damaged = function(){
    	this.currentHealth -= 1;
    	this.setImage(getStationCanvas(this.score, this.health, this.currentHealth, this.color, this.alpha));
    	if(this.currentHealth <= 0) {
    		this.isAlive = false;
    	}
    };

	function getStationCanvas(score, health, currentHealth, color, alpha) {
		//create an offscreen canvas
		var canvas = document.createElement("canvas");
	    // liquid layout: stretch to fill
	    canvas.width = 90;
	    canvas.height = 90;

	    var ctx = canvas.getContext('2d');
	    var lineWidth = 2,
	    	center = new Game.Vector(canvas.width / 2, canvas.height / 2), 
	    	radius = canvas.width / 2 - lineWidth;

       	ctx.strokeStyle = color;
	    ctx.lineWidth = lineWidth;
		ctx.fillStyle = color;

		//draw initial circle
	   	ctx.beginPath();
	   	ctx.arc(center.x, center.y, radius - 8, 0, 2 * Math.PI, true);
	   	ctx.shadowBlur = 10;
	   	ctx.shadowColor = color;
		ctx.fill();
		ctx.stroke();

		//draw inner triangle
		var triangleOffset = 5;
		ctx.shadowBlur = 0;
		ctx.fillStyle = "#000";
		ctx.beginPath();
		ctx.moveTo(triangleOffset,canvas.height * .75 - triangleOffset);
		ctx.lineTo(canvas.width * .5, triangleOffset);
		ctx.lineTo(canvas.width-triangleOffset, canvas.height * .75 - triangleOffset);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();

		//draw health squares
		ctx.lineWidth = lineWidth / 2;
		ctx.fillStyle = color;
		var i = 0,
			squareSize = 10,
			spaceSize = 2,
			offsetX = center.x - ((squareSize+spaceSize) * health) / 2 + spaceSize,
			offsetY = center.y + spaceSize;

		for (i = 0; i < health; i++){
			ctx.beginPath();
			ctx.rect(offsetX + i * (squareSize+spaceSize),offsetY, squareSize, squareSize); // draw a rect centered, half the radius
			ctx.stroke();

			if (i < currentHealth){
				ctx.fill();
			}
		}
		
		//draw score text
		ctx.beginPath();
		ctx.font = "20px Georgia";
		ctx.fillStyle = "green";
		ctx.fillText(score,0,15);

	    return canvas;
	}

	return Station;
}(Game));